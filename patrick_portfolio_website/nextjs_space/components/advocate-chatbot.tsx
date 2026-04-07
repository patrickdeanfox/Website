'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, X, Send, Bot, User, Info, Sparkles,
  Building2, Loader2, ChevronDown, Code2, Database, Brain,
  Cpu, Workflow, Zap
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  companyContext?: {
    name: string
    industry: string
    summary: string
  }
}

// Generate a unique session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export default function AdvocateChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [sessionId] = useState(() => generateSessionId())
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Patrick's AI Career Advocate. Tell me what company you're from, and I'll show you why Patrick would be a great fit for your team. What organization are you with?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [companyKnown, setCompanyKnown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/advocate-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
          companyKnown,
          sessionId
        })
      })

      const data = await response.json()

      if (data.companyContext) {
        setCompanyKnown(true)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        companyContext: data.companyContext
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Career Advocate</h3>
                  <p className="text-white/70 text-xs">AI-powered hiring assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInfo(true)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Technical Details"
                >
                  <Info size={16} className="text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.companyContext && (
                      <div className="mb-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs">
                        <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                          <Building2 size={14} />
                          {msg.companyContext.name}
                        </div>
                        <p className="text-slate-400">{msg.companyContext.summary}</p>
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-200'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Patrick's experience..."
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none text-sm"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl border border-slate-700/50 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Technical Implementation</h3>
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                  >
                    <X size={16} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Architecture */}
                  <div>
                    <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-3">Architecture</h4>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-start gap-3 mb-3">
                        <Brain className="w-5 h-5 text-cyan-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">LLM-Powered Conversational Agent</p>
                          <p className="text-slate-400 text-sm">Uses GPT-4.1-mini via Abacus.AI RouteLLM API for intelligent, context-aware responses.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mb-3">
                        <Database className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Dynamic Company Research</p>
                          <p className="text-slate-400 text-sm">Real-time web search integration to gather company context, then injects this into the LLM prompt.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Workflow className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Portfolio Knowledge Base</p>
                          <p className="text-slate-400 text-sm">Complete portfolio data (projects, skills, experience) embedded in system prompt for accurate advocacy.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-3">Tech Stack</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Cpu, label: 'Next.js 14', desc: 'App Router API Routes' },
                        { icon: Brain, label: 'GPT-4.1-mini', desc: 'Via RouteLLM API' },
                        { icon: Zap, label: 'Streaming', desc: 'Real-time responses' },
                        { icon: Sparkles, label: 'Framer Motion', desc: 'Smooth animations' }
                      ].map((item, i) => (
                        <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <div className="flex items-center gap-2 mb-1">
                            <item.icon className="w-4 h-4 text-violet-400" />
                            <span className="text-white text-sm font-medium">{item.label}</span>
                          </div>
                          <p className="text-slate-500 text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-3">Purpose</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      This chatbot demonstrates practical AI integration skills—combining LLMs, web APIs, 
                      and domain knowledge to create a useful tool. It's both a portfolio showcase and 
                      a functional hiring assistant that can articulate Patrick's value proposition 
                      tailored to your company's specific needs.
                    </p>
                  </div>

                  {/* Built By */}
                  <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
                    <p className="text-center text-sm text-slate-300">
                      <span className="text-violet-400 font-medium">Built by Patrick Fox</span> using AI-assisted development ("Vibe Coding")
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
