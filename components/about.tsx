'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Database, Code2, BarChart3, Brain, Palette, Server,
  Workflow, Layers, Terminal, LineChart, PieChart, GitBranch, Sparkles
} from 'lucide-react'
import RelevancePopup from '@/components/relevance-popup'

const skillCategories = [
  {
    title: 'Data Engineering',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Python (APIs, ETL)', itemId: 'skill-python' },
      { name: 'SQL (Transformations)', itemId: 'skill-sql' },
      { name: 'Zuar Runner', itemId: 'zuar-etl' },
      { name: 'BigQuery', itemId: 'propel-looker' },
      { name: 'Data Modeling', itemId: 'skill-datamodeling' }
    ]
  },
  {
    title: 'Front-End Development',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'JavaScript', itemId: 'skill-javascript' },
      { name: 'HTML/CSS', itemId: 'zuar-frontend' },
      { name: 'Angular', itemId: null },
      { name: 'React', itemId: 'skill-react' },
      { name: 'AI-Assisted Dev', itemId: 'skill-vibe' }
    ]
  },
  {
    title: 'BI Platforms',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'Data Experience Platform', itemId: 'zuar-bi' },
      { name: 'Tableau', itemId: 'zuar-bi' },
      { name: 'ThoughtSpot', itemId: 'project-boulder' },
      { name: 'Power BI', itemId: 'zuar-bi' },
      { name: 'Looker', itemId: 'propel-looker' }
    ]
  },
  {
    title: 'AI & Automation',
    icon: Brain,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'Local LLMs', itemId: 'skill-llm' },
      { name: 'Chatbots (MCP)', itemId: 'skill-chatbots' },
      { name: 'Prompt Engineering', itemId: 'skill-prompts' },
      { name: 'Vibe Coding', itemId: 'skill-vibe' },
      { name: 'Workflow AI', itemId: null }
    ]
  },
  {
    title: 'Design & UX',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Dashboard Design', itemId: 'zuar-pages' },
      { name: 'Data Visualization', itemId: 'zuar-bi' },
      { name: 'UX Research', itemId: null },
      { name: 'Responsive Design', itemId: 'zuar-frontend' },
      { name: 'Accessibility', itemId: null }
    ]
  },
  {
    title: 'Infrastructure',
    icon: Server,
    color: 'from-slate-500 to-slate-600',
    skills: [
      { name: 'SSO Implementation', itemId: 'zuar-sso' },
      { name: 'Role-Based Access', itemId: 'zuar-sso' },
      { name: 'API Integration', itemId: 'zuar-datasources' },
      { name: 'Cloud Deployment', itemId: 'project-dukes' },
      { name: 'Security', itemId: 'zuar-sso' }
    ]
  },
]

const achievements = [
  { text: '16+ client portals', itemId: 'zuar-portals', highlight: true },
  { text: '200+ portal pages', itemId: 'zuar-pages', highlight: true },
  { text: '24+ data sources', itemId: 'zuar-datasources', highlight: true },
  { text: 'Built analytics from scratch at multiple companies', itemId: 'thomas-bi', highlight: false }
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-24 md:py-32 section-teal relative">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Full-Stack <span className="gradient-text">Analytics</span> Expertise
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I work across the entire data stack—connecting sources, transforming data, 
            and building the dashboards that help teams make better decisions.
          </p>
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="text-blue-400" size={24} />
                How I Got Here
                <RelevancePopup itemId="zuar-role" />
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Right now I'm at <strong className="text-blue-400">Zuar Inc</strong> as an 
                Analytics Implementation Manager, where I help clients get their data into 
                actionable dashboards. I handle everything from data pipelines to portal design.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Before Zuar, I spent years in operations—COO at Thomas Inventory Services 
                and Propel Electric Bikes. Those roles gave me real business context that 
                shapes how I approach analytics today. I know what it's like to be the person 
                waiting on reports.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LineChart className="text-blue-400" size={24} />
                What I've Delivered
              </h3>
              <ul className="space-y-3 text-slate-300">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="flex-1">
                      {achievement.highlight ? (
                        <strong>{achievement.text}</strong>
                      ) : (
                        achievement.text
                      )}
                      {' launched at Zuar for enterprise clients'}
                    </span>
                    <RelevancePopup itemId={achievement.itemId} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories?.map?.((category, i) => {
            const Icon = category?.icon
            return (
              <motion.div
                key={category?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="bg-slate-800/40 rounded-xl p-6 border border-blue-500/10 card-hover"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category?.color ?? 'from-blue-500 to-cyan-500'} flex items-center justify-center mb-4`}>
                  {Icon && <Icon size={24} className="text-white" />}
                </div>
                <h3 className="text-lg font-semibold mb-3">{category?.title ?? ''}</h3>
                <div className="flex flex-wrap gap-2">
                  {category?.skills?.map?.((skill) => (
                    <span key={skill.name} className="skill-tag text-slate-300 inline-flex items-center gap-1">
                      {skill.name}
                      {skill.itemId && <RelevancePopup itemId={skill.itemId} />}
                    </span>
                  )) ?? []}
                </div>
              </motion.div>
            )
          }) ?? []}
        </div>
        
        {/* AI Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            I use AI tools to move faster and take on work I couldn't have done before
            <Sparkles size={14} className="text-cyan-400" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Briefcase(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 24, ...rest } = props ?? {}
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
