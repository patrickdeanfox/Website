'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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
  defaultAIContent
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

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroContent>(defaultHeroContent)
  const [about, setAbout] = useState<AboutContent>(defaultAboutContent)
  const [resume, setResume] = useState<ResumeContent>(defaultResumeContent)
  const [experience, setExperience] = useState<ExperienceContent>(defaultExperienceContent)
  const [career, setCareer] = useState<CareerContent>(defaultCareerContent)
  const [ai, setAi] = useState<AIContent>(defaultAIContent)
  const [loading, setLoading] = useState(true)

  const fetchContent = async () => {
    try {
      const sections = ['hero', 'about', 'career', 'ai']
      const results = await Promise.all(
        sections.map(s => 
          fetch(`/api/content?section=${s}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      )

      if (results[0]) setHero(results[0])
      if (results[1]) setAbout(results[1])
      if (results[2]) {
        setCareer(results[2])
        // Also derive legacy resume/experience from career for backward compatibility
        setResume({
          summary: results[2].summary,
          timelineTitle: results[2].timelineTitle,
          timeline: results[2].timeline,
          experience: results[2].entries.map((entry: any) => ({
            id: entry.id,
            company: entry.company,
            role: entry.role,
            period: entry.period,
            location: entry.location,
            color: entry.color,
            borderColor: entry.borderColor,
            roleItemId: entry.roleItemId,
            image: entry.image,
            highlights: entry.highlights,
            metrics: entry.metrics
          }))
        })
        setExperience({
          badgeText: 'Career Deep Dives',
          headline: 'Experience Case Studies',
          description: 'Detailed look at what I actually did at each company.',
          projects: results[2].entries
            .filter((entry: any) => entry.deepDive)
            .map((entry: any) => ({
              id: entry.id === 'zuar' ? 'zuar-deep' : entry.id,
              company: entry.company,
              industry: entry.industry,
              title: entry.deepDive.title,
              subtitle: entry.deepDive.subtitle,
              icon: entry.icon,
              color: entry.color,
              borderColor: entry.borderColor,
              period: entry.period,
              isCurrent: entry.isCurrent,
              roleItemId: entry.roleItemId,
              metrics: entry.metrics.slice(0, 4).map((m: any) => ({ 
                value: m.text.split(' ')[0] || '', 
                label: m.text.split(' ').slice(1).join(' ') || m.text,
                itemId: m.itemId 
              })),
              challenge: entry.deepDive.challenge,
              solution: entry.deepDive.solution,
              technical: entry.deepDive.technical,
              outcomes: entry.deepDive.outcomes,
              relatedAchievements: []
            }))
        })
      }
      if (results[3]) setAi(results[3])
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <ContentContext.Provider value={{ hero, about, resume, experience, career, ai, loading, refetch: fetchContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
