'use client'

import React, { createContext, useContext, ReactNode } from 'react'

export interface RelevanceMapping {
  itemId: string
  relevanceScore: number
  explanation: string
  keywords: string[]
}

export interface JobAnalysis {
  companyName: string
  jobTitle: string
  industry: string
  keyRequirements: string[]
  desiredSkills: string[]
  relevanceMappings: RelevanceMapping[]
  summary: string
  topStrengths: string[]
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

const noop = async () => {}

const staticValue: JobContextType = {
  jobDescription: null,
  jobAnalysis: null,
  isAnalyzing: false,
  error: null,
  setJobDescription: () => {},
  analyzeJob: noop,
  clearJob: () => {},
  getRelevance: () => null,
  hasJob: false,
}

const JobContext = createContext<JobContextType>(staticValue)

export function JobProvider({ children }: { children: ReactNode }) {
  return <JobContext.Provider value={staticValue}>{children}</JobContext.Provider>
}

export function useJob() {
  return useContext(JobContext)
}
