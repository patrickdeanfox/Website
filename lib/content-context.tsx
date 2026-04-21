'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import {
  HeroContent,
  AboutContent,
  ResumeContent,
  ExperienceContent,
  CareerContent,
  AIContent,
  defaultHeroContent,
  defaultAboutContent,
  defaultResumeContent,
  defaultExperienceContent,
  defaultCareerContent,
  defaultAIContent,
} from './default-content'

interface ContentContextType {
  hero: HeroContent
  about: AboutContent
  resume: ResumeContent
  experience: ExperienceContent
  career: CareerContent
  ai: AIContent
  loading: boolean
  refetch: () => Promise<void>
}

const staticValue: ContentContextType = {
  hero: defaultHeroContent,
  about: defaultAboutContent,
  resume: defaultResumeContent,
  experience: defaultExperienceContent,
  career: defaultCareerContent,
  ai: defaultAIContent,
  loading: false,
  refetch: async () => {},
}

const ContentContext = createContext<ContentContextType>(staticValue)

export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider value={staticValue}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
