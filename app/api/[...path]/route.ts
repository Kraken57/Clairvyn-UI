import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Upstream Flask for this proxy only.
 * Uses NEXT_PUBLIC_API_BASE_URL only (no localhost fallback).
 */
function upstreamOrigin(): string {
  const s = String((typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "").trim()
  if (/^https?:\/\//i.test(s)) return s.replace(/\/$/, "")
  return ""
}

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
])

async function proxy(request: NextRequest): Promise<Response> {
  const base = upstreamOrigin()
  if (!base) {
    return NextResponse.json(
      { error: "API upstream is not configured. Set NEXT_PUBLIC_API_BASE_URL to https://api.clairvyn.com." },
      { status: 500 }
    )
  }
  const pathAndQuery = request.nextUrl.pathname + request.nextUrl.search
  const target = new URL(pathAndQuery, `${base}/`)

  const outHeaders = new Headers()
  request.headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (HOP_BY_HOP.has(k)) return
    if (k === "host") return
    outHeaders.set(key, value)
  })
  try {
    outHeaders.set("Host", new URL(base).host)
  } catch {
    /* ignore */
  }

  // Defensive: some runtimes omit custom headers from the iterable; re-apply by name.
  const authorization = request.headers.get("authorization")
  if (authorization) outHeaders.set("Authorization", authorization)

  const method = request.method
  const init: RequestInit = {
    method,
    headers: outHeaders,
    redirect: "manual",
  }

  if (!["GET", "HEAD"].includes(method)) {
    init.body = request.body
    Object.assign(init, { duplex: "half" })
  }

  const upstream = await fetch(target, init)

  const resHeaders = new Headers()
  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (k === "transfer-encoding") return
    resHeaders.set(key, value)
  })

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: resHeaders,
  })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
export const OPTIONS = proxy
export const HEAD = proxy
