'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Send, Bot, User, Loader2, Copy, Check,
  Sparkles, Save
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  extractedData?: {
    type: 'experience' | 'skill' | 'project_detail' | 'outcome'
    data: any
  }[]
}

export default function AdminChatPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi Patrick! I'm your portfolio content assistant. I can help you:

• **Discuss projects** to uncover additional details worth highlighting
• **Extract key information** that can be added to your experience section
• **Refine descriptions** for better impact
• **Generate content** for specific sections

What would you like to explore? You can tell me about a project you're working on, or ask me to help improve a specific section of your portfolio.`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin')
    } else {
      setIsAuth(true)
    }
  }, [router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
      const response = await fetch('/api/admin-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages
        })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        extractedData: data.extractedData
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: `Chat cleared. What would you like to explore next?`
    }])
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <AdminNav />
      
      {/* Page Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-400" />
              Portfolio Content Assistant
            </h1>
            <p className="text-slate-400 text-sm">Discuss projects and extract valuable content</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start gap-3">
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-amber-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-200'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    
                    {/* Extracted Data */}
                    {msg.extractedData && msg.extractedData.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Extracted Content</p>
                        {msg.extractedData.map((item, idx) => (
                          <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                                {item.type}
                              </span>
                              <button
                                onClick={() => copyToClipboard(JSON.stringify(item.data, null, 2), `${msg.id}-${idx}`)}
                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                              >
                                {copiedId === `${msg.id}-${idx}` ? (
                                  <Check size={14} className="text-green-400" />
                                ) : (
                                  <Copy size={14} className="text-slate-400" />
                                )}
                              </button>
                            </div>
                            <pre className="text-xs text-slate-300 overflow-x-auto">
                              {JSON.stringify(item.data, null, 2)}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-blue-400" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Bot size={16} className="text-amber-400" />
                </div>
                <div className="bg-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me about a project, or ask for help with content..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              rows={2}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors self-end"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Tip: Describe project challenges, outcomes, and technical details. I'll help extract and format them for your portfolio.
          </p>
        </form>
      </div>
    </div>
  )
}
