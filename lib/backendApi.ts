import { apiPath } from "./apiRoutes"

/** Resolve backend origin from NEXT_PUBLIC_API_BASE_URL only. */
function resolveBackendOrigin(): string {
  const raw = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || ""
  const s = String(raw).trim()
  if (!s || s === "/") return ""
  if (!/^https?:\/\//i.test(s)) return ""
  return s.replace(/\/$/, "")
}

/**
 * Effective origin for API calls.
 * - Browser + Server: always use NEXT_PUBLIC_API_BASE_URL.
 */
function effectiveApiBase(): string {
  return resolveBackendOrigin()
}

function requireApiBase(): string {
  const base = effectiveApiBase()
  if (base) return base
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured with an absolute https:// API origin.")
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
  const base = requireApiBase().replace(/\/$/, "")
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

function makeRequestId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  } catch {
    // ignore and fallback
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
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
  const requestId = makeRequestId()

  if (DEBUG) {
    console.log("[Clairvyn:api] Request", {
      method,
      path,
      url,
      requestId,
      hasToken: !!token,
      body: body !== undefined ? (typeof body === "object" && body !== null ? { ...(body as object) } : body) : undefined,
    })
  }

  const headers: Record<string, string> = {}

  const bearer = token != null ? String(token).trim() : ""
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`
  }
  headers["X-Request-Id"] = requestId

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
    const networkMessage = String((e as Error)?.message ?? e)
    const ms = typeof performance !== "undefined" ? Math.round(performance.now() - t0) : undefined
    postBridgeClientEvent({
      kind: "apiFetch",
      path,
      url,
      method,
      requestId,
      ok: false,
      networkError: networkMessage,
      ms,
    })
    // Safari/iOS often reports plain "Load failed" for CORS/network failures.
    if (/^load failed$/i.test(networkMessage.trim())) {
      throw new Error("Failed to fetch")
    }
    throw e
  }

  const ms = typeof performance !== "undefined" ? Math.round(performance.now() - t0) : undefined
  postBridgeClientEvent({
    kind: "apiFetch",
    path,
    url,
    method,
    requestId,
    ok: response.ok,
    status: response.status,
    ms,
  })

  if (DEBUG) {
    console.log("[Clairvyn:api] Response", {
      path,
      requestId,
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
        " Received HTML instead of API JSON. Verify NEXT_PUBLIC_API_BASE_URL points to the backend API origin."
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

