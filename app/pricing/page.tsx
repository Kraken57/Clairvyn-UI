"use client"

import Link from "next/link"
import Image from "next/image"

const basicFeatures = [
  { label: "Limited Prompts", included: true },
  { label: "Basic Admin", included: true },
  { label: "Basic Data Retention", included: true },
  { label: "Generative Floor Plans", included: true },
  { label: "Custom Data Retention", included: false },
]

const premiumFeatures = [
  "Multi-step design",
  "Unlimited prompts",
  "Unlimited Users Team",
  "Advanced Admin",
  "Custom Data Retention",
]

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image src="/pricing_bg.png" alt="Pricing background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,246,255,0.9),rgba(241,240,255,0.8))]" />
        <div className="absolute -left-48 top-24 h-[600px] w-[600px] rounded-full bg-[#b0a2ff]/20 blur-3xl" />
        <div className="absolute right-[-120px] top-10 h-[260px] w-[260px] rounded-full border border-white/60 bg-white/45 blur-[1px]" />
        <div className="absolute bottom-[-220px] left-[22%] h-[560px] w-[560px] rounded-full bg-[#c8c4ff]/25 blur-3xl" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/light.png" alt="Clairvyn" width={120} height={40} priority />
              </Link>

              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                <Link href="/#features" className="hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/#about" className="hover:text-gray-900 transition-colors">
                  About
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/signup"
                  className="rounded-full bg-[#1e2bd6] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-5 py-28 md:px-8 md:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1f3f97] md:text-[44px]">Plans &amp; Pricing</h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#6e7391] md:text-lg">
          Whether your time-saving automation needs are large or small, we&apos;re here to help you scale.
        </p>

        <section className="mt-6 grid w-full gap-6 pb-6 md:grid-cols-2 md:gap-8">
          <article className="w-full rounded-[20px] border border-white/35 bg-gradient-to-br from-[#7f95f1] to-[#6e86df] p-5 text-white shadow-[0_16px_30px_rgba(40,58,152,0.28)]">
            <div className="flex justify-end">
              <span className="rounded-full bg-[#3f4a8d]/80 px-4 py-1 text-[9px] font-bold tracking-[0.16em]">DEFAULT</span>
            </div>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-bold opacity-85">₹</span>
              <span className="text-[34px] font-extrabold leading-none">FREE</span>
            </div>

            <h2 className="mt-3 text-[30px] font-medium">Basic</h2>
            <p className="mt-1 max-w-[300px] text-sm leading-relaxed text-white/90">Automation plus enterprise-grade features.</p>

            <ul className="mt-4 space-y-1.5 text-[15px]">
              {basicFeatures.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3 text-white/95">
                  <span className={feature.included ? "text-white/90" : "text-[#ff8a7a]"}>{feature.included ? "✓" : "✕"}</span>
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <button className="mt-5 w-full rounded-full bg-[#162f8f] py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1b3ba7]">
              Choose plan
            </button>
          </article>

          <article className="w-full rounded-[20px] border border-white/40 bg-gradient-to-br from-[#7c97ff] to-[#183da8] p-5 text-white shadow-[0_20px_36px_rgba(22,41,127,0.34)]">
            <div className="flex justify-end">
              <span className="rounded-full bg-[#2a2d73]/80 px-4 py-1 text-[9px] font-bold tracking-[0.16em]">PREMIUM</span>
            </div>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-bold opacity-85">₹</span>
              <span className="text-[34px] font-extrabold leading-none">299</span>
              <span className="mb-1 text-lg text-white/90">/month</span>
            </div>

            <h2 className="mt-3 text-[30px] font-medium">Company</h2>
            <p className="mt-1 max-w-[300px] text-sm leading-relaxed text-white/90">Automation plus enterprise-grade features.</p>

            <ul className="mt-4 space-y-1.5 text-[15px] text-white/95">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="text-white/90">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="mt-5 w-full rounded-full bg-[#89a4ff]/90 py-2.5 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-colors hover:bg-[#99b0ff]">
              Choose plan
            </button>
          </article>
        </section>
      </main>
    </div>
  )
}
