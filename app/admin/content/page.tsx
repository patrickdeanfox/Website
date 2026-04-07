'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, User, Briefcase, Brain, Save, Loader2,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, RotateCcw,
  Home, Plus, Trash2, Building2, Calendar,
  MapPin, Upload, X, ImageIcon, BookOpen
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'
import Image from 'next/image'

interface ContentSection {
  sectionId: string
  content: any
  hasOverrides: boolean
}

const sectionMeta = [
  { id: 'hero', name: 'Hero Section', icon: Home, color: 'blue', description: 'Main landing area with name, title, and stats' },
  { id: 'about', name: 'About Section', icon: User, color: 'teal', description: 'Skills, achievements, and professional summary' },
  { id: 'career', name: 'Career Section', icon: Briefcase, color: 'violet', description: 'Professional experience with deep dives' },
  { id: 'ai', name: 'AI Section', icon: Brain, color: 'pink', description: 'AI-augmented work philosophy' }
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
  violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  pink: 'bg-pink-500/10 border-pink-500/30 text-pink-400'
}

const colorPresets = [
  { name: 'Blue', value: 'from-blue-500 to-cyan-500', border: 'border-blue-500/30' },
  { name: 'Emerald', value: 'from-emerald-500 to-teal-500', border: 'border-emerald-500/30' },
  { name: 'Orange', value: 'from-orange-500 to-amber-500', border: 'border-orange-500/30' },
  { name: 'Purple', value: 'from-purple-500 to-violet-500', border: 'border-purple-500/30' },
  { name: 'Indigo', value: 'from-indigo-500 to-blue-500', border: 'border-indigo-500/30' },
  { name: 'Slate', value: 'from-slate-500 to-slate-600', border: 'border-slate-500/30' },
  { name: 'Rose', value: 'from-rose-500 to-pink-500', border: 'border-rose-500/30' }
]

const iconOptions = ['BarChart3', 'Zap', 'Warehouse', 'Building2', 'Database', 'Server', 'LineChart', 'Package', 'Boxes', 'Users', 'Briefcase']

export default function ContentAdmin() {
  const [isAuth, setIsAuth] = useState(false)
  const [sections, setSections] = useState<Record<string, any>>({})
  const [overrideStatus, setOverrideStatus] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>('hero')
  const [expandedEntries, setExpandedEntries] = useState<string[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin')
    } else {
      setIsAuth(true)
      fetchContent()
    }
  }, [router])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      if (response.ok) {
        const data: ContentSection[] = await response.json()
        const contentMap: Record<string, any> = {}
        const overrides: Record<string, boolean> = {}
        data.forEach((item) => {
          contentMap[item.sectionId] = item.content
          overrides[item.sectionId] = item.hasOverrides
        })
        setSections(contentMap)
        setOverrideStatus(overrides)
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (sectionId: string, path: string, value: any) => {
    setSections(prev => {
      const section = JSON.parse(JSON.stringify(prev[sectionId] || {}))
      const parts = path.split('.')
      let current: any = section
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i]
        if (part.includes('[')) {
          const [arrName, indexStr] = part.split('[')
          const index = parseInt(indexStr.replace(']', ''))
          if (!current[arrName]) current[arrName] = []
          if (!current[arrName][index]) current[arrName][index] = {}
          current = current[arrName][index]
        } else {
          if (!current[part]) current[part] = {}
          current = current[part]
        }
      }
      
      const lastPart = parts[parts.length - 1]
      if (lastPart.includes('[')) {
        const [arrName, indexStr] = lastPart.split('[')
        const index = parseInt(indexStr.replace(']', ''))
        if (!current[arrName]) current[arrName] = []
        current[arrName][index] = value
      } else {
        current[lastPart] = value
      }
      
      return { ...prev, [sectionId]: section }
    })
  }

  const saveSection = async (sectionId: string) => {
    setSaving(sectionId)
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          content: sections[sectionId] || {}
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSections(prev => ({ ...prev, [sectionId]: data.content }))
        setMessage({ type: 'success', text: `${sectionId} section saved!` })
        setOverrideStatus(prev => ({ ...prev, [sectionId]: true }))
      } else {
        setMessage({ type: 'error', text: 'Failed to save' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setSaving(null)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const resetSection = async (sectionId: string) => {
    setSaving(sectionId)
    try {
      const response = await fetch(`/api/admin/content?section=${sectionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const data = await response.json()
        setSections(prev => ({ ...prev, [sectionId]: data.content }))
        setMessage({ type: 'success', text: `${sectionId} section reset to defaults!` })
        setOverrideStatus(prev => ({ ...prev, [sectionId]: false }))
      } else {
        setMessage({ type: 'error', text: 'Failed to reset' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setSaving(null)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const toggleEntryExpanded = (entryId: string) => {
    setExpandedEntries(prev => 
      prev.includes(entryId) ? prev.filter(e => e !== entryId) : [...prev, entryId]
    )
  }

  // Add new career entry
  const addCareerEntry = () => {
    setSections(prev => {
      const career = { ...prev.career }
      const entries = career.entries || []
      const newEntry = {
        id: `entry-${Date.now()}`,
        company: 'New Company',
        industry: 'Industry',
        role: 'Role Title',
        period: 'Start - End',
        location: 'Location',
        icon: 'Building2',
        color: 'from-blue-500 to-cyan-500',
        borderColor: 'border-blue-500/30',
        roleItemId: null,
        image: null,
        isCurrent: false,
        highlights: [
          { text: 'Key achievement or responsibility', skills: [], linkTo: null, itemId: null }
        ],
        metrics: [
          { text: 'Metric 1', itemId: null },
          { text: 'Metric 2', itemId: null }
        ],
        deepDive: null
      }
      career.entries = [...entries, newEntry]
      return { ...prev, career }
    })
    setMessage({ type: 'success', text: 'New career entry added! Don\'t forget to save.' })
    setTimeout(() => setMessage(null), 3000)
  }

  // Remove career entry
  const removeCareerEntry = (entryId: string) => {
    if (!confirm('Are you sure you want to remove this career entry?')) return
    setSections(prev => {
      const career = { ...prev.career }
      career.entries = (career.entries || []).filter((e: any) => e.id !== entryId)
      return { ...prev, career }
    })
    setExpandedEntries(prev => prev.filter(e => e !== entryId))
  }

  // Add highlight to entry
  const addHighlight = (entryIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      entry.highlights = [...(entry.highlights || []), {
        text: 'New highlight',
        skills: [],
        linkTo: null,
        itemId: null
      }]
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Remove highlight
  const removeHighlight = (entryIdx: number, highlightIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      entry.highlights = entry.highlights.filter((_: any, i: number) => i !== highlightIdx)
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Add/Remove deep dive
  const toggleDeepDive = (entryIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      if (entry.deepDive) {
        if (confirm('Remove deep dive content? This cannot be undone.')) {
          entry.deepDive = null
        }
      } else {
        entry.deepDive = {
          title: 'Deep Dive Title',
          subtitle: 'Subtitle describing this experience',
          challenge: 'Describe the situation or challenge you faced...',
          solution: 'Describe what you did to address it...',
          technical: [
            { area: 'Technical Area', icon: 'Database', details: 'Details about this technical aspect...', itemId: null }
          ],
          outcomes: [
            { text: 'Key outcome or result', itemId: null }
          ]
        }
      }
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Add technical detail to deep dive
  const addTechnical = (entryIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      if (entry.deepDive) {
        entry.deepDive.technical = [...(entry.deepDive.technical || []), {
          area: 'New Technical Area',
          icon: 'Database',
          details: 'Details...',
          itemId: null
        }]
      }
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Remove technical detail
  const removeTechnical = (entryIdx: number, techIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      if (entry.deepDive) {
        entry.deepDive.technical = entry.deepDive.technical.filter((_: any, i: number) => i !== techIdx)
      }
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Add outcome to deep dive
  const addOutcome = (entryIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      if (entry.deepDive) {
        entry.deepDive.outcomes = [...(entry.deepDive.outcomes || []), {
          text: 'New outcome',
          itemId: null
        }]
      }
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Remove outcome
  const removeOutcome = (entryIdx: number, outcomeIdx: number) => {
    setSections(prev => {
      const career = { ...prev.career }
      const entry = { ...career.entries[entryIdx] }
      if (entry.deepDive) {
        entry.deepDive.outcomes = entry.deepDive.outcomes.filter((_: any, i: number) => i !== outcomeIdx)
      }
      career.entries[entryIdx] = entry
      return { ...prev, career }
    })
  }

  // Upload entry image
  const uploadEntryImage = async (entryIdx: number, file: File) => {
    try {
      const presignedRes = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          isPublic: true
        })
      })
      
      if (!presignedRes.ok) throw new Error('Failed to get upload URL')
      const { uploadUrl, cloud_storage_path } = await presignedRes.json()

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 
          'Content-Type': file.type,
          'Content-Disposition': 'attachment'
        },
        body: file
      })

      if (!uploadRes.ok) throw new Error('Failed to upload file')

      const urlRes = await fetch('/api/upload/get-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cloud_storage_path, isPublic: true })
      })

      if (!urlRes.ok) throw new Error('Failed to get file URL')
      const { url } = await urlRes.json()

      setSections(prev => {
        const career = { ...prev.career }
        const entry = { ...career.entries[entryIdx] }
        entry.image = url
        career.entries[entryIdx] = entry
        return { ...prev, career }
      })

      setMessage({ type: 'success', text: 'Image uploaded! Don\'t forget to save.' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error('Upload error:', err)
      setMessage({ type: 'error', text: 'Failed to upload image' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (!isAuth || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  const renderHeroEditor = () => {
    const hero = sections.hero || {}
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              type="text"
              value={hero.name || ''}
              onChange={(e) => updateField('hero', 'name', e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              value={hero.title || ''}
              onChange={(e) => updateField('hero', 'title', e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
          <input
            type="text"
            value={hero.tagline || ''}
            onChange={(e) => updateField('hero', 'tagline', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
          <input
            type="text"
            value={hero.subtitle || ''}
            onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Philosophy Quote</label>
          <textarea
            value={hero.philosophyQuote || ''}
            onChange={(e) => updateField('hero', 'philosophyQuote', e.target.value)}
            rows={2}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Main Description</label>
          <textarea
            value={hero.description || ''}
            onChange={(e) => updateField('hero', 'description', e.target.value)}
            rows={4}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        
        {/* Stats */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Stats</label>
          <div className="grid md:grid-cols-2 gap-3">
            {(hero.stats || []).map((stat: any, idx: number) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-400">Value</label>
                    <input
                      type="number"
                      value={stat.value || ''}
                      onChange={(e) => updateField('hero', `stats[${idx}].value`, parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Suffix</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => updateField('hero', `stats[${idx}].suffix`, e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Label</label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => updateField('hero', `stats[${idx}].label`, e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderAboutEditor = () => {
    const about = sections.about || {}
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Headline</label>
          <input
            type="text"
            value={about.headline || ''}
            onChange={(e) => updateField('about', 'headline', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={about.description || ''}
            onChange={(e) => updateField('about', 'description', e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">How I Got Here - Paragraph 1</label>
          <textarea
            value={about.howIGotHereP1 || ''}
            onChange={(e) => updateField('about', 'howIGotHereP1', e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">How I Got Here - Paragraph 2</label>
          <textarea
            value={about.howIGotHereP2 || ''}
            onChange={(e) => updateField('about', 'howIGotHereP2', e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">AI Note</label>
          <input
            type="text"
            value={about.aiNote || ''}
            onChange={(e) => updateField('about', 'aiNote', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    )
  }

  const renderCareerEditor = () => {
    const career = sections.career || {}
    const entries = career.entries || []
    
    return (
      <div className="space-y-6">
        {/* Summary and Timeline */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Professional Summary</label>
          <textarea
            value={career.summary || ''}
            onChange={(e) => updateField('career', 'summary', e.target.value)}
            rows={4}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Timeline Title</label>
          <input
            type="text"
            value={career.timelineTitle || ''}
            onChange={(e) => updateField('career', 'timelineTitle', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Timeline Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar size={20} className="text-blue-400" />
              Timeline Points ({(career.timeline || []).length})
            </h4>
            <button
              onClick={() => {
                setSections(prev => {
                  const c = { ...prev.career }
                  const timeline = c.timeline || []
                  timeline.push({
                    year: new Date().getFullYear().toString(),
                    role: 'New Role',
                    company: 'Company',
                    type: 'transition'
                  })
                  c.timeline = timeline
                  return { ...prev, career: c }
                })
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm rounded-lg border border-blue-500/30 transition-colors"
            >
              <Plus size={16} />
              Add Point
            </button>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(career.timeline || []).map((item: any, idx: number) => (
                <div key={idx} className={`bg-slate-900/50 rounded-lg p-3 border ${
                  item.type === 'current' || item.type === 'now' ? 'border-blue-500/50' :
                  item.type === 'promotion' ? 'border-emerald-500/50' : 'border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">Point {idx + 1}</span>
                    <button
                      onClick={() => {
                        if (confirm('Remove this timeline point?')) {
                          setSections(prev => {
                            const c = { ...prev.career }
                            c.timeline = (c.timeline || []).filter((_: any, i: number) => i !== idx)
                            return { ...prev, career: c }
                          })
                        }
                      }}
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.year || ''}
                      onChange={(e) => updateField('career', `timeline[${idx}].year`, e.target.value)}
                      placeholder="Year"
                      className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                    />
                    <input
                      type="text"
                      value={item.role || ''}
                      onChange={(e) => updateField('career', `timeline[${idx}].role`, e.target.value)}
                      placeholder="Role"
                      className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                    />
                    <input
                      type="text"
                      value={item.company || ''}
                      onChange={(e) => updateField('career', `timeline[${idx}].company`, e.target.value)}
                      placeholder="Company"
                      className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                    />
                    <select
                      value={item.type || 'transition'}
                      onChange={(e) => updateField('career', `timeline[${idx}].type`, e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                    >
                      <option value="start">Start</option>
                      <option value="transition">Transition</option>
                      <option value="promotion">Promotion</option>
                      <option value="current">Current</option>
                      <option value="now">Now/Present</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Career Entries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Building2 size={20} className="text-violet-400" />
              Career Entries ({entries.length})
            </h4>
            <button
              onClick={addCareerEntry}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm rounded-lg border border-emerald-500/30 transition-colors"
            >
              <Plus size={16} />
              Add Entry
            </button>
          </div>
          <div className="space-y-3">
            {entries.map((entry: any, idx: number) => {
              const isExpanded = expandedEntries.includes(entry.id)
              const hasDeepDive = !!entry.deepDive
              return (
                <div key={entry.id || idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                  {/* Entry Header */}
                  <div
                    className="p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors cursor-pointer"
                    onClick={() => toggleEntryExpanded(entry.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${entry.color || 'from-blue-500 to-cyan-500'} flex items-center justify-center overflow-hidden`}>
                        {entry.image ? (
                          <Image src={entry.image} alt={entry.company} width={40} height={40} className="object-cover" />
                        ) : (
                          <Building2 size={18} className="text-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <h5 className="font-semibold text-white flex items-center gap-2">
                          {entry.company}
                          {entry.isCurrent && <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">Current</span>}
                          {hasDeepDive && <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">🔍 Deep Dive</span>}
                        </h5>
                        <p className="text-sm text-slate-400">{entry.role} • {entry.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCareerEntry(entry.id); }}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Remove entry"
                      >
                        <Trash2 size={16} />
                      </button>
                      {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                  </div>
                  
                  {/* Expanded Entry Editor */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-4 border-t border-slate-700">
                          {/* Basic Info */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-400 mb-1 block">Company</label>
                              <input
                                type="text"
                                value={entry.company || ''}
                                onChange={(e) => updateField('career', `entries[${idx}].company`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 mb-1 block">Industry</label>
                              <input
                                type="text"
                                value={entry.industry || ''}
                                onChange={(e) => updateField('career', `entries[${idx}].industry`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 mb-1 block">Role</label>
                              <input
                                type="text"
                                value={entry.role || ''}
                                onChange={(e) => updateField('career', `entries[${idx}].role`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 mb-1 block">Period</label>
                              <input
                                type="text"
                                value={entry.period || ''}
                                onChange={(e) => updateField('career', `entries[${idx}].period`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 mb-1 block">Location</label>
                              <input
                                type="text"
                                value={entry.location || ''}
                                onChange={(e) => updateField('career', `entries[${idx}].location`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={entry.isCurrent || false}
                                  onChange={(e) => updateField('career', `entries[${idx}].isCurrent`, e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-600 bg-slate-900/50"
                                />
                                <span className="text-sm text-slate-300">Current Role</span>
                              </label>
                            </div>
                          </div>

                          {/* Color & Icon */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-400 mb-2 block">Color Theme</label>
                              <div className="flex flex-wrap gap-2">
                                {colorPresets.map((preset) => (
                                  <button
                                    key={preset.name}
                                    onClick={() => {
                                      updateField('career', `entries[${idx}].color`, preset.value)
                                      updateField('career', `entries[${idx}].borderColor`, preset.border)
                                    }}
                                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${preset.value} border-2 ${
                                      entry.color === preset.value ? 'border-white' : 'border-transparent'
                                    }`}
                                    title={preset.name}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 mb-2 block">Icon</label>
                              <select
                                value={entry.icon || 'Building2'}
                                onChange={(e) => updateField('career', `entries[${idx}].icon`, e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                              >
                                {iconOptions.map((icon) => (
                                  <option key={icon} value={icon}>{icon}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Image Upload */}
                          <div>
                            <label className="text-xs text-slate-400 mb-2 block">Company Image/Logo</label>
                            <div className="flex items-center gap-4">
                              {entry.image ? (
                                <div className="relative">
                                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-600">
                                    <Image src={entry.image} alt={entry.company} width={64} height={64} className="object-cover" />
                                  </div>
                                  <button
                                    onClick={() => updateField('career', `entries[${idx}].image`, null)}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ) : (
                                <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg cursor-pointer border border-dashed border-slate-600">
                                  <Upload size={16} className="text-slate-400" />
                                  <span className="text-sm text-slate-400">Upload Image</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) uploadEntryImage(idx, file)
                                    }}
                                  />
                                </label>
                              )}
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs text-slate-400">Highlights (Facts & Accomplishments)</label>
                              <button
                                onClick={() => addHighlight(idx)}
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                              >
                                <Plus size={12} /> Add
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(entry.highlights || []).map((highlight: any, hIdx: number) => (
                                <div key={hIdx} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={highlight.text || ''}
                                    onChange={(e) => updateField('career', `entries[${idx}].highlights[${hIdx}].text`, e.target.value)}
                                    className="flex-1 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                                    placeholder="Highlight text"
                                  />
                                  <button
                                    onClick={() => removeHighlight(idx, hIdx)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Metrics */}
                          <div>
                            <label className="text-xs text-slate-400 mb-2 block">Metrics (Key Numbers)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {(entry.metrics || []).map((metric: any, mIdx: number) => (
                                <input
                                  key={mIdx}
                                  type="text"
                                  value={metric.text || ''}
                                  onChange={(e) => updateField('career', `entries[${idx}].metrics[${mIdx}].text`, e.target.value)}
                                  className="bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                                  placeholder={`Metric ${mIdx + 1}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Deep Dive Section */}
                          <div className="pt-4 border-t border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                                <BookOpen size={16} className="text-orange-400" />
                                Deep Dive (Examples & Stories)
                              </h5>
                              <button
                                onClick={() => toggleDeepDive(idx)}
                                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                                  hasDeepDive 
                                    ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' 
                                    : 'bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30'
                                }`}
                              >
                                {hasDeepDive ? 'Remove Deep Dive' : 'Add Deep Dive'}
                              </button>
                            </div>

                            {hasDeepDive && (
                              <div className="bg-slate-900/30 rounded-lg p-4 space-y-4 border border-orange-500/20">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Deep Dive Title</label>
                                    <input
                                      type="text"
                                      value={entry.deepDive?.title || ''}
                                      onChange={(e) => updateField('career', `entries[${idx}].deepDive.title`, e.target.value)}
                                      className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Subtitle</label>
                                    <input
                                      type="text"
                                      value={entry.deepDive?.subtitle || ''}
                                      onChange={(e) => updateField('career', `entries[${idx}].deepDive.subtitle`, e.target.value)}
                                      className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs text-slate-400 mb-1 block">The Situation (Challenge)</label>
                                  <textarea
                                    value={entry.deepDive?.challenge || ''}
                                    onChange={(e) => updateField('career', `entries[${idx}].deepDive.challenge`, e.target.value)}
                                    rows={3}
                                    className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm resize-none"
                                    placeholder="Describe the situation or challenge..."
                                  />
                                </div>

                                <div>
                                  <label className="text-xs text-slate-400 mb-1 block">What I Did (Solution)</label>
                                  <textarea
                                    value={entry.deepDive?.solution || ''}
                                    onChange={(e) => updateField('career', `entries[${idx}].deepDive.solution`, e.target.value)}
                                    rows={3}
                                    className="w-full bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm resize-none"
                                    placeholder="Describe what you did..."
                                  />
                                </div>

                                {/* Technical Details */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs text-slate-400">Technical Details</label>
                                    <button
                                      onClick={() => addTechnical(idx)}
                                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                      <Plus size={12} /> Add
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {(entry.deepDive?.technical || []).map((tech: any, tIdx: number) => (
                                      <div key={tIdx} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                                        <div className="flex items-center gap-2 mb-2">
                                          <select
                                            value={tech.icon || 'Database'}
                                            onChange={(e) => updateField('career', `entries[${idx}].deepDive.technical[${tIdx}].icon`, e.target.value)}
                                            className="bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-xs"
                                          >
                                            {iconOptions.map((icon) => (
                                              <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                          </select>
                                          <input
                                            type="text"
                                            value={tech.area || ''}
                                            onChange={(e) => updateField('career', `entries[${idx}].deepDive.technical[${tIdx}].area`, e.target.value)}
                                            className="flex-1 bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                                            placeholder="Area name"
                                          />
                                          <button
                                            onClick={() => removeTechnical(idx, tIdx)}
                                            className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                        <textarea
                                          value={tech.details || ''}
                                          onChange={(e) => updateField('career', `entries[${idx}].deepDive.technical[${tIdx}].details`, e.target.value)}
                                          rows={2}
                                          className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-white text-sm resize-none"
                                          placeholder="Technical details..."
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Outcomes */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs text-slate-400">Results / Outcomes</label>
                                    <button
                                      onClick={() => addOutcome(idx)}
                                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                      <Plus size={12} /> Add
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {(entry.deepDive?.outcomes || []).map((outcome: any, oIdx: number) => (
                                      <div key={oIdx} className="flex gap-2">
                                        <input
                                          type="text"
                                          value={outcome.text || ''}
                                          onChange={(e) => updateField('career', `entries[${idx}].deepDive.outcomes[${oIdx}].text`, e.target.value)}
                                          className="flex-1 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                                          placeholder="Outcome / result"
                                        />
                                        <button
                                          onClick={() => removeOutcome(idx, oIdx)}
                                          className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderAIEditor = () => {
    const ai = sections.ai || {}
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Headline</label>
          <input
            type="text"
            value={ai.headline || ''}
            onChange={(e) => updateField('ai', 'headline', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={ai.description || ''}
            onChange={(e) => updateField('ai', 'description', e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">AI Multiplier Title</label>
          <input
            type="text"
            value={ai.multiplierText || ''}
            onChange={(e) => updateField('ai', 'multiplierText', e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">AI Multiplier Description</label>
          <textarea
            value={ai.multiplierDescription || ''}
            onChange={(e) => updateField('ai', 'multiplierDescription', e.target.value)}
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
    )
  }

  const renderSectionEditor = (sectionId: string) => {
    switch (sectionId) {
      case 'hero': return renderHeroEditor()
      case 'about': return renderAboutEditor()
      case 'career': return renderCareerEditor()
      case 'ai': return renderAIEditor()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNav />
      
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            Content Manager
          </h1>
          <p className="text-slate-400 text-sm mt-1">Edit all text content on your website from one place</p>
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

        {/* Section Cards */}
        <div className="space-y-4">
          {sectionMeta.map((meta) => {
            const isExpanded = expanded === meta.id
            const isSaving = saving === meta.id
            const hasOverrides = overrideStatus[meta.id]
            const Icon = meta.icon

            return (
              <div
                key={meta.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden"
              >
                {/* Section Header */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : meta.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${colorMap[meta.color]} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        {meta.name}
                        {hasOverrides && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            Customized
                          </span>
                        )}
                      </h3>
                      <p className="text-slate-500 text-sm">{meta.description}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                </div>

                {/* Section Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-4">
                        {renderSectionEditor(meta.id)}

                        <div className="flex gap-3 pt-4 border-t border-slate-700">
                          <button
                            onClick={() => saveSection(meta.id)}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                          >
                            {isSaving ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Save size={18} />
                            )}
                            Save {meta.name}
                          </button>
                          {hasOverrides && (
                            <button
                              onClick={() => resetSection(meta.id)}
                              disabled={isSaving}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                            >
                              <RotateCcw size={18} />
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-300">How it works:</strong> Each section shows your current content. 
            Edit any field and click Save to update. Use Reset to restore default content.
            Changes are saved per-section and will appear on your live site after a page refresh.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            <strong className="text-orange-400">🔍 Deep Dives:</strong> Add detailed case studies to each career entry. 
            These expand on your factual accomplishments with real examples, challenges, and outcomes.
          </p>
        </div>
      </div>
    </div>
  )
}
