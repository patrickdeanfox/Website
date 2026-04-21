'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FileText, Download, Building2, Calendar, MapPin,
  Warehouse, Package, Database,
  BarChart3, Users, CheckCircle2, ChevronDown, ChevronUp, Zap,
  Server, LineChart, Boxes, Briefcase, BookOpen,
} from 'lucide-react'
import RelevancePopup from '@/components/relevance-popup'
import { useContent } from '@/lib/content-context'
import Image from 'next/image'

const iconMap: Record<string, any> = {
  Warehouse, Package, Database, BarChart3, Users,
  Zap, Server, LineChart, Boxes, Building2, Briefcase,
}

function ResumeDownloadButton() {
  return (
    <a
      href="/Patrick_Dean_Fox_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-blue-500 hover:bg-blue-600 text-white"
    >
      <Download className="w-4 h-4" />
      Download PDF
    </a>
  )
}

export default function Career() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { career } = useContent()
  const [expandedRole, setExpandedRole] = useState<string | null>(null)

  const getIcon = (iconName: string) => iconMap[iconName] || BarChart3

  // Catchy titles for roles with deep dives
  const deepDiveTitles: Record<string, string> = {
    'zuar': '🚀 Full-Stack Analytics',
    'propel': '📊 Zero to BI Hero',
    'thomas': '📦 Startup to Scale'
  }

  return (
    <section id="career" className="py-20 section-violet relative">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Career Journey</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            {career.summary}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-lg font-semibold text-gray-300 mb-8 text-center">{career.timelineTitle}</h3>
          
          {/* Deep Dive Labels Above Timeline */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2 min-w-[800px] overflow-x-auto">
              {career.timeline.map((item, index) => {
                const hasDeepDive = deepDiveTitles[item.company === 'Thomas Inventory' ? 'thomas' : item.company === 'Propel Bikes' ? 'propel' : item.company === 'Zuar Inc' ? 'zuar' : '']
                return (
                  <div key={index} className="flex flex-col items-center" style={{ width: `${100 / career.timeline.length}%` }}>
                    {hasDeepDive && (item.type === 'current' || item.type === 'promotion') && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="mb-2"
                      >
                        <span className="text-[9px] px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30 whitespace-nowrap font-medium">
                          {hasDeepDive}
                        </span>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="min-w-[800px] overflow-x-auto">
              <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-blue-500 rounded-full" />
              
              <div className="relative flex justify-between items-start">
                {career.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex flex-col items-center text-center"
                    style={{ width: `${100 / career.timeline.length}%` }}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 z-10 ${
                      item.type === 'current' || item.type === 'now'
                        ? 'bg-blue-400 border-blue-400 ring-4 ring-blue-400/30'
                        : item.company === 'Zuar Inc'
                        ? 'bg-blue-500 border-blue-400'
                        : item.company === 'Propel Bikes'
                        ? 'bg-emerald-500 border-emerald-400'
                        : item.company === 'Thomas Inventory'
                        ? 'bg-orange-500 border-orange-400'
                        : 'bg-slate-500 border-slate-400'
                    }`} />
                    <div className="mt-3 px-1">
                      <p className="text-xs font-bold text-white">{item.year}</p>
                      <p className="text-[10px] text-gray-500 hidden md:block">{item.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-xs text-gray-400">Early Career</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-gray-400">Thomas (7.5 yrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400">Propel (2.5 yrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 ring-2 ring-blue-400/30" />
              <span className="text-xs text-gray-400">Zuar (Current)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">🚀</span>
              <span className="text-xs text-gray-400">Deep Dive Available</span>
            </div>
          </div>
        </motion.div>

        {/* Career Entries - Unified Layout */}
        <div className="space-y-6">
          {career.entries.map((entry, index) => {
            const IconComponent = getIcon(entry.icon)
            const isExpanded = expandedRole === entry.id
            const hasDeepDive = !!entry.deepDive

            return (
              <motion.div
                key={entry.id}
                id={`career-${entry.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                {entry.isCurrent && (
                  <div className="absolute -top-3 left-4 z-10">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Current Role</span>
                  </div>
                )}
                
                <div className={`bg-slate-800/60 rounded-2xl border ${entry.borderColor} hover:border-opacity-70 transition-all duration-300 overflow-hidden`}>
                  {/* Role Header - Always Visible */}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Company Icon/Image */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center overflow-hidden shrink-0`}>
                        {entry.image ? (
                          <Image src={entry.image} alt={entry.company} width={56} height={56} className="w-full h-full object-cover" />
                        ) : (
                          <IconComponent className="w-7 h-7 text-white" />
                        )}
                      </div>
                      
                      {/* Role Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-gray-400 text-xs mb-0.5">{entry.industry}</p>
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                              {entry.company}
                              {entry.roleItemId && <RelevancePopup itemId={entry.roleItemId} />}
                            </h4>
                            <p className="text-blue-400 font-medium">{entry.role}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{entry.period}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{entry.location}</span>
                            </div>
                          </div>
                          
                          {/* Metrics - Desktop */}
                          <div className="hidden lg:grid grid-cols-2 gap-2">
                            {entry.metrics.filter(m => m.text).slice(0, 4).map((metric, mIndex) => (
                              <div key={mIndex} className="bg-slate-900/50 rounded-lg px-3 py-2 text-center border border-gray-700/30 min-w-[100px]">
                                <p className="text-sm font-semibold text-white">{metric.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <ul className="mt-4 space-y-2">
                          {entry.highlights.slice(0, hasDeepDive && !isExpanded ? 3 : undefined).map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2 text-sm">
                              <span className="text-cyan-400 mt-0.5">•</span>
                              <span className="text-gray-300 flex-1">
                                {highlight.text}
                                {highlight.itemId && <RelevancePopup itemId={highlight.itemId} />}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Metrics - Mobile */}
                        <div className="lg:hidden grid grid-cols-2 gap-2 mt-4">
                          {entry.metrics.filter(m => m.text).slice(0, 4).map((metric, mIndex) => (
                            <div key={mIndex} className="bg-slate-900/50 rounded-lg p-2 text-center border border-gray-700/30">
                              <p className="text-xs font-semibold text-white">{metric.text}</p>
                            </div>
                          ))}
                        </div>

                        {/* Deep Dive Toggle */}
                        {hasDeepDive && (
                          <button
                            onClick={() => setExpandedRole(isExpanded ? null : entry.id)}
                            className="mt-4 flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors group"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>{isExpanded ? 'Hide' : 'Show'} Deep Dive: {entry.deepDive?.title}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive Content - Expandable */}
                  <AnimatePresence>
                    {isExpanded && entry.deepDive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 border-t border-gray-700/30">
                          {/* Deep Dive Header */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full border border-orange-500/30">
                              🔍 Deep Dive
                            </span>
                            <span className="text-gray-500 text-sm">{entry.deepDive.subtitle}</span>
                          </div>
                          
                          <div className="grid lg:grid-cols-2 gap-6">
                            {/* Left Column - Challenge & Solution */}
                            <div className="space-y-4">
                              {/* The Situation */}
                              <div>
                                <h5 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                  The Situation
                                </h5>
                                <p className="text-gray-400 text-sm leading-relaxed">{entry.deepDive.challenge}</p>
                              </div>

                              {/* What I Did */}
                              <div>
                                <h5 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                  What I Did
                                </h5>
                                <p className="text-gray-400 text-sm leading-relaxed">{entry.deepDive.solution}</p>
                              </div>

                              {/* Results */}
                              <div>
                                <h5 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                  Results
                                </h5>
                                <div className="space-y-1">
                                  {entry.deepDive.outcomes.map((outcome, oIndex) => (
                                    <div key={oIndex} className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                      <span className="text-gray-300 text-sm flex-1">
                                        {outcome.text}
                                        {outcome.itemId && <RelevancePopup itemId={outcome.itemId} />}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Technical Details */}
                            <div>
                              <h5 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                Technical Details
                              </h5>
                              <div className="space-y-3">
                                {entry.deepDive.technical.map((tech, tIndex) => {
                                  const TechIcon = getIcon(tech.icon)
                                  return (
                                    <div key={tIndex} className="bg-slate-900/50 rounded-lg p-3 border border-gray-700/30">
                                      <div className="flex items-center gap-2 mb-1">
                                        <TechIcon className="w-4 h-4 text-blue-400" />
                                        <h6 className="font-semibold text-white text-sm">{tech.area}</h6>
                                        {tech.itemId && <RelevancePopup itemId={tech.itemId} />}
                                      </div>
                                      <p className="text-gray-400 text-xs leading-relaxed">{tech.details}</p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-slate-800/60 rounded-xl border border-blue-500/20">
            <div className="text-left">
              <p className="text-white font-medium">Want the full details?</p>
              <p className="text-gray-400 text-sm">Download my dynamically generated resume</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ResumeDownloadButton />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
