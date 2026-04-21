'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'
import { 
  Building2, Users, BarChart3, Database, Code2, Target, 
  TrendingUp, ChevronDown, ChevronUp, X, Layers, Brain,
  LineChart, PieChart, Zap, Clock, CheckCircle2, Server,
  Cpu, Sparkles, Activity, DollarSign, Globe, FileText, Settings, Box, Briefcase, LucideIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import RelevancePopup from '@/components/relevance-popup'
import { portalProjects as portalProjectsData } from '@/lib/portal-projects-data'

const iconMap: Record<string, LucideIcon> = {
  Building2, Users, BarChart3, Database, Code2, Target, TrendingUp, LineChart,
  PieChart, Zap, Clock, Server, Cpu, Sparkles, Layers, Brain, Activity,
  DollarSign, Globe, FileText, Settings, Box, Briefcase
}

interface PortalProject {
  id: string
  client: string
  industry: string
  title: string
  subtitle: string
  icon: string
  color: string
  borderColor: string
  projectItemId: string
  metrics: Array<{ value: string; label: string; itemId?: string | null }>
  challenge: string
  solution: string
  technical: Array<{ area: string; icon: string; details: string; itemId?: string | null }>
  outcomes: Array<{ text: string; itemId?: string | null }>
  screenshots: string[]
  displayOrder: number
  isVisible: boolean
  flagshipBadge: string
  initialSize: 'collapsed' | 'full'
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projects, setProjects] = useState<PortalProject[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mapped: PortalProject[] = portalProjectsData.map((p) => ({
      ...p,
      screenshots: p.defaultScreenshots,
      isVisible: true,
      flagshipBadge: p.flagshipBadge ?? '',
      initialSize: 'full',
    }))
    setProjects(mapped)
    setLoading(false)
    setTimeout(() => setIsFirstRender(false), 100)
  }, [])

  const getIcon = (iconName: string) => iconMap[iconName] || Building2

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setExpandedProject(null)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setExpandedProject(null)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
    setExpandedProject(null)
  }

  if (loading) {
    return (
      <section id="projects" className="py-24 md:py-32 section-accent relative pattern-grid">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse"><div className="h-8 bg-slate-700 rounded w-48 mx-auto mb-4" /><div className="h-4 bg-slate-700 rounded w-64 mx-auto" /></div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) return null

  const currentProject = projects[currentIndex]
  const Icon = getIcon(currentProject?.icon)
  const isExpanded = expandedProject === currentProject?.id

  return (
    <section id="projects" className="py-24 md:py-32 section-accent relative pattern-grid overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Data Experience Platforms</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portal <span className="gradient-text">Projects</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Enterprise analytics portals I've designed and built. Swipe or use arrows to explore.</p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative" ref={carouselRef}>
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-colors shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-colors shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Project Card */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentProject.id}
              initial={isFirstRender ? false : { opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className={`bg-slate-800/60 rounded-2xl border ${currentProject.borderColor} overflow-hidden group hover:border-blue-500/50 transition-all duration-300`}
            >
              {/* Header - Always Visible */}
              <div className="p-6 cursor-pointer relative" onClick={() => setExpandedProject(isExpanded ? null : currentProject.id)}>
                {/* Click indicator bar - always visible when collapsed */}
                {!isExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500/30 via-blue-500/60 to-blue-500/30 animate-pulse" />
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentProject.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded-full font-medium">{currentProject.flagshipBadge}</span>
                        <RelevancePopup itemId={currentProject.projectItemId} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{currentProject.client}</h3>
                      <p className="text-blue-400 font-medium">{currentProject.title}</p>
                      <p className="text-slate-500 text-sm mt-1">{currentProject.industry} • {currentProject.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button className={`p-2.5 rounded-xl transition-all ${isExpanded ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'}`}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {!isExpanded && <span className="text-[10px] text-blue-400 font-medium mt-1">Click to expand</span>}
                  </div>
                </div>

                {/* KPIs - Always Visible */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  {currentProject.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className={`bg-gradient-to-br ${currentProject.color} bg-opacity-10 rounded-xl p-4 text-center relative`}>
                      {metric.itemId && <div className="absolute top-1 right-1"><RelevancePopup itemId={metric.itemId} /></div>}
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-xs text-slate-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-6 pb-6 space-y-6">
                      {/* Challenge & Solution */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/20">
                          <h4 className="text-amber-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <Target size={16} /> Challenge
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{currentProject.challenge}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                          <h4 className="text-emerald-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} /> Solution
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{currentProject.solution}</p>
                        </div>
                      </div>

                      {/* Technical Details */}
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/20">
                        <h4 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
                          <Code2 size={16} /> Technical Implementation
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {currentProject.technical?.map((tech, tIdx) => {
                            const TechIcon = getIcon(tech.icon)
                            return (
                              <div key={tIdx} className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                  <TechIcon className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-white text-sm">{tech.area}</h5>
                                    {tech.itemId && <RelevancePopup itemId={tech.itemId} />}
                                  </div>
                                  <p className="text-slate-400 text-xs leading-relaxed">{tech.details}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-violet-500/20">
                        <h4 className="text-violet-400 font-semibold text-sm mb-3 flex items-center gap-2">
                          <TrendingUp size={16} /> Results & Outcomes
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {currentProject.outcomes?.map((outcome, oIdx) => (
                            <div key={oIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                              <span className="text-slate-300 text-sm flex items-center gap-1">
                                {outcome.text}
                                {outcome.itemId && <RelevancePopup itemId={outcome.itemId} />}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Screenshots */}
                      {currentProject.screenshots && currentProject.screenshots.length > 0 && (
                        <div>
                          <h4 className="text-slate-400 font-semibold text-sm mb-3 flex items-center gap-2">
                            <Layers size={16} /> Screenshots
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {currentProject.screenshots.map((screenshot, sIdx) => (
                              <div key={sIdx} onClick={(e) => { e.stopPropagation(); setSelectedImage(screenshot) }}
                                className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 cursor-pointer hover:border-blue-500/50 transition-colors">
                                <Image src={screenshot} alt={`${currentProject.client} screenshot`} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Project Strip Navigation - Grid layout with text wrap */}
          <div className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {projects.map((project, index) => {
                const ProjectIcon = getIcon(project.icon)
                const isActive = index === currentIndex
                return (
                  <button
                    key={project.id}
                    onClick={() => goToProject(index)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${project.color} text-white shadow-lg ring-2 ring-white/20`
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                    }`}
                    aria-label={`Go to ${project.client}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-slate-700/50'
                    }`}>
                      <ProjectIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-left leading-tight line-clamp-2">{project.client}</span>
                  </button>
                )
              })}
            </div>
            {/* Dots below for quick reference */}
            <div className="flex justify-center gap-1.5 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"><X size={24} /></button>
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image src={selectedImage} alt="Screenshot" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
