'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Code2, Plus, Save, Trash2, Eye, EyeOff, Upload, FileCode,
  Terminal, Database, CheckCircle2, AlertCircle, Loader2,
  GripVertical, Edit3, X, ChevronDown, ChevronUp, FileText, Braces
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface CodeShowcase {
  id: string
  title: string
  description: string
  language: string
  code: string
  fileName?: string
  category: string
  isVisible: boolean
  displayOrder: number
}

const languageOptions = [
  { value: 'html', label: 'HTML', icon: FileCode, color: 'text-orange-400' },
  { value: 'sql', label: 'SQL', icon: Database, color: 'text-blue-400' },
  { value: 'python', label: 'Python', icon: Terminal, color: 'text-yellow-400' },
  { value: 'javascript', label: 'JavaScript', icon: Braces, color: 'text-amber-400' },
]

const categoryOptions = [
  { value: 'automation', label: 'Automation' },
  { value: 'data', label: 'Data Processing' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'visualization', label: 'Visualization' },
  { value: 'api', label: 'API Integration' },
  { value: 'general', label: 'General' },
]

export default function CodeShowcaseAdmin() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showcases, setShowcases] = useState<CodeShowcase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [orderChanged, setOrderChanged] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // New showcase form state
  const [showNewForm, setShowNewForm] = useState(false)
  const [newShowcase, setNewShowcase] = useState({
    title: '',
    description: '',
    language: 'python',
    code: '',
    fileName: '',
    category: 'general'
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchShowcases()
    } else {
      router.push('/admin')
    }
  }, [router])

  const fetchShowcases = async () => {
    try {
      const res = await fetch('/api/admin/code-showcase')
      if (res.ok) {
        const data = await res.json()
        setShowcases(data)
      }
    } catch (error) {
      console.error('Error fetching showcases:', error)
      showMessage('error', 'Failed to load code showcases')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleCreate = async () => {
    if (!newShowcase.title || !newShowcase.code) {
      showMessage('error', 'Title and code are required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/code-showcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newShowcase,
          displayOrder: showcases.length
        })
      })

      if (res.ok) {
        const created = await res.json()
        setShowcases([...showcases, created])
        setNewShowcase({ title: '', description: '', language: 'python', code: '', fileName: '', category: 'general' })
        setShowNewForm(false)
        showMessage('success', 'Code showcase created!')
      } else {
        showMessage('error', 'Failed to create showcase')
      }
    } catch (error) {
      showMessage('error', 'Error creating showcase')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (showcase: CodeShowcase) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/code-showcase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showcase)
      })

      if (res.ok) {
        setShowcases(showcases.map(s => s.id === showcase.id ? showcase : s))
        setEditingId(null)
        showMessage('success', 'Showcase updated!')
      } else {
        showMessage('error', 'Failed to update showcase')
      }
    } catch (error) {
      showMessage('error', 'Error updating showcase')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this code showcase?')) return

    try {
      const res = await fetch(`/api/admin/code-showcase?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setShowcases(showcases.filter(s => s.id !== id))
        showMessage('success', 'Showcase deleted')
      } else {
        showMessage('error', 'Failed to delete showcase')
      }
    } catch (error) {
      showMessage('error', 'Error deleting showcase')
    }
  }

  const handleToggleVisibility = async (showcase: CodeShowcase) => {
    const updated = { ...showcase, isVisible: !showcase.isVisible }
    await handleUpdate(updated)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, forNew: boolean = true) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const ext = file.name.split('.').pop()?.toLowerCase()
      let language = 'javascript'
      if (ext === 'html' || ext === 'htm') language = 'html'
      else if (ext === 'sql') language = 'sql'
      else if (ext === 'py') language = 'python'
      else if (ext === 'js' || ext === 'ts' || ext === 'jsx' || ext === 'tsx') language = 'javascript'

      if (forNew) {
        setNewShowcase(prev => ({
          ...prev,
          code: content,
          fileName: file.name,
          language
        }))
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleReorder = (newOrder: CodeShowcase[]) => {
    setShowcases(newOrder)
    setOrderChanged(true)
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const items = showcases.map((s, index) => ({ id: s.id, displayOrder: index }))
      const res = await fetch('/api/admin/code-showcase/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })

      if (res.ok) {
        setOrderChanged(false)
        showMessage('success', 'Order saved!')
      } else {
        showMessage('error', 'Failed to save order')
      }
    } catch (error) {
      showMessage('error', 'Error saving order')
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
    </div>
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminNav />

      {/* Page Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Code Showcase</h1>
                <p className="text-slate-400 text-sm">Manage sample scripts and configurations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {orderChanged && (
                <button
                  onClick={saveOrder}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Order
                </button>
              )}
              <button
                onClick={() => setShowNewForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50"
          >
            <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
              message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            } text-white`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* New Showcase Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-cyan-400" />
                    Add New Code Showcase
                  </h2>
                  <button onClick={() => setShowNewForm(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                      <input
                        type="text"
                        value={newShowcase.title}
                        onChange={(e) => setNewShowcase({ ...newShowcase, title: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                        placeholder="e.g., ETL Pipeline Script"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                      <textarea
                        value={newShowcase.description}
                        onChange={(e) => setNewShowcase({ ...newShowcase, description: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                        placeholder="Brief description of what this code does..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                        <select
                          value={newShowcase.language}
                          onChange={(e) => setNewShowcase({ ...newShowcase, language: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
                        >
                          {languageOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <select
                          value={newShowcase.category}
                          onChange={(e) => setNewShowcase({ ...newShowcase, category: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
                        >
                          {categoryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">File Name (optional)</label>
                      <input
                        type="text"
                        value={newShowcase.fileName}
                        onChange={(e) => setNewShowcase({ ...newShowcase, fileName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                        placeholder="e.g., etl_pipeline.py"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileUpload(e, true)}
                        accept=".html,.htm,.sql,.py,.js,.ts,.jsx,.tsx"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Upload File
                      </button>
                      <span className="text-slate-500 text-sm">or paste code directly</span>
                    </div>
                  </div>

                  {/* Right: Code Editor */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Code *</label>
                    <div className="relative">
                      <textarea
                        value={newShowcase.code}
                        onChange={(e) => setNewShowcase({ ...newShowcase, code: e.target.value })}
                        rows={14}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-green-400 font-mono text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                        placeholder="Paste your code here..."
                        spellCheck={false}
                      />
                      <div className="absolute top-2 right-2 text-xs text-slate-500">
                        {newShowcase.code.split('\n').length} lines
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => setShowNewForm(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={saving || !newShowcase.title || !newShowcase.code}
                    className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Create Showcase
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Showcases List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : showcases.length === 0 ? (
          <div className="text-center py-16">
            <Code2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Code Showcases Yet</h3>
            <p className="text-slate-400 mb-6">Add your first code sample to get started</p>
            <button
              onClick={() => setShowNewForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add First Code
            </button>
          </div>
        ) : (
          <Reorder.Group axis="y" values={showcases} onReorder={handleReorder} className="space-y-4">
            {showcases.map((showcase) => {
              const langOption = languageOptions.find(l => l.value === showcase.language) || languageOptions[0]
              const LangIcon = langOption.icon
              const isExpanded = expandedId === showcase.id
              const isEditing = editingId === showcase.id

              return (
                <Reorder.Item
                  key={showcase.id}
                  value={showcase}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  {/* Item Header */}
                  <div className="flex items-center gap-4 p-4">
                    <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-white">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    <div className={`p-2 rounded-lg bg-slate-700/50 ${langOption.color}`}>
                      <LangIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{showcase.title}</h3>
                      <p className="text-sm text-slate-400 truncate">
                        {langOption.label} · {showcase.fileName || 'No filename'} · {showcase.code.split('\n').length} lines
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleVisibility(showcase)}
                        className={`p-2 rounded-lg transition-colors ${
                          showcase.isVisible
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-slate-700/50 text-slate-500 hover:text-white'
                        }`}
                        title={showcase.isVisible ? 'Visible' : 'Hidden'}
                      >
                        {showcase.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : showcase.id)}
                        className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDelete(showcase.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-700/50"
                      >
                        <div className="p-6 space-y-4">
                          {isEditing ? (
                            // Edit Mode
                            <EditShowcaseForm
                              showcase={showcase}
                              onSave={handleUpdate}
                              onCancel={() => setEditingId(null)}
                              saving={saving}
                            />
                          ) : (
                            // View Mode
                            <>
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-slate-300 mb-4">{showcase.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>Category: {categoryOptions.find(c => c.value === showcase.category)?.label || showcase.category}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setEditingId(showcase.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                  Edit
                                </button>
                              </div>

                              {/* Code Preview */}
                              <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-auto">
                                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                                  {showcase.code}
                                </pre>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        )}
      </div>
    </div>
  )
}

// Edit Form Component
function EditShowcaseForm({
  showcase,
  onSave,
  onCancel,
  saving
}: {
  showcase: CodeShowcase
  onSave: (showcase: CodeShowcase) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState(showcase)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setForm(prev => ({ ...prev, code: content, fileName: file.name }))
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
              >
                {languageOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
              >
                {categoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">File Name</label>
            <input
              type="text"
              value={form.fileName || ''}
              onChange={(e) => setForm({ ...form, fileName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".html,.htm,.sql,.py,.js,.ts,.jsx,.tsx"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Replace with File
            </button>
          </div>
        </div>

        {/* Right: Code Editor */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Code</label>
          <div className="relative">
            <textarea
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              rows={14}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-green-400 font-mono text-sm focus:border-cyan-500 outline-none resize-none"
              spellCheck={false}
            />
            <div className="absolute top-2 right-2 text-xs text-slate-500">
              {form.code.split('\n').length} lines
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white rounded-lg transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>
    </div>
  )
}
