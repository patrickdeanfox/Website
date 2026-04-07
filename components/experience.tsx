'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Warehouse, Package, Database, BarChart3, Users, CheckCircle2, 
  ChevronDown, ChevronUp, Zap, Server, LineChart, Boxes, Building2, ArrowUp 
} from 'lucide-react'
import RelevancePopup from '@/components/relevance-popup'
import { useContent } from '@/lib/content-context'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Warehouse, Package, Database, BarChart3, Users, 
  Zap, Server, LineChart, Boxes, Building2
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const { experience } = useContent()

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const scrollToResume = (jobId: string) => {
    const element = document.getElementById(`resume-${jobId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Get icon component from string name
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || BarChart3
  }

  return (
    <section id="experience" className="py-20 px-4 section-amber relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Warehouse className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">{experience.badgeText}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {experience.headline.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{experience.headline.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {experience.description}
          </p>
        </motion.div>

        <div className="space-y-6">
          {experience.projects.map((project, index) => {
            const IconComponent = getIcon(project.icon)
            const isExpanded = expandedProject === project.id

            return (
              <motion.div
                key={project.id}
                id={`experience-${project.id === 'zuar-deep' ? 'zuar' : project.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div
                  className={`bg-slate-800/60 rounded-2xl border ${project.borderColor} hover:border-opacity-70 transition-all duration-300 overflow-hidden relative`}
                >
                  {/* Current role badge */}
                  {project.isCurrent && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        Current Role
                      </span>
                    </div>
                  )}
                  
                  {/* Header - Always Visible */}
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">{project.industry}</p>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            {project.company}
                            {project.roleItemId && <RelevancePopup itemId={project.roleItemId} />}
                          </h3>
                          <p className="text-blue-400 font-medium">{project.title}</p>
                          <p className="text-gray-500 text-sm">{project.subtitle} • {project.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-blue-400 text-sm hidden md:block">View Details</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                      {project.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="bg-slate-900/50 rounded-lg p-3 text-center border border-gray-700/30 relative">
                          {metric.itemId && (
                            <div className="absolute top-1 right-1">
                              <RelevancePopup itemId={metric.itemId} />
                            </div>
                          )}
                          <p className="text-lg font-bold text-blue-400">{metric.value}</p>
                          <p className="text-xs text-gray-500">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-6">
                      {/* Link back to resume */}
                      <button
                        onClick={() => scrollToResume(project.id === 'zuar-deep' ? 'zuar' : project.id)}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                        <span>Back to Resume</span>
                      </button>
                      
                      {/* Challenge */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          The Situation
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          What I Did
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                      </div>

                      {/* Technical Implementation */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Technical Details
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {project.technical.map((tech, tIndex) => {
                            const TechIcon = getIcon(tech.icon)
                            return (
                              <div key={tIndex} className="bg-slate-900/50 rounded-xl p-4 border border-gray-700/30 relative">
                                {tech.itemId && (
                                  <div className="absolute top-2 right-2">
                                    <RelevancePopup itemId={tech.itemId} />
                                  </div>
                                )}
                                <div className="flex items-center gap-3 mb-2">
                                  <TechIcon className="w-5 h-5 text-blue-400" />
                                  <h5 className="font-semibold text-white">{tech.area}</h5>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{tech.details}</p>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          Results
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {project.outcomes.map((outcome, oIndex) => (
                            <div key={oIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                              <span className="text-gray-300 text-sm flex-1 flex items-center gap-1">
                                {outcome.text}
                                {outcome.itemId && <RelevancePopup itemId={outcome.itemId} />}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Related Achievements */}
                      <div className="pt-4 border-t border-gray-700/50">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Takeaways</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.relatedAchievements.map((achievement, aIndex) => (
                            <span key={aIndex} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/30">
                              {achievement.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
