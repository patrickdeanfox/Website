'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Download, ExternalLink, Building2, Calendar, MapPin, ArrowRight } from 'lucide-react'
import RelevancePopup from '@/components/relevance-popup'
import { useContent } from '@/lib/content-context'
import Image from 'next/image'

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

const skillColors: Record<string, string> = {
  "BI Platforms": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "ETL": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "SQL": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Data Modeling": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Python": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "JavaScript": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Front-End": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Data Engineering": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Operations": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "Leadership": "bg-rose-500/20 text-rose-400 border-rose-500/30"
}

export default function Resume() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { resume } = useContent()

  const scrollToSection = (sectionId: string | null) => {
    if (!sectionId) return
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="resume" className="py-20 px-4 section-violet relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Professional Resume</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Career <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            {resume.summary}
          </p>
          <p className="text-sm text-gray-500">
            Click on skills to see related work
          </p>
        </motion.div>

        {/* Career Timeline - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 overflow-x-auto"
        >
          <h3 className="text-lg font-semibold text-gray-300 mb-6 text-center">{resume.timelineTitle}</h3>
          <div className="relative min-w-[800px]">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-blue-500 rounded-full" />
            
            {/* Timeline points */}
            <div className="relative flex justify-between items-start">
              {resume.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex flex-col items-center text-center"
                  style={{ width: `${100 / resume.timeline.length}%` }}
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
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {resume.experience.map((job, index) => (
            <motion.div
              key={job.company}
              id={`resume-${job.id}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              {/* Current role indicator */}
              {index === 0 && (
                <div className="absolute -top-3 left-6 z-10">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Current Role
                  </span>
                </div>
              )}
              
              <div className={`bg-slate-800/60 rounded-2xl p-6 border ${job.borderColor} hover:border-opacity-70 transition-all duration-300`}>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center overflow-hidden`}>
                        {job.image ? (
                          <Image src={job.image} alt={job.company} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {job.company}
                          {job.roleItemId && <RelevancePopup itemId={job.roleItemId} />}
                        </h3>
                        <p className="text-blue-400 font-medium">{job.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-300 font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights with Skill Links */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">What I Did</h4>
                  <ul className="space-y-3">
                    {job.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex flex-wrap items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span className="text-gray-300 flex-1 flex items-center gap-2">
                          {highlight.text}
                          {highlight.itemId && <RelevancePopup itemId={highlight.itemId} />}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {highlight.skills.map((skill) => (
                            <button
                              key={skill}
                              onClick={() => scrollToSection(highlight.linkTo)}
                              className={`px-2 py-0.5 text-xs rounded-full border transition-all duration-200 ${skillColors[skill] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'} ${highlight.linkTo ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                            >
                              {skill}
                              {highlight.linkTo && <ExternalLink className="w-2.5 h-2.5 inline ml-1" />}
                            </button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {job.metrics.filter(m => m.text).map((metric, mIndex) => (
                    <div key={mIndex} className="bg-slate-900/50 rounded-lg p-3 text-center border border-gray-700/30 relative">
                      {metric.itemId && (
                        <div className="absolute top-1 right-1">
                          <RelevancePopup itemId={metric.itemId} />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-white">{metric.text}</p>
                    </div>
                  ))}
                </div>
                
                {/* Link to detailed case study for main roles */}
                {['propel', 'thomas'].includes(job.id) && (
                  <button
                    onClick={() => scrollToSection(`experience-${job.id}`)}
                    className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>See detailed case study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
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
