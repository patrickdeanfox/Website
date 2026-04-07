'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, User, Bot, Clock, Globe, Monitor, Building2,
  ChevronRight, RefreshCw, Trash2, X, AlertCircle, ExternalLink
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface ChatSession {
  sessionId: string
  startedAt: string
  lastMessageAt: string
  messageCount: number
  userAgent: string | null
  ipAddress: string | null
  referrer: string | null
  companyDetected: string | null
}

interface ChatMessage {
  id: string
  role: string
  content: string
  createdAt: string
}

function parseUserAgent(ua: string | null): { browser: string; os: string; device: string } {
  if (!ua) return { browser: 'Unknown', os: 'Unknown', device: 'Unknown' }
  
  let browser = 'Unknown'
  let os = 'Unknown'
  let device = 'Desktop'
  
  // Browser detection
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  
  // OS detection
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) { os = 'Android'; device = 'Mobile' }
  else if (ua.includes('iPhone') || ua.includes('iPad')) { os = 'iOS'; device = ua.includes('iPad') ? 'Tablet' : 'Mobile' }
  
  return { browser, os, device }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export default function ChatLogsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      fetchSessions()
    }
  }, [router])

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/chat-logs')
      const data = await response.json()
      setSessions(data.sessions || [])
    } catch (err) {
      setError('Failed to load chat logs')
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (sessionId: string) => {
    setLoadingMessages(true)
    try {
      const response = await fetch(`/api/admin/chat-logs?sessionId=${sessionId}`)
      const data = await response.json()
      setMessages(data.messages || [])
      setSelectedSession(sessionId)
    } catch (err) {
      setError('Failed to load messages')
    } finally {
      setLoadingMessages(false)
    }
  }

  const deleteSession = async (sessionId: string) => {
    if (!confirm('Delete this conversation? This cannot be undone.')) return
    
    try {
      await fetch('/api/admin/chat-logs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      setSessions(prev => prev.filter(s => s.sessionId !== sessionId))
      if (selectedSession === sessionId) {
        setSelectedSession(null)
        setMessages([])
      }
    } catch (err) {
      setError('Failed to delete session')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <AdminNav />

      <div className="pt-20 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Chat Logs</h1>
              <p className="text-slate-400">View Career Advocate conversations</p>
            </div>
            <button
              onClick={fetchSessions}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-300">
              <AlertCircle className="w-5 h-5" />
              {error}
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sessions List */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Conversations ({sessions.length})
                </h2>
              </div>

              <div className="divide-y divide-slate-800 max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading...
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No conversations yet
                  </div>
                ) : (
                  sessions.map((session) => {
                    const ua = parseUserAgent(session.userAgent)
                    return (
                      <div
                        key={session.sessionId}
                        className={`p-4 cursor-pointer transition-colors group ${
                          selectedSession === session.sessionId
                            ? 'bg-blue-500/20'
                            : 'hover:bg-slate-800/50'
                        }`}
                        onClick={() => fetchMessages(session.sessionId)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {session.companyDetected && (
                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {session.companyDetected}
                                </span>
                              )}
                              <span className="text-xs text-slate-500">
                                {timeAgo(session.lastMessageAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {session.messageCount} msgs
                              </span>
                              <span className="flex items-center gap-1">
                                <Monitor className="w-3 h-3" />
                                {ua.browser}/{ua.os}
                              </span>
                            </div>
                            {session.referrer && (
                              <div className="mt-1 text-xs text-slate-500 truncate flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" />
                                {new URL(session.referrer).hostname}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteSession(session.sessionId)
                              }}
                              className="p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Message View */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  {selectedSession ? 'Conversation' : 'Select a conversation'}
                </h2>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                  <div className="text-center text-slate-400 py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading messages...
                  </div>
                ) : !selectedSession ? (
                  <div className="text-center text-slate-400 py-8">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Click a conversation to view messages
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-slate-400 py-8">
                    No messages found
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-3 ${
                          msg.role === 'user' ? '' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' 
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-slate-400">
                              {msg.role === 'user' ? 'Visitor' : 'Career Advocate'}
                            </span>
                            <span className="text-xs text-slate-600">
                              {formatDate(msg.createdAt)}
                            </span>
                          </div>
                          <div className={`p-3 rounded-lg text-sm ${
                            msg.role === 'user'
                              ? 'bg-blue-500/10 text-slate-300 border border-blue-500/20'
                              : 'bg-slate-800/50 text-slate-300 border border-slate-700'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
