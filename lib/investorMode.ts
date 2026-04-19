import type { User as FirebaseUser } from "firebase/auth"

function isNgrokDemoHost(hostname: string): boolean {
  const h = hostname.toLowerCase()
  if (h.includes("ngrok-free.app")) return true
  if (h.includes("ngrok-free.dev")) return true
  if (h.includes("ngrok.app")) return true
  if (h.includes("ngrok.io")) return true
  if (h.includes("ngrok.dev")) return true
  return false
}

/** Matches private EC2 / investor builds: no sign-in; backend uses DISABLE_API_AUTH. */
export function isInvestorMode(): boolean {
  const v = (process.env.NEXT_PUBLIC_INVESTOR_MODE ?? "").trim().toLowerCase()
  if (v === "true" || v === "1" || v === "yes") return true
  if (typeof window !== "undefined" && isNgrokDemoHost(window.location.hostname)) return true
  return false
}

/** True when the UI is served from this machine (typical `next dev` / local QA). */
export function isDevLocalFrontend(): boolean {
  if (typeof window === "undefined") return false
  const h = window.location.hostname
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]"
}

/**
 * PhonePe, analytics beacons, profile-photo upload, and generic feedback POST are optional
 * or unimplemented for some backends — avoid calling them on local dev or investor demos.
 */
export function skipOptionalBackendIntegrations(): boolean {
  return isInvestorMode() || isDevLocalFrontend()
}

/**
 * Synthetic Firebase-shaped user so chatbot and storage keys work without Firebase Auth.
 * Keep uid stable so localStorage session keys stay consistent across reloads.
 */
export const INVESTOR_PREVIEW_USER = {
  uid: "investor-preview-local",
  email: "investor@preview.local",
  displayName: "Investor preview",
  photoURL: null as string | null,
  emailVerified: true,
  isAnonymous: false,
} as unknown as FirebaseUser
