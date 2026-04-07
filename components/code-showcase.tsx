'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Code2, Terminal, Database, FileCode, Copy, Check,
  ChevronLeft, ChevronRight, Sparkles, Braces, FileJson
} from 'lucide-react'

interface CodeShowcaseItem {
  id: string
  title: string
  description: string
  language: string
  code: string
  fileName?: string
  category: string
}

const languageConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  html: { icon: FileCode, label: 'HTML', color: 'from-orange-500 to-red-500' },
  sql: { icon: Database, label: 'SQL', color: 'from-blue-500 to-cyan-500' },
  python: { icon: Terminal, label: 'Python', color: 'from-yellow-500 to-green-500' },
  javascript: { icon: Braces, label: 'JavaScript', color: 'from-yellow-400 to-amber-500' },
  json: { icon: FileJson, label: 'JSON', color: 'from-slate-500 to-slate-600' },
}

function SyntaxHighlight({ code, language }: { code: string; language: string }) {
  // Simple syntax highlighting for common patterns
  const highlightCode = (text: string, lang: string) => {
    let highlighted = text
      // Escape HTML first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    if (lang === 'html') {
      // HTML tags
      highlighted = highlighted
        .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="text-pink-400">$2</span>')
        .replace(/(\s)([\w-]+)(=)/g, '$1<span class="text-cyan-400">$2</span>$3')
        .replace(/(=")([^"]*)(")/g, '$1<span class="text-amber-300">$2</span>$3')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span class="text-slate-500 italic">$1</span>')
    } else if (lang === 'sql') {
      // SQL keywords
      const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 
        'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 
        'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP',
        'ALTER', 'INDEX', 'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'DISTINCT', 'LIMIT',
        'OFFSET', 'UNION', 'ALL', 'EXISTS', 'BETWEEN', 'LIKE', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN',
        'COALESCE', 'CAST', 'OVER', 'PARTITION', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'WITH']
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'gi')
        highlighted = highlighted.replace(regex, '<span class="text-blue-400 font-semibold">$1</span>')
      })
      // Strings
      highlighted = highlighted.replace(/('.*?')/g, '<span class="text-amber-300">$1</span>')
      // Comments
      highlighted = highlighted.replace(/(--.*$)/gm, '<span class="text-slate-500 italic">$1</span>')
    } else if (lang === 'python') {
      // Python keywords
      const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 
        'while', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'yield', 'raise', 'pass',
        'break', 'continue', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'async', 'await']
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g')
        highlighted = highlighted.replace(regex, '<span class="text-purple-400 font-semibold">$1</span>')
      })
      // Function definitions
      highlighted = highlighted.replace(/\b(def\s+)(\w+)/g, '$1<span class="text-cyan-400">$2</span>')
      // Strings (triple quotes and single/double)
      highlighted = highlighted.replace(/(&quot;&quot;&quot;[\s\S]*?&quot;&quot;&quot;|'''[\s\S]*?''')/g, '<span class="text-emerald-400">$1</span>')
      highlighted = highlighted.replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="text-amber-300">$1</span>')
      // Comments
      highlighted = highlighted.replace(/(#.*$)/gm, '<span class="text-slate-500 italic">$1</span>')
      // Decorators
      highlighted = highlighted.replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>')
    } else if (lang === 'javascript') {
      // JS keywords
      const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
        'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch',
        'throw', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof']
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g')
        highlighted = highlighted.replace(regex, '<span class="text-purple-400 font-semibold">$1</span>')
      })
      // Strings
      highlighted = highlighted.replace(/(`[^`]*`|"[^"\n]*"|'[^'\n]*')/g, '<span class="text-amber-300">$1</span>')
      // Comments
      highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-slate-500 italic">$1</span>')
    }

    return highlighted
  }

  return (
    <pre className="text-sm leading-relaxed overflow-x-auto">
      <code 
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        className="text-slate-300"
      />
    </pre>
  )
}

export default function CodeShowcase() {
  const [showcases, setShowcases] = useState<CodeShowcaseItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        const res = await fetch('/api/admin/code-showcase/visible')
        if (res.ok) {
          const data = await res.json()
          setShowcases(data)
        }
      } catch (error) {
        console.error('Error fetching code showcases:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchShowcases()
  }, [])

  const handleCopy = async () => {
    if (!showcases[activeIndex]) return
    await navigator.clipboard.writeText(showcases[activeIndex].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextShowcase = () => {
    setActiveIndex((prev) => (prev + 1) % showcases.length)
  }

  const prevShowcase = () => {
    setActiveIndex((prev) => (prev - 1 + showcases.length) % showcases.length)
  }

  // Don't render section if no showcases
  if (!isLoading && showcases.length === 0) {
    return null
  }

  const activeShowcase = showcases[activeIndex]
  const config = activeShowcase ? languageConfig[activeShowcase.language] || languageConfig.javascript : null

  return (
    <section id="code" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Sample Code</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Showcase</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real scripts and configurations demonstrating automation, data processing, and infrastructure expertise
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <Code2 className="w-12 h-12 text-cyan-400/50" />
              <p className="text-slate-500">Loading code samples...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Code Tabs / Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Code Samples</h3>
                <div className="space-y-2">
                  {showcases.map((showcase, index) => {
                    const langConfig = languageConfig[showcase.language] || languageConfig.javascript
                    const Icon = langConfig.icon
                    return (
                      <button
                        key={showcase.id}
                        onClick={() => setActiveIndex(index)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 ${
                          index === activeIndex
                            ? 'bg-gradient-to-r ' + langConfig.color + ' text-white shadow-lg'
                            : 'hover:bg-slate-700/50 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === activeIndex ? 'text-white' : ''}`} />
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{showcase.title}</p>
                          <p className={`text-xs mt-0.5 ${index === activeIndex ? 'text-white/70' : 'text-slate-500'}`}>
                            {langConfig.label}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeShowcase && config && (
                  <motion.div
                    key={activeShowcase.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
                  >
                    {/* Code Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                          <config.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{activeShowcase.title}</h3>
                          <p className="text-sm text-slate-400">
                            {activeShowcase.fileName || `${activeShowcase.language} code`} · {config.label}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Navigation */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={prevShowcase}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                            aria-label="Previous"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <span className="text-sm text-slate-500 min-w-[60px] text-center">
                            {activeIndex + 1} / {showcases.length}
                          </span>
                          <button
                            onClick={nextShowcase}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                            aria-label="Next"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        {/* Copy button */}
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-300 hover:text-white"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 py-4 bg-slate-800/20 border-b border-slate-700/30">
                      <p className="text-slate-400 text-sm">{activeShowcase.description}</p>
                    </div>

                    {/* Code Block */}
                    <div className="p-6 max-h-[500px] overflow-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                      <SyntaxHighlight code={activeShowcase.code} language={activeShowcase.language} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </section>
  )
}
