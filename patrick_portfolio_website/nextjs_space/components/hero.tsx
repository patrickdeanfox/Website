'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Database, BarChart3, Brain, Code2, Linkedin } from 'lucide-react'
import CountUp from '@/components/count-up'
import RelevancePopup from '@/components/relevance-popup'
import { useContent } from '@/lib/content-context'

const floatingIcons = [
  { Icon: Database, x: '10%', y: '20%', delay: 0 },
  { Icon: BarChart3, x: '85%', y: '30%', delay: 0.5 },
  { Icon: Brain, x: '15%', y: '70%', delay: 1 },
  { Icon: Code2, x: '80%', y: '75%', delay: 1.5 },
]

export default function Hero() {
  const { hero } = useContent()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
      
      {/* Floating icons */}
      {floatingIcons?.map?.((item, i) => {
        const Icon = item?.Icon
        return (
          <motion.div
            key={i}
            className="absolute text-blue-500/20 hidden md:block"
            style={{ left: item?.x ?? '0%', top: item?.y ?? '0%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item?.delay ?? 0, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: item?.delay ?? 0 }}
            >
              {Icon && <Icon size={48} />}
            </motion.div>
          </motion.div>
        )
      }) ?? []}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-400 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
            {hero.tagline}
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">{hero.name}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            {hero.title}
          </p>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-6">
            {hero.subtitle}
          </p>

          {/* Jack of All Trades Philosophy */}
          <div className="bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-blue-500/10 border border-blue-500/20 rounded-xl px-6 py-4 max-w-2xl mx-auto mb-8">
            <p className="text-slate-300 italic text-sm md:text-base">
              &ldquo;{hero.philosophyQuote}&rdquo;
            </p>
            <p className="text-blue-400 text-xs mt-2">
              — {hero.philosophyAttribution}
            </p>
          </div>

          <p className="text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View Projects
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/patrick-dean-fox/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2"
            >
              <Linkedin size={18} />
              Connect
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {hero.stats?.map?.((stat, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-blue-500/20 relative"
            >
              <div className="absolute top-2 right-2">
                <RelevancePopup itemId={stat.itemId} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={stat?.value ?? 0} suffix={stat?.suffix ?? ''} />
              </div>
              <p className="text-slate-400 text-sm">{stat?.label ?? ''}</p>
            </div>
          )) ?? []}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-blue-400/50" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
