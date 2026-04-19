import { initializeApp, getApps } from "firebase/app"
import type { Auth } from "firebase/auth"
import { getAuth } from "firebase/auth"
import { isInvestorMode } from "@/lib/investorMode"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const hasFullFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
)

/**
 * Investor / private demos skip Firebase entirely (no API keys in .env).
 * `AuthContext` never touches `auth` when `isInvestorMode()` is true.
 */
function createAuth(): Auth {
  if (isInvestorMode()) {
    return null as unknown as Auth
  }

  if (!hasFullFirebaseConfig) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[firebase] Missing Firebase config. Set NEXT_PUBLIC_FIREBASE_* or use NEXT_PUBLIC_INVESTOR_MODE=true."
      )
    }
    return null as unknown as Auth
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  return getAuth(app)
}

export const auth = createAuth()

