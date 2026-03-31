"use client"

import React from "react"

type PrivacyPolicyModalProps = {
  open: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
        
        {/* Header - Fixed */}
        <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 id="privacy-modal-title" className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              Privacy Policy
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">
              Last Updated: March 14, 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all active:scale-90"
            aria-label="Close"
          >
            <span className="text-2xl leading-none font-light">✕</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300 space-y-10">
            
            {/* Entity Block */}
            <div className="bg-gray-50 dark:bg-black/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
              <p className="text-sm font-medium leading-relaxed italic">
                At <strong>Clairvyn Private Limited</strong> (&quot;Clairvyn&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to protecting your privacy. This policy explains our data practices in compliance with the Digital Personal Data Protection Act (DPDPA), 2023.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono opacity-80">
                <p>Entity: Clairvyn Private Limited (CIN: U62099TN2025PTC180011)</p>
                <p>Address: No.136/1, No.8/9, Parvallal St, TN – 600057, India</p>
              </div>
            </div>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">1. Scope of Policy</h3>
              <p>This Policy applies to all users of our Platform, including our AI-driven design tools, website, and mobile applications. By using the Platform, you acknowledge the collection and use of information in accordance with this Policy.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">2. Information We Collect</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">2.1 Personal Data Provided by You</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Contact Information (Name, Email Address, Phone).</li>
                    <li>Account Credentials (Usernames and hashed/salted passwords).</li>
                    <li>Content Inputs (Prompts, uploaded architectural files, layout parameters).</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">2.2 Automatically Collected Data</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Device & Usage Info (IP Address, Browser Type, Session Duration).</li>
                    <li>Location Data (Derived from IP for regional compliance).</li>
                    <li>Telemetry (Feature usage patterns and performance logs).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">3. How We Use Your Information</h3>
              <p>We process your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To generate AI floor plans and provide design recommendations.</li>
                <li><strong>Product Improvement:</strong> To train and refine our generative AI models using anonymised data.</li>
                <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and malicious activity.</li>
                <li><strong>Communications:</strong> To send critical service updates and technical support notices.</li>
              </ul>
            </section>

            <section className="bg-teal-50 dark:bg-teal-950/20 p-8 rounded-2xl border border-teal-100 dark:border-teal-900/40">
              <h3 className="text-lg font-bold text-teal-900 dark:text-teal-400 mb-4 uppercase tracking-wide text-center">4. Proprietary Anonymisation Standards</h3>
              <p className="text-center text-sm mb-6 font-medium">To protect your privacy during model training, we apply a four-tier anonymisation protocol:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-300">Tier 1: Redaction</p>
                  <p className="text-[11px]">Automatic stripping of direct identifiers (Name, Email, Phone).</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-300">Tier 2: Prompt Filtering</p>
                  <p className="text-[11px]">Scanning and removal of addresses or PII within architectural prompts.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-300">Tier 3: Noise Injection</p>
                  <p className="text-[11px]">Differential privacy techniques to prevent "reverse-engineering" of data.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-300">Tier 4: Aggregation</p>
                  <p className="text-[11px]">Ensuring a minimum cohort size of 50 records for any analytical dataset.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">5. Cookies and Tracking</h3>
              <p>
                We use cookies to maintain your session and remember your preferences. You can manage your cookie settings through your browser, though disabling them may limit some Platform features.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">6. Data Sharing and Disclosure</h3>
              <p>We do not sell your personal data. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Cloud infrastructure (e.g., AWS/GCP) and payment gateways.</li>
                <li><strong>Legal Obligations:</strong> When required by law or to respond to valid legal process from government authorities.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">7. Data Retention</h3>
              <p>
                We retain your data only as long as necessary to fulfill the purposes outlined in this Policy. Content Inputs and Outputs are retained for 24 months after account deactivation for model maintenance, unless erasure is requested.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 mb-4">8. Your Rights</h3>
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a summary of the data we hold about you.</li>
                <li><strong>Erasure:</strong> Request the deletion of your personal data from our active systems.</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information.</li>
                <li><strong>Withdraw Consent:</strong> Opt out of future data processing.</li>
              </ul>
            </section>

            <section className="bg-gray-100 dark:bg-gray-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">9. Grievance and Contact</h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">Grievance Officer</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">Ronak Marlecha</p>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">Co-Founder & CFO</p>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Email:</strong> <a href="mailto:hello@clairvyn.com" className="text-teal-600 underline">hello@clairvyn.com</a></p>
                  <p><strong>Response Time:</strong> 30 Days (Statutory Limit)</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Footer Actions - Fixed */}
        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center sm:text-left max-w-sm leading-relaxed">
            By closing this modal or using the platform, you acknowledge that your data will be processed as per the 2026 Privacy Framework.
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-12 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-black shadow-xl shadow-teal-500/20 transition-all active:scale-95"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}