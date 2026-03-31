"use client"

import React from "react"

type ConsentNoticeModalProps = {
  open: boolean
  onClose: () => void
}

export function ConsentNoticeModal({ open, onClose }: ConsentNoticeModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
        
        {/* Header - Fixed */}
        <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-teal-50/30 dark:bg-teal-900/10">
          <div>
            <h2 id="consent-modal-title" className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              Consent Notice
            </h2>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-[0.2em] mt-1">
              Pursuant to DPDPA Section 5 
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 transition-all"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">✕</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300 space-y-10">
            
            {/* 1. Identity of Data Fiduciary */}
            <section className="bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">1. Identity of the Data Fiduciary [cite: 337]</h3>
              <p className="text-sm">
                This Notice is issued by <strong>Clairvyn Private Limited</strong> (&quot;Data Fiduciary&quot;), a company incorporated under the Companies Act, 2013[cite: 338].
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono uppercase text-gray-500">
                <p>CIN: U62099TN2025PTC180011 [cite: 336]</p>
                <p>GSTIN: 33AAMCC6875A1ZO [cite: 336]</p>
                <p className="sm:col-span-2">Address: No.136/1, No.8/9, Parvallal Street, Tiruvallur – 600057, TN, India [cite: 336]</p>
              </div>
            </section>

            {/* 2. Purpose */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">2. Purpose of This Notice [cite: 340]</h3>
              <p>
                This Notice provides an itemised description of the personal data collected, the specific purposes for processing, and your rights as a Data Principal before seeking your consent[cite: 341]. This is a standalone document supplementary to our Privacy Policy[cite: 342].
              </p>
            </section>

            {/* 3. Data Categories */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">3. Personal Data Sought to Be Collected [cite: 343]</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider text-teal-600">Identity & Auth [cite: 344]</p>
                  <p className="text-xs italic text-gray-500">Full name, email, and hashed passwords[cite: 344, 345].</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider text-teal-600">Inputs & Design [cite: 346]</p>
                  <p className="text-xs italic text-gray-500">Textual prompts and spatial parameters[cite: 346].</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider text-teal-600">Usage & Technical [cite: 348]</p>
                  <p className="text-xs italic text-gray-500">Feature logs, IP address, and device info[cite: 348, 349].</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider text-teal-600">Billing & Support [cite: 350]</p>
                  <p className="text-xs italic text-gray-500">Payment method details and support correspondence[cite: 350, 351].</p>
                </div>
              </div>
            </section>

            {/* 4. Purposes of Consent */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">4. Specific Purposes for Consent [cite: 352]</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Creation and authentication of your registered account[cite: 353].</li>
                <li>Processing floor plan inputs through AI models[cite: 354].</li>
                <li>Enabling project collaboration and version history[cite: 355].</li>
                <li>Preparing and sharing anonymised datasets with partners[cite: 358].</li>
                <li>Transmitting transactional and optional marketing communications[cite: 359, 360].</li>
              </ul>
            </section>

            {/* 6. Anonymisation (Highlighted) */}
            <section className="bg-teal-50 dark:bg-teal-950/20 p-8 rounded-2xl border border-teal-100 dark:border-teal-900/40">
              <h3 className="text-lg font-bold text-teal-900 dark:text-teal-400 mb-4 uppercase tracking-wide">6. Data Partnerships and Anonymisation [cite: 368]</h3>
              <p className="text-sm mb-4">
                We share anonymised datasets with partners in the architecture and technology sectors. All data is stripped of direct identifiers and processed through a <strong>sanitisation pipeline</strong> to remove PII from prompts before sharing[cite: 371, 372].
              </p>
              <p className="text-xs font-bold text-teal-800 dark:text-teal-300 italic">
                You have the right to opt out of row-level anonymised sharing at any time[cite: 376].
              </p>
            </section>

            {/* 8. Rights */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">8. Rights of the Data Principal [cite: 382]</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Right to Access [cite: 383]",
                  "Right to Correction [cite: 384]",
                  "Right to Erasure [cite: 385]",
                  "Withdraw Consent [cite: 386]",
                  "Partner Opt-Out [cite: 387]",
                  "Nomination Right [cite: 388]"
                ].map((right, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-center border border-gray-100 dark:border-gray-700">
                    {right}
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Consequences (Critical) */}
            <section className="border-t-2 border-dashed border-gray-100 dark:border-gray-800 pt-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-red-600 dark:text-red-400">10. Consequences of Non-Consent [cite: 394]</h3>
              <p className="text-sm font-medium">
                Consent for identity and authentication data is <strong>mandatory</strong> to use the Platform[cite: 395]. Consent for analytics, marketing, and row-level anonymised sharing is <strong>optional</strong>; withholding it will not affect your access to core features[cite: 397, 398, 399].
              </p>
            </section>

            {/* 9. Grievance Officer */}
            <section className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-8 rounded-2xl">
              <h3 className="text-xl font-black mb-4">9. Grievance Officer [cite: 390]</h3>
              <div className="space-y-1">
                <p className="text-lg font-bold">Ronak Marlecha </p>
                <p className="text-xs uppercase opacity-70 tracking-widest">Co-Founder & CFO </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 dark:border-gray-200 text-sm flex flex-col md:flex-row gap-4 justify-between">
                <p>Email: <a href="mailto:hello@clairvyn.com" className="underline underline-offset-4 font-bold tracking-tight">hello@clairvyn.com </a></p>
                <p className="opacity-70 text-xs">Resolution within 30 Days [cite: 393]</p>
              </div>
            </section>

            {/* 11. Manner of Consent */}
            <section className="text-center pb-8">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
                This notice is provided in plain language. By checking the consent box, you confirm your affirmative act of consent[cite: 401].
              </p>
            </section>
          </div>
        </div>

        {/* Footer Actions - Fixed */}
        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between gap-4">
          <p className="hidden sm:block text-[10px] text-gray-400 max-w-xs">
            A record of this consent (v14.03.2026) is maintained for compliance[cite: 402].
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-12 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-black shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}