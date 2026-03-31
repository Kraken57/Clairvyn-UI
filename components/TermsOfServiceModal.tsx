"use client"

import React from "react"

type TermsOfServiceModalProps = {
  open: boolean
  onClose: () => void
}

export function TermsOfServiceModal({ open, onClose }: TermsOfServiceModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 id="terms-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Terms of Service
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Last Updated: March 14, 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Close"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300 space-y-8">
            
            {/* Introduction & Company Details */}
            <header className="border-b border-gray-100 dark:border-gray-800 pb-6">
              <p className="text-base leading-relaxed italic">
                These Terms of Service ("Terms") govern your access to and use of the platform, tools, and services provided by <strong>Clairvyn Private Limited</strong>.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-gray-50 dark:bg-black/20 p-4 rounded-lg">
                <div>
                  <span className="block text-gray-500 uppercase tracking-widest">Entity</span>
                  Clairvyn Private Limited (CIN: U62099TN2025PTC180011)
                </div>
                <div>
                  <span className="block text-gray-500 uppercase tracking-widest">Registered Office</span>
                  No.136/1, No.8/9, Parvallal Street, Tiruvallur – 600057, TN, India.
                </div>
              </div>
            </header>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Platform, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or legal entity, you represent that you have the authority to bind such entity. If you do not agree, you must immediately cease all use of the Platform.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">2. Eligibility and Registration</h3>
              <p>
                You must be at least 13 years old to use the Platform. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate. You are responsible for safeguarding your account password and for all activities under your account.
              </p>
            </section>

            <section className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-lg border border-amber-200 dark:border-amber-900/50">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-3">3. AI Platform Disclaimers (Crucial)</h3>
              <div className="space-y-4 text-xs sm:text-sm uppercase leading-relaxed font-semibold">
                <p>
                  3.1 THE SERVICES ARE PROVIDED "AS IS." CLAIRVYN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </p>
                <p>
                  3.2 AI-GENERATED OUTPUTS (FLOOR PLANS, DESIGNS, RENDERINGS) ARE FOR CONCEPTUAL PURPOSES ONLY. THEY DO NOT CONSTITUTE ARCHITECTURAL OR ENGINEERING BLUEPRINTS. 
                </p>
                <p className="text-red-600 dark:text-red-400 underline">
                  3.3 MANDATORY REVIEW: ALL OUTPUTS MUST BE REVIEWED, VALIDATED, AND SIGNED OFF BY A LICENSED PROFESSIONAL ARCHITECT OR STRUCTURAL ENGINEER PRIOR TO ANY PHYSICAL CONSTRUCTION OR LAND DEVELOPMENT.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">4. Intellectual Property Rights</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Platform Ownership:</strong> All rights, title, and interest in the Platform (excluding User Content) are and will remain the exclusive property of Clairvyn.</li>
                <li><strong>User Inputs:</strong> You retain all ownership rights to the prompts and data you upload. You grant Clairvyn a license to use this content to provide and improve the services.</li>
                <li><strong>Output Ownership:</strong> Subject to your compliance with these Terms and payment of fees, Clairvyn hereby assigns to you all its right, title, and interest in and to the specific Outputs generated for you.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">5. Prohibited Conduct</h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Platform for any illegal purposes or in violation of local laws.</li>
                <li>Reverse engineer, decompile, or attempt to extract the source code of the AI models.</li>
                <li>Use the Platform to generate harmful, defamatory, or infringing content.</li>
                <li>Bypass any automated measures (bots/scrapers) to access the service.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">6. Fees and Payments</h3>
              <p>
                Certain features require a paid subscription. All fees are non-refundable except as required by law. Clairvyn reserves the right to change its pricing at any time with 30 days' notice to active subscribers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">7. Limitation of Liability</h3>
              <p className="font-bold">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CLAIRVYN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU IN THE LAST SIX MONTHS.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 underline decoration-teal-500/30">8. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the courts of <strong>Chennai, Tamil Nadu</strong>.
              </p>
            </section>

            <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">9. Contact Information</h3>
              <p className="mb-1">For legal notices or questions, please contact:</p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> <a href="mailto:hello@clairvyn.com" className="text-teal-600 dark:text-teal-400 font-medium">hello@clairvyn.com</a></p>
                <p><strong>Address:</strong> No.136/1, No.8/9, Parvallal Street, Murugappa Nagar, Ennore RS, Ambattur, Tiruvallur – 600057, TN, India.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}