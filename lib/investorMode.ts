import type { User as FirebaseUser } from "firebase/auth"

/** Matches private EC2 / investor builds: no sign-in; backend uses DISABLE_API_AUTH. */
export function isInvestorMode(): boolean {
  return process.env.NEXT_PUBLIC_INVESTOR_MODE === "true"
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
