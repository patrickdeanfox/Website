'use client'

import { useState } from 'react'
import { Briefcase, X, CheckCircle2 } from 'lucide-react'
import { useJob } from '@/lib/job-context'
import JobInputModal from './job-input-modal'

export default function JobButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { hasJob, jobAnalysis, clearJob } = useJob()

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Job status indicator */}
        {hasJob && jobAnalysis && (
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">
              Tailored for: {jobAnalysis.jobTitle}
            </span>
            <button
              onClick={clearJob}
              className="p-1 hover:bg-emerald-500/20 rounded transition-colors"
              title="Clear job"
            >
              <X className="w-3 h-3 text-emerald-400" />
            </button>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 ${
            hasJob
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>{hasJob ? 'Update Job' : 'Tailor to Job'}</span>
        </button>
      </div>

      <JobInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
