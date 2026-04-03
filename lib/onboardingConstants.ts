export const ONBOARDING_SESSION_KEY = "clairvyn_show_onboarding_v1"

/** Set after successful sign-up so `/onboarding/profile` is shown once (sessionStorage). */
export const POST_SIGNUP_PROFILE_SESSION_KEY = "clairvyn_post_signup_profile_v1"

export function onboardingDoneStorageKey(uid: string) {
  return `clairvyn_onboarding_v1_done_${uid}`
}
