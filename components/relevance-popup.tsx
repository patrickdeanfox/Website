'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, TrendingUp } from 'lucide-react'
import { useJob } from '@/lib/job-context'

interface RelevancePopupProps {
  itemId: string
  className?: string
}

export default function RelevancePopup({ itemId, className = '' }: RelevancePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'above' | 'below'>('below')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const { getRelevance, hasJob, jobAnalysis } = useJob()

  const relevance = getRelevance(itemId)

  // Don't render if no job is loaded or no relevance for this item
  if (!hasJob || !relevance) return null

  // Calculate position on open
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      setPosition(spaceBelow < 200 && spaceAbove > spaceBelow ? 'above' : 'below')
    }
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
    if (score >= 60) return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Relevant'
    if (score >= 60) return 'Relevant'
    return 'Somewhat Relevant'
  }

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-1 hover:bg-blue-500/10 rounded-full transition-colors"
        title="See job relevance"
      >
        <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
        {/* Pulse indicator for high relevance */}
        {relevance.relevanceScore >= 80 && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.95, y: position === 'below' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'below' ? -10 : 10 }}
            className={`absolute z-50 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl ${
              position === 'below' ? 'top-full mt-2' : 'bottom-full mb-2'
            } left-1/2 -translate-x-1/2`}
          >
            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-slate-700 rotate-45 ${
                position === 'below'
                  ? '-top-1.5 border-l border-t'
                  : '-bottom-1.5 border-r border-b'
              }`}
            />

            <div className="relative p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-slate-300">Job Relevance</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-700 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Score */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(relevance.relevanceScore)}`}>
                  {relevance.relevanceScore}%
                </div>
                <span className="text-sm text-slate-400">{getScoreLabel(relevance.relevanceScore)}</span>
              </div>

              {/* Job context */}
              {jobAnalysis && (
                <div className="text-xs text-slate-500 mb-3">
                  For: <span className="text-slate-400">{jobAnalysis.jobTitle}</span> at <span className="text-slate-400">{jobAnalysis.companyName}</span>
                </div>
              )}

              {/* Explanation */}
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {relevance.explanation}
              </p>

              {/* Matching Keywords */}
              {relevance.keywords.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">Matching Keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {relevance.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
