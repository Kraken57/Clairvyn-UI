import { initializeApp, getApps } from "firebase/app"
import type { Auth } from "firebase/auth"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const hasFullFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
)

function createAuth(): Auth | null {
  if (!hasFullFirebaseConfig) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[firebase] Missing Firebase config. Set NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID."
      )
    }
    return null
  }

  const cfg = Object.fromEntries(
    Object.entries(firebaseConfig).filter(([, v]) => v != null && String(v).trim() !== "")
  ) as Record<string, string>
  const app = getApps().length === 0 ? initializeApp(cfg) : getApps()[0]
  return getAuth(app)
}

export const auth = createAuth()
