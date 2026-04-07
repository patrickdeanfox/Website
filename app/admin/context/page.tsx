'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database, Plus, Trash2, Save, Loader2, CheckCircle, AlertCircle,
  Link as LinkIcon, FileText, Briefcase, ChevronDown, ChevronUp,
  Sparkles, Copy, Check
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface ContextEntry {
  id: string
  projectId: string
  projectName: string
  type: 'url' | 'note' | 'detail'
  content: string
  createdAt: string
}

const projectOptions = [
  { id: 'pe-demo', name: 'PE Demo Portal (LLM Pioneer)' },
  { id: 'wrights-media', name: 'Wrights Media Publisher Portal' },
  { id: 'compass-ignite', name: 'Compass/Ignite Portal' },
  { id: 'acadia', name: 'Acadia.io Portal' },
  { id: 'positive-insights', name: 'Positive Insights Portal' },
  { id: 'flik-lenz', name: 'FLIK/Lenz Portal' },
  { id: 'intradiem', name: 'Enterprise Contact Center' },
  { id: 'boulder', name: 'Boulder Associates Portal' },
  { id: 'dukes', name: 'Dukes Root Control' },
  { id: 'zuar-general', name: 'Zuar Inc (General)' },
  { id: 'propel', name: 'Propel Electric Bikes' },
  { id: 'thomas', name: 'Thomas Inventory' },
  { id: 'general', name: 'General Context' }
]

export default function ContextAdmin() {
  const [isAuth, setIsAuth] = useState(false)
  const [entries, setEntries] = useState<ContextEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // New entry form
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    projectId: 'general',
    type: 'note' as 'url' | 'note' | 'detail',
    content: ''
  })
  
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin')
    } else {
      setIsAuth(true)
      fetchContext()
    }
  }, [router])

  const fetchContext = async () => {
    try {
      const response = await fetch('/api/admin/context')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Failed to fetch context:', error)
    } finally {
      setLoading(false)
    }
  }

  const addEntry = async () => {
    if (!newEntry.content.trim()) return
    
    setSaving(true)
    try {
      const projectName = projectOptions.find(p => p.id === newEntry.projectId)?.name || 'General'
      const response = await fetch('/api/admin/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: newEntry.projectId,
          projectName,
          type: newEntry.type,
          content: newEntry.content
        })
      })

      if (response.ok) {
        const entry = await response.json()
        setEntries(prev => [entry, ...prev])
        setNewEntry({ projectId: 'general', type: 'note', content: '' })
        setShowForm(false)
        setMessage({ type: 'success', text: 'Context added!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to add' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch('/api/admin/context', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        setEntries(prev => prev.filter(e => e.id !== id))
        setMessage({ type: 'success', text: 'Removed!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove' })
    }
    setTimeout(() => setMessage(null), 3000)
  }

  const copyContent = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Group entries by project
  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.projectId]) {
      acc[entry.projectId] = { name: entry.projectName, entries: [] }
    }
    acc[entry.projectId].entries.push(entry)
    return acc
  }, {} as Record<string, { name: string; entries: ContextEntry[] }>)

  if (!isAuth || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNav />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Database className="w-6 h-6 text-amber-400" />
              AI Context Database
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Store URLs, notes, and details that the AI Career Advocate can reference
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Context
          </button>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}
            >
              {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-slate-800/50 rounded-xl border border-amber-500/30 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Add New Context
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project</label>
                    <select
                      value={newEntry.projectId}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, projectId: e.target.value }))}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {projectOptions.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                    <select
                      value={newEntry.type}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value as 'url' | 'note' | 'detail' }))}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="note">Note / Bullet Points</option>
                      <option value="url">URL Reference</option>
                      <option value="detail">Technical Detail</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Enter context information, URLs, bullet points, or technical details..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={addEntry}
                    disabled={saving || !newEntry.content.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Save Context
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Context List */}
        {Object.keys(groupedEntries).length === 0 ? (
          <div className="text-center py-16">
            <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No context entries yet. Add some to help the AI Career Advocate.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedEntries).map(([projectId, { name, entries: projectEntries }]) => {
              const isExpanded = expanded === projectId
              return (
                <div key={projectId} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div
                    onClick={() => setExpanded(isExpanded ? null : projectId)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{name}</h3>
                        <p className="text-slate-500 text-sm">{projectEntries.length} context {projectEntries.length === 1 ? 'entry' : 'entries'}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                      {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-3">
                          {projectEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {entry.type === 'url' && <LinkIcon size={14} className="text-blue-400" />}
                                    {entry.type === 'note' && <FileText size={14} className="text-emerald-400" />}
                                    {entry.type === 'detail' && <Sparkles size={14} className="text-violet-400" />}
                                    <span className="text-xs text-slate-500 uppercase">{entry.type}</span>
                                    <span className="text-xs text-slate-600">
                                      {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{entry.content}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => copyContent(entry.content, entry.id)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                  >
                                    {copiedId === entry.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                  </button>
                                  <button
                                    onClick={() => deleteEntry(entry.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-300">How it works:</strong> Context entries are used by the AI Career Advocate
            chatbot to provide accurate information about your projects. Add URLs, bullet points, technical details, or
            anything else you want the AI to know about when answering questions.
          </p>
        </div>
      </div>
    </div>
  )
}
