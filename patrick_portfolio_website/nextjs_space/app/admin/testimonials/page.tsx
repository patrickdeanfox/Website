'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Quote, Plus, Save, Trash2, Eye, EyeOff, Linkedin,
  CheckCircle2, AlertCircle, Loader2, GripVertical, Edit3, X,
  ChevronDown, ChevronUp, User, Building2, ExternalLink
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  linkedinUrl?: string
  imageUrl?: string
  content: string
  relationship?: string
  isVisible: boolean
  displayOrder: number
}

export default function TestimonialsAdmin() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [orderChanged, setOrderChanged] = useState(false)

  // New testimonial form state
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    title: '',
    company: '',
    linkedinUrl: '',
    imageUrl: '',
    content: '',
    relationship: ''
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchTestimonials()
    } else {
      router.push('/admin')
    }
  }, [router])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      showMessage('error', 'Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleCreate = async () => {
    if (!newTestimonial.name || !newTestimonial.title || !newTestimonial.company || !newTestimonial.content) {
      showMessage('error', 'Name, title, company, and content are required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTestimonial,
          displayOrder: testimonials.length
        })
      })

      if (res.ok) {
        const created = await res.json()
        setTestimonials([...testimonials, created])
        setNewTestimonial({ name: '', title: '', company: '', linkedinUrl: '', imageUrl: '', content: '', relationship: '' })
        setShowNewForm(false)
        showMessage('success', 'Testimonial created!')
      } else {
        showMessage('error', 'Failed to create testimonial')
      }
    } catch (error) {
      showMessage('error', 'Error creating testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (testimonial: Testimonial) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      })

      if (res.ok) {
        setTestimonials(testimonials.map(t => t.id === testimonial.id ? testimonial : t))
        setEditingId(null)
        showMessage('success', 'Testimonial updated!')
      } else {
        showMessage('error', 'Failed to update testimonial')
      }
    } catch (error) {
      showMessage('error', 'Error updating testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id))
        showMessage('success', 'Testimonial deleted')
      } else {
        showMessage('error', 'Failed to delete testimonial')
      }
    } catch (error) {
      showMessage('error', 'Error deleting testimonial')
    }
  }

  const handleToggleVisibility = async (testimonial: Testimonial) => {
    const updated = { ...testimonial, isVisible: !testimonial.isVisible }
    await handleUpdate(updated)
  }

  const handleReorder = (newOrder: Testimonial[]) => {
    setTestimonials(newOrder)
    setOrderChanged(true)
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const items = testimonials.map((t, index) => ({ id: t.id, displayOrder: index }))
      const res = await fetch('/api/admin/testimonials/reorder', {
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
      <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
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
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Testimonials</h1>
                <p className="text-slate-400 text-sm">Manage recommendations and endorsements</p>
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
                className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
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
        {/* New Testimonial Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-slate-800/50 border border-violet-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-violet-400" />
                    Add New Testimonial
                  </h2>
                  <button onClick={() => setShowNewForm(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Person Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                      <input
                        type="text"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                        placeholder="e.g., John Smith"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Job Title *</label>
                        <input
                          type="text"
                          value={newTestimonial.title}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, title: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
                          placeholder="e.g., VP of Engineering"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Company *</label>
                        <input
                          type="text"
                          value={newTestimonial.company}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
                          placeholder="e.g., Acme Corp"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Relationship</label>
                      <input
                        type="text"
                        value={newTestimonial.relationship}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, relationship: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
                        placeholder="e.g., Direct manager at Zuar"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <span className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-[#0077B5]" />
                          LinkedIn Profile URL
                        </span>
                      </label>
                      <input
                        type="url"
                        value={newTestimonial.linkedinUrl}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, linkedinUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image URL (optional)</label>
                      <input
                        type="url"
                        value={newTestimonial.imageUrl}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, imageUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
                        placeholder="https://images.unsplash.com/photo-1609902726285-00668009f004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDQzfHxoYXBweXxlbnwwfHx8fDE2MTU4OTMxMDU&ixlib=rb-1.2.1&q=80&w=2000"
                      />
                    </div>
                  </div>

                  {/* Right: Testimonial Content */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial Content *</label>
                    <textarea
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none"
                      placeholder="Paste the recommendation or testimonial text here..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Tip: You can copy recommendations directly from LinkedIn
                    </p>
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
                    disabled={saving || !newTestimonial.name || !newTestimonial.title || !newTestimonial.company || !newTestimonial.content}
                    className="flex items-center gap-2 px-6 py-2 bg-violet-500 hover:bg-violet-600 disabled:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Create Testimonial
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <Quote className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Testimonials Yet</h3>
            <p className="text-slate-400 mb-6">Add your first recommendation to get started</p>
            <button
              onClick={() => setShowNewForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add First Testimonial
            </button>
          </div>
        ) : (
          <Reorder.Group axis="y" values={testimonials} onReorder={handleReorder} className="space-y-4">
            {testimonials.map((testimonial) => {
              const isExpanded = expandedId === testimonial.id
              const isEditing = editingId === testimonial.id

              return (
                <Reorder.Item
                  key={testimonial.id}
                  value={testimonial}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  {/* Item Header */}
                  <div className="flex items-center gap-4 p-4">
                    <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-white">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white truncate">{testimonial.name}</h3>
                        {testimonial.linkedinUrl && (
                          <a
                            href={testimonial.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0077B5] hover:text-[#0099E0]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 truncate">
                        {testimonial.title} at {testimonial.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleVisibility(testimonial)}
                        className={`p-2 rounded-lg transition-colors ${
                          testimonial.isVisible
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-slate-700/50 text-slate-500 hover:text-white'
                        }`}
                        title={testimonial.isVisible ? 'Visible' : 'Hidden'}
                      >
                        {testimonial.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : testimonial.id)}
                        className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDelete(testimonial.id)}
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
                            <EditTestimonialForm
                              testimonial={testimonial}
                              onSave={handleUpdate}
                              onCancel={() => setEditingId(null)}
                              saving={saving}
                            />
                          ) : (
                            <>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <blockquote className="text-slate-300 italic border-l-4 border-violet-500 pl-4">
                                    &ldquo;{testimonial.content}&rdquo;
                                  </blockquote>
                                  {testimonial.relationship && (
                                    <p className="text-sm text-slate-500 mt-4">Relationship: {testimonial.relationship}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => setEditingId(testimonial.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors ml-4"
                                >
                                  <Edit3 className="w-4 h-4" />
                                  Edit
                                </button>
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
function EditTestimonialForm({
  testimonial,
  onSave,
  onCancel,
  saving
}: {
  testimonial: Testimonial
  onSave: (testimonial: Testimonial) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState(testimonial)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Person Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Relationship</label>
            <input
              type="text"
              value={form.relationship || ''}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                LinkedIn Profile URL
              </span>
            </label>
            <input
              type="url"
              value={form.linkedinUrl || ''}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image URL</label>
            <input
              type="url"
              value={form.imageUrl || ''}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none"
            />
          </div>
        </div>

        {/* Right: Testimonial Content */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial Content</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-violet-500 outline-none resize-none"
          />
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
          className="flex items-center gap-2 px-6 py-2 bg-violet-500 hover:bg-violet-600 disabled:bg-slate-600 text-white rounded-lg transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>
    </div>
  )
}
