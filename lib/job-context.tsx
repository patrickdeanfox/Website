'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Types for job analysis
export interface RelevanceMapping {
  itemId: string // unique identifier for the experience/claim
  relevanceScore: number // 0-100
  explanation: string // how this relates to the job
  keywords: string[] // matching keywords from job description
}

export interface JobAnalysis {
  companyName: string
  jobTitle: string
  industry: string
  keyRequirements: string[]
  desiredSkills: string[]
  relevanceMappings: RelevanceMapping[]
  summary: string // brief summary of how candidate fits
  topStrengths: string[] // top 3 strengths for this role
}

export interface JobContextType {
  jobDescription: string | null
  jobAnalysis: JobAnalysis | null
  isAnalyzing: boolean
  error: string | null
  setJobDescription: (description: string) => void
  analyzeJob: (description: string) => Promise<void>
  clearJob: () => void
  getRelevance: (itemId: string) => RelevanceMapping | null
  hasJob: boolean
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobDescription, setJobDescriptionState] = useState<string | null>(null)
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setJobDescription = useCallback((description: string) => {
    setJobDescriptionState(description)
  }, [])

  const analyzeJob = useCallback(async (description: string) => {
    setIsAnalyzing(true)
    setError(null)
    setJobDescriptionState(description)

    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: description })
      })

      if (!response.ok) {
        throw new Error('Failed to analyze job description')
      }

      const data = await response.json()
      setJobAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setJobAnalysis(null)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const clearJob = useCallback(() => {
    setJobDescriptionState(null)
    setJobAnalysis(null)
    setError(null)
  }, [])

  const getRelevance = useCallback((itemId: string): RelevanceMapping | null => {
    if (!jobAnalysis) return null
    return jobAnalysis.relevanceMappings.find(m => m.itemId === itemId) || null
  }, [jobAnalysis])

  const value: JobContextType = {
    jobDescription,
    jobAnalysis,
    isAnalyzing,
    error,
    setJobDescription,
    analyzeJob,
    clearJob,
    getRelevance,
    hasJob: !!jobAnalysis
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  )
}

export function useJob() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error('useJob must be used within a JobProvider')
  }
  return context
}
