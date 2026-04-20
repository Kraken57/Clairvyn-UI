import { apiPath } from "./apiRoutes"

/** Local Flask default (BACKEND_PORT when ghost listeners block :5000). */
function defaultBackendOrigin(): string {
  const p =
    (typeof process !== "undefined" &&
      (process.env.BACKEND_PORT || process.env.NEXT_PUBLIC_BACKEND_PORT || "").trim()) ||
    "5000"
  return `http://127.0.0.1:${p || "5000"}`
}

/** Resolve backend origin. Must be absolute (http/https) — relative bases break auth headers via Next.js routing. */
function resolveBackendOrigin(): string {
  const raw = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || ""
  const s = String(raw).trim()
  if (!s || s === "/") {
    return defaultBackendOrigin()
  }
  // Relative URL (e.g. "/" or "/proxy") would hit the Next.js origin and skip sending Flask-only headers reliably.
  if (s.startsWith("/") && !s.startsWith("//")) {
    return defaultBackendOrigin()
  }
  return s.replace(/\/$/, "")
}

/**
 * Effective origin for API calls.
 * - **Browser**: same origin (`""` → paths like `/api/chats`) so requests hit Next.js `app/api/[...path]/route.ts`,
 *   which proxies to Flask with headers preserved (no manual `NEXT_PUBLIC_API_BASE_URL` needed for local dev).
 * - **Server (SSR / Node)**: direct URL to Flask via `resolveBackendOrigin()` (env or `http://127.0.0.1:5000`).
 */
function effectiveApiBase(): string {
  if (typeof window !== "undefined") {
    return ""
  }
  return resolveBackendOrigin()
}

/** Base URL of the Flask backend (same as env after same-origin guard in the browser). */
export function getApiBaseUrl(): string {
  return effectiveApiBase()
}

/** @deprecated Prefer getApiBaseUrl() — on the client this may differ from env if env matched the frontend origin. */
export const API_BASE_URL = resolveBackendOrigin()

/** Backend `ChatSession.id` is an integer; UUIDs in the UI are local-only until the first `/turn` syncs. */
export function isBackendNumericChatId(id: string | null | undefined): boolean {
  if (id == null || id === "") return false
  return /^\d+$/.test(id)
}

/** Headers for raw `fetch()` to the API when not using `apiFetch` (e.g. file downloads, `<img>` blobs). */
export function apiAuthHeaders(token: string | null | undefined): Record<string, string> {
  const t = token != null ? String(token).trim() : ""
  if (t) {
    return { Authorization: `Bearer ${t}` }
  }
  return {}
}

/** Return full URL for a path (e.g. for images or logout that need the backend origin). */
export function getBackendUrl(path: string): string {
  const base = effectiveApiBase().replace(/\/$/, "")
  let p = path.startsWith("/") ? path : `/${path}`
  // Avoid accidental double slashes if path is malformed (e.g. "//api/...")
  if (p.startsWith("//")) {
    p = `/${p.replace(/^\/+/, "")}`
  }
  return `${base}${p}`
}

function shouldBridgeLogToServer(): boolean {
  return (
    typeof process !== "undefined" && String(process.env.NEXT_PUBLIC_BRIDGE_LOG || "").trim() === "true"
  )
}

function postBridgeClientEvent(payload: Record<string, unknown>): void {
  if (!shouldBridgeLogToServer() || typeof fetch === "undefined") return
  try {
    const url = getBackendUrl(apiPath.bridgeLog())
    const h: Record<string, string> = {
      "Content-Type": "application/json",
      ...apiAuthHeaders(null),
    }
    void fetch(url, {
      method: "POST",
      headers: h,
      body: JSON.stringify({
        ...payload,
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
      keepalive: true,
    })
  } catch {
    /* ignore */
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface ApiFetchOptions<TBody> {
  method?: HttpMethod
  body?: TBody
  token: string | null
  signal?: AbortSignal
}

const DEBUG = typeof process !== "undefined" ? process.env.NODE_ENV === "development" : true

export async function apiFetch<TResponse, TBody = unknown>(
  path: string,
  { method = "GET", body, token, signal }: ApiFetchOptions<TBody>
): Promise<TResponse> {
  const url = getBackendUrl(path)
  const t0 = typeof performance !== "undefined" ? performance.now() : 0

  if (DEBUG) {
    console.log("[Clairvyn:api] Request", {
      method,
      path,
      url,
      hasToken: !!token,
      body: body !== undefined ? (typeof body === "object" && body !== null ? { ...(body as object) } : body) : undefined,
    })
  }

  const headers: Record<string, string> = {}

  const bearer = token != null ? String(token).trim() : ""
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (e) {
    const ms = typeof performance !== "undefined" ? Math.round(performance.now() - t0) : undefined
    postBridgeClientEvent({
      kind: "apiFetch",
      path,
      url,
      method,
      ok: false,
      networkError: String((e as Error)?.message ?? e),
      ms,
    })
    throw e
  }

  const ms = typeof performance !== "undefined" ? Math.round(performance.now() - t0) : undefined
  postBridgeClientEvent({
    kind: "apiFetch",
    path,
    url,
    method,
    ok: response.ok,
    status: response.status,
    ms,
  })

  if (DEBUG) {
    console.log("[Clairvyn:api] Response", {
      path,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    console.error("[Clairvyn:api] Error response", { path, status: response.status, body: text })
    let hint = ""
    if (response.status === 404 && /<!doctype html>/i.test(text)) {
      hint =
        " Received Next.js HTML instead of JSON — start Flask on port 5000 (or set NEXT_PUBLIC_API_BASE_URL for the server proxy). Wrong chat id can also 404."
    }
    throw new Error(`API ${response.status}: ${text || response.statusText}${hint}`)
  }

  // For 204/empty responses, avoid JSON parsing.
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    return (await response.blob().catch(() => null)) as TResponse
  }

  const json = (await response.json()) as TResponse
  if (DEBUG && path.includes("/turn")) {
    const d = json as { history?: unknown[]; chat_id?: unknown }
    console.log("[Clairvyn:api] Turn response summary", {
      chat_id: d?.chat_id,
      historyLength: Array.isArray(d?.history) ? d.history.length : 0,
    })
  }
  return json
}

