'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Brain, Bot, MessageSquare, Sparkles, Workflow, Zap,
  GitBranch, Code2, Database, Layers, ArrowRight, Clock, Rocket, Target
} from 'lucide-react'
import RelevancePopup from '@/components/relevance-popup'

const aiCapabilities = [
  {
    icon: Bot,
    title: 'Local LLM Experiments',
    description: 'Playing with local language models to understand what\'s possible. Data privacy matters for enterprise use cases, and running things locally gives you more control.',
    color: 'from-violet-500 to-purple-500',
    itemId: 'skill-llm'
  },
  {
    icon: MessageSquare,
    title: 'Chatbot Development',
    description: 'Building chatbots that actually connect to business systems using MCP (Model Context Protocol). Not just chat interfaces, but agents that can pull data and take actions.',
    color: 'from-blue-500 to-cyan-500',
    itemId: 'skill-chatbots'
  },
  {
    icon: Sparkles,
    title: 'Prompt Engineering',
    description: 'Learning what makes prompts work well. It\'s part art, part science. Good prompts can be the difference between useless output and genuinely helpful AI assistance.',
    color: 'from-emerald-500 to-teal-500',
    itemId: 'skill-prompts'
  },
  {
    icon: Workflow,
    title: 'AI in Workflows',
    description: 'Finding places where AI can actually help in day-to-day work. Not everything needs AI, but some tasks—like drafting, summarizing, coding boilerplate—really benefit.',
    color: 'from-orange-500 to-amber-500',
    itemId: 'skill-vibe'
  },
]

const productivityGains = [
  {
    icon: Rocket,
    title: 'Faster Delivery',
    description: 'Projects that used to take weeks can happen in days. Not because I\'m cutting corners, but because AI handles the tedious parts.'
  },
  {
    icon: Target,
    title: 'Broader Capabilities',
    description: 'I can now take on front-end work, write Python scripts, and build things I would have delegated before. AI fills in the gaps.'
  },
  {
    icon: Code2,
    title: 'Vibe Coding',
    description: 'Describe what you want, iterate quickly, ship something. It\'s a different way of working that feels more like collaboration than solo development.'
  },
  {
    icon: Clock,
    title: 'Less Grunt Work',
    description: 'Boilerplate, documentation, refactoring—AI handles the stuff that used to eat up time. I focus on the actual problem.'
  }
]

export default function AISection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="ai" className="py-24 md:py-32 section-accent relative">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 text-sm font-medium">AI-Augmented Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI & <span className="gradient-text">Automation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            AI tools have genuinely changed how I work. Not replacing what I do, 
            but letting me do more of it, faster, across a wider range of challenges.
          </p>
        </motion.div>

        {/* Productivity Multiplier Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              The <span className="text-violet-400">AI Multiplier</span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              13 years of domain knowledge combined with modern AI assistance. 
              I know what to build and why—AI helps me build it faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productivityGains.map((gain, i) => {
              const Icon = gain.icon
              return (
                <motion.div
                  key={gain.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{gain.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{gain.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* AI Capabilities */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {aiCapabilities?.map?.((cap, i) => {
            const Icon = cap?.icon
            return (
              <motion.div
                key={cap?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + 0.1 * i, duration: 0.6 }}
                className="bg-slate-800/40 rounded-xl p-6 border border-blue-500/10 card-hover relative"
              >
                {cap?.itemId && (
                  <div className="absolute top-3 right-3">
                    <RelevancePopup itemId={cap.itemId} />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cap?.color ?? 'from-blue-500 to-cyan-500'} flex items-center justify-center flex-shrink-0`}>
                    {Icon && <Icon size={24} className="text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{cap?.title ?? ''}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{cap?.description ?? ''}</p>
                  </div>
                </div>
              </motion.div>
            )
          }) ?? []}
        </div>

        {/* AI-assisted note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            This portfolio was built with AI assistance—a demonstration of the workflow
            <Sparkles size={14} className="text-cyan-400" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}
