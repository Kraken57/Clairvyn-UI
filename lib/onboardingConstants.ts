/** Session-only: show product tour after first profile completion (driver.js). */
export const ONBOARDING_SESSION_KEY = "clairvyn_show_onboarding_v1"

/** After sign-in / sign-up, send users here first; page redirects to /chatbot when profile is complete. */
export const POST_AUTH_ENTRY_PATH = "/onboarding/profile" as const

export function onboardingDoneStorageKey(uid: string) {
  return `clairvyn_onboarding_v1_done_${uid}`
}
