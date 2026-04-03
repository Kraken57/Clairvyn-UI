"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LandingHeader() {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/light.png"
                alt="Clairvyn"
                width={120}
                height={40}
                className="dark:hidden"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">
              {/* <Link href="/#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link> */}
              <Link href="/pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/signin")}
                className="rounded-full bg-[#1e2bd6] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
