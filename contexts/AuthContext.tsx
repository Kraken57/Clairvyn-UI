"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  linkWithPopup,
  EmailAuthProvider,
  OAuthProvider,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  isGuest: boolean
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  // Social providers can be wired later if needed; keep the surface for now.
  signInWithGoogle: (options?: { rememberMe?: boolean }) => Promise<void>
  signInWithGithub: (options?: { rememberMe?: boolean }) => Promise<void>
  logout: () => Promise<void>
  enterGuestMode: () => void
  exitGuestMode: () => void
  migrateGuestChats: () => Promise<void>
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const LOCAL_DEV_BYPASS_TOKEN = "local-dev-token"

function isLocalhostHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const [localDevBypassEnabled, setLocalDevBypassEnabled] = useState(false)

  const localDevEmail =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEV_AUTO_LOGIN_EMAIL) || ""

  const makeLocalDevUser = useCallback((): FirebaseUser => {
    const email = localDevEmail.trim() || "ronakmm2005@gmail.com"
    const name = email.split("@")[0] || "Local Dev User"
    const now = Date.now()
    const mock = {
      uid: `local-dev:${email}`,
      email,
      displayName: name,
      photoURL: null,
      isAnonymous: false,
      getIdToken: async () => LOCAL_DEV_BYPASS_TOKEN,
      getIdTokenResult: async () =>
        ({
          token: LOCAL_DEV_BYPASS_TOKEN,
          expirationTime: new Date(now + 60 * 60 * 1000).toISOString(),
          authTime: new Date(now).toISOString(),
          issuedAtTime: new Date(now).toISOString(),
          signInProvider: "custom",
          claims: { email, name, dev_bypass: true },
        } as any),
    }
    return mock as unknown as FirebaseUser
  }, [localDevEmail])

  const applyAuthPersistence = async (rememberMe: boolean) => {
    if (!auth) return
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
  }

  useEffect(() => {
    const shouldBypass =
      typeof window !== "undefined" &&
      Boolean(localDevEmail.trim()) &&
      isLocalhostHost(window.location.hostname)
    setLocalDevBypassEnabled(shouldBypass)

    if (shouldBypass) {
      // Local-only bypass to keep dev moving when Firebase auth isn't available on this machine.
      setUser(makeLocalDevUser())
      setIsGuest(false)
      setLoading(false)
      return
    }

    if (!auth) {
      console.warn("[Clairvyn] Firebase is not configured (missing NEXT_PUBLIC_FIREBASE_*).")
      setLoading(false)
      return
    }

    const guestMode = typeof window !== "undefined" && localStorage.getItem("guest") === "true"
    setIsGuest(guestMode)

    // Add a timeout to ensure loading state is cleared even if onAuthStateChanged doesn't fire
    const loadingTimeout = setTimeout(() => {
      console.warn("[Clairvyn] Auth loading state timeout - forcing completion")
      setLoading(false)
    }, 8000) // 8 second timeout

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      clearTimeout(loadingTimeout)
      setUser(firebaseUser)
      setLoading(false)
    }, (error) => {
      // Error callback - also clear loading on error
      console.error("[Clairvyn] Auth state changed error:", error)
      clearTimeout(loadingTimeout)
      setLoading(false)
    })

    return () => {
      clearTimeout(loadingTimeout)
      unsubscribe()
    }
  }, [localDevEmail, makeLocalDevUser])

  const enterGuestMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("guest", "true")
    }
    setIsGuest(true)
  }

  const exitGuestMode = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("guest")
      localStorage.removeItem("guestChats")
    }
    setIsGuest(false)
  }

  const migrateGuestChats = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("guestChats")
      localStorage.removeItem("guest")
      localStorage.removeItem("guestGenerationsUsed")
    }
    setIsGuest(false)
  }

  const signIn = async (email: string, password: string, rememberMe = true) => {
    if (localDevBypassEnabled) {
      setUser(makeLocalDevUser())
      await migrateGuestChats()
      return
    }
    if (!auth) throw new Error("Firebase Auth is not configured")
    await applyAuthPersistence(rememberMe)
    await signInWithEmailAndPassword(auth, email, password)
    await migrateGuestChats()
  }

  const signUp = async (email: string, password: string) => {
    if (localDevBypassEnabled) {
      setUser(makeLocalDevUser())
      await migrateGuestChats()
      return
    }
    if (!auth) throw new Error("Firebase Auth is not configured")
    await createUserWithEmailAndPassword(auth, email, password)
    await migrateGuestChats()
    console.log("Signed up with email:", email)
  }

  const signInWithGoogle = async (options?: { rememberMe?: boolean }) => {
    if (localDevBypassEnabled) {
      setUser(makeLocalDevUser())
      await migrateGuestChats()
      return
    }
    if (!auth) throw new Error("Firebase Auth is not configured")
    await applyAuthPersistence(options?.rememberMe ?? true)
    const provider = new GoogleAuthProvider()
    
    provider.addScope('profile')
    provider.addScope('email')
    provider.setCustomParameters({ prompt: 'select_account' })
    
    try {
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        const result = await linkWithPopup(auth.currentUser, provider)
        await updateUserProfileFromGoogle(result.user)
        console.log("Google provider linked to existing account")
      } else {
        const result = await signInWithPopup(auth, provider)
        await updateUserProfileFromGoogle(result.user)
        console.log("Signed in with Google")
      }
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        const result = await signInWithPopup(auth, provider)
        await updateUserProfileFromGoogle(result.user)
        console.log("Signed in with Google (different account)")
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        // User signed up with email/password and is now trying Google with the same email.
        // Sign in with Google directly (Firebase allows this when "One account per email" is set)
        // and the accounts will be merged by the backend via email lookup.
        try {
          const googleCredential = GoogleAuthProvider.credentialFromError(error)
          if (googleCredential) {
            const result = await signInWithPopup(auth, provider)
            await updateUserProfileFromGoogle(result.user)
            console.log("Signed in with Google after account-exists-with-different-credential")
          } else {
            throw new Error(
              "An account already exists with this email using a different sign-in method. " +
              "Please sign in with your email and password first, then link Google from your profile."
            )
          }
        } catch (linkError: any) {
          if (linkError.code === 'auth/popup-closed-by-user') throw linkError
          throw new Error(
            "An account already exists with this email. Please sign in with your email and password."
          )
        }
      } else {
        throw error
      }
    }
    
    await migrateGuestChats()
  }

  const updateUserProfileFromGoogle = async (firebaseUser: FirebaseUser) => {
    try {
      // Extract name and profile picture from Google ID token claims
      const idTokenResult = await firebaseUser.getIdTokenResult()
      const displayName = firebaseUser.displayName || idTokenResult.claims.name || firebaseUser.email?.split('@')[0] || 'User'
      const photoURL = firebaseUser.photoURL || idTokenResult.claims.picture || undefined

      // Update the user's profile in Firebase Auth if not already set
      if (!firebaseUser.displayName || !firebaseUser.photoURL) {
        const { updateProfile } = await import('firebase/auth')
        const profileUpdate: any = {}
        
        if (!firebaseUser.displayName && displayName) {
          profileUpdate.displayName = displayName
        }
        
        if (!firebaseUser.photoURL && photoURL) {
          profileUpdate.photoURL = photoURL
        }
        
        if (Object.keys(profileUpdate).length > 0) {
          await updateProfile(firebaseUser, profileUpdate)
        }
      }
      
      console.log("User profile updated with Google data:", { displayName, photoURL })
    } catch (error) {
      console.error("Error updating user profile from Google:", error)
      // Don't throw - profile update failure shouldn't block login
    }
  }

  const signInWithGithub = async (options?: { rememberMe?: boolean }) => {
    if (localDevBypassEnabled) {
      setUser(makeLocalDevUser())
      await migrateGuestChats()
      return
    }
    if (!auth) throw new Error("Firebase Auth is not configured")
    await applyAuthPersistence(options?.rememberMe ?? true)
    const provider = new GithubAuthProvider()
    await signInWithPopup(auth, provider)
    await migrateGuestChats()
    console.log("Signed in with GitHub")
  }

  const logout = async () => {
    // Clear all redirect flags to ensure clean state on next login
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("fromChatbot")
        sessionStorage.removeItem("hasVisitedApp")
        sessionStorage.removeItem("lastChatbotActivityTime")
      } catch (e) {
        console.warn("[Clairvyn] Error clearing sessionStorage during logout", e)
      }
    }
    
    if (localDevBypassEnabled) {
      setUser(makeLocalDevUser())
      setIsGuest(false)
      return
    }
    if (auth) {
      await signOut(auth)
    }
    if (isGuest) {
      exitGuestMode()
    }
  }

  const getIdToken = useCallback(
    async (forceRefresh = false): Promise<string | null> => {
      if (localDevBypassEnabled) return LOCAL_DEV_BYPASS_TOKEN
      if (!auth) return null
      if (!auth.currentUser) return null
      try {
        return await auth.currentUser.getIdToken(forceRefresh)
      } catch (e) {
        console.error("Failed to get ID token", e)
        return null
      }
    },
    [localDevBypassEnabled]
  )

  const value = {
    user,
    loading,
    isGuest,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    logout,
    enterGuestMode,
    exitGuestMode,
    migrateGuestChats,
    getIdToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}