'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Briefcase, Loader2, CheckCircle2, AlertCircle, Trash2, Sparkles } from 'lucide-react'
import { useJob } from '@/lib/job-context'

interface JobInputModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function JobInputModal({ isOpen, onClose }: JobInputModalProps) {
  const [jobText, setJobText] = useState('')
  const { analyzeJob, isAnalyzing, error, jobAnalysis, clearJob } = useJob()

  const handleAnalyze = async () => {
    if (!jobText.trim()) return
    await analyzeJob(jobText)
  }

  const handleClear = () => {
    clearJob()
    setJobText('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] bg-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Tailor to Job</h2>
                  <p className="text-sm text-slate-400">Paste a job description to see how your experience aligns</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              {jobAnalysis ? (
                // Show analysis results
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Analysis Complete</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{jobAnalysis.jobTitle}</h3>
                      <p className="text-slate-400">{jobAnalysis.companyName} • {jobAnalysis.industry}</p>
                    </div>
                    <button
                      onClick={handleClear}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </button>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Fit Summary</h4>
                    <p className="text-slate-300 leading-relaxed">{jobAnalysis.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Your Top Strengths for This Role</h4>
                    <div className="space-y-2">
                      {jobAnalysis.topStrengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                          <span className="text-slate-300">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Key Requirements</h4>
                      <ul className="space-y-1">
                        {jobAnalysis.keyRequirements.map((req, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Desired Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {jobAnalysis.desiredSkills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-sm text-blue-300">
                      <strong>💡 Tip:</strong> Look for the <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 rounded"><Sparkles className="w-3 h-3" /> info</span> icons throughout the portfolio to see how each experience relates to this job.
                    </p>
                  </div>
                </div>
              ) : (
                // Show input form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Paste the Job Description
                    </label>
                    <textarea
                      value={jobText}
                      onChange={(e) => setJobText(e.target.value)}
                      placeholder="Paste the full job description here...\n\nInclude the job title, company, responsibilities, requirements, and qualifications for the best analysis."
                      className="w-full h-64 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      disabled={isAnalyzing}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-500">
                    Your job description is analyzed locally and not stored. The analysis maps your experience to the job requirements.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                {jobAnalysis ? 'Close' : 'Cancel'}
              </button>
              {!jobAnalysis && (
                <button
                  onClick={handleAnalyze}
                  disabled={!jobText.trim() || isAnalyzing}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze Job
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
