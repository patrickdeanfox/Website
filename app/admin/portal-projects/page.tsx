'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Eye, EyeOff, Upload, Edit3, Save,
  Image as ImageIcon, CheckCircle2, AlertCircle, Loader2,
  ChevronDown, ChevronUp, Sparkles, X, Trash2, GripVertical,
  Database, Code2, Server, BarChart3, Cpu, Zap, Users, LineChart, 
  TrendingUp, Target, Building2, Layers, Brain, Activity, PieChart,
  DollarSign, Globe, FileText, Settings, Box, Briefcase, LucideIcon,
  Minimize2, Maximize2
} from 'lucide-react'
import Image from 'next/image'
import AdminNav from '@/components/admin-nav'

const iconMap: Record<string, LucideIcon> = {
  Database, Code2, Server, BarChart3, Cpu, Zap, Users, LineChart,
  TrendingUp, Target, Building2, Layers, Brain, Activity, PieChart,
  DollarSign, Globe, FileText, Settings, Box, Briefcase, Sparkles
}

const availableIcons = Object.keys(iconMap)

const badgePresets = [
  '🚀 Innovation Pioneer', '💰 6-Figure ROI', '⭐ Featured Project',
  '🏆 Award Winner', '📈 Growth Driver', '🎯 Strategic Impact',
  '💎 Premium Client', '🔥 High Impact', '🌟 Flagship'
]

const colorPresets = [
  { name: 'Violet', value: 'from-violet-500 to-slate-900' },
  { name: 'Emerald', value: 'from-emerald-500 to-slate-900' },
  { name: 'Blue', value: 'from-blue-500 to-slate-900' },
  { name: 'Amber', value: 'from-amber-500 to-slate-900' },
  { name: 'Rose', value: 'from-rose-500 to-slate-900' },
  { name: 'Cyan', value: 'from-cyan-500 to-slate-900' },
  { name: 'Indigo', value: 'from-indigo-500 to-slate-900' },
  { name: 'Teal', value: 'from-teal-500 to-slate-900' },
  { name: 'Orange', value: 'from-orange-500 to-slate-900' },
  { name: 'Pink', value: 'from-pink-500 to-slate-900' },
  { name: 'Lime', value: 'from-lime-500 to-slate-900' },
  { name: 'Fuchsia', value: 'from-fuchsia-500 to-slate-900' },
]

interface TechnicalDetail { area: string; icon: string; details: string; itemId?: string | null }
interface Outcome { text: string; itemId?: string | null }

interface PortalProjectWithSettings {
  id: string
  client: string
  industry: string
  title: string
  subtitle: string
  icon: string
  color: string
  borderColor: string
  metrics: Array<{ value: string; label: string; itemId?: string | null }>
  flagshipBadge: string
  challenge: string
  solution: string
  technical: TechnicalDetail[]
  outcomes: Outcome[]
  isVisible: boolean
  initialSize: 'collapsed' | 'full'
  displayOrder: number
  screenshots: string[]
  dbId: string | null
}

type ExpansionLevel = 'collapsed' | 'full'

export default function PortalProjectsAdmin() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<PortalProjectWithSettings[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expansionLevels, setExpansionLevels] = useState<Record<string, ExpansionLevel>>({})
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<PortalProjectWithSettings> | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [orderChanged, setOrderChanged] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true'
    if (!isAuth) { router.push('/admin') } else { setIsAuthenticated(true); fetchProjects() }
  }, [router])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/portal-projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
        const levels: Record<string, ExpansionLevel> = {}
        data.forEach((p: PortalProjectWithSettings) => { levels[p.id] = 'collapsed' })
        setExpansionLevels(levels)
      }
    } catch (error) { console.error('Failed to fetch projects:', error) }
    finally { setLoading(false) }
  }

  const handleLogout = () => { sessionStorage.removeItem('adminAuth'); router.push('/admin') }

  const cycleExpansion = (projectId: string) => {
    setExpansionLevels(prev => {
      const current = prev[projectId] || 'collapsed'
      const next: ExpansionLevel = current === 'collapsed' ? 'full' : 'collapsed'
      return { ...prev, [projectId]: next }
    })
  }

  const handleReorder = (newOrder: PortalProjectWithSettings[]) => {
    setProjects(newOrder)
    setOrderChanged(true)
  }

  const saveOrder = async () => {
    setSaving('order')
    try {
      for (let i = 0; i < projects.length; i++) {
        await fetch('/api/admin/portal-projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId: projects[i].id, displayOrder: i + 1 })
        })
      }
      setOrderChanged(false)
      setMessage({ type: 'success', text: 'Order saved!' })
    } catch (error) { setMessage({ type: 'error', text: 'Failed to save order' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  const updateInitialSize = async (projectId: string, size: 'collapsed' | 'full') => {
    setSaving(projectId)
    try {
      await fetch('/api/admin/portal-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, initialSize: size })
      })
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, initialSize: size } : p))
      setMessage({ type: 'success', text: `Initial size set to ${size}` })
    } catch (error) { setMessage({ type: 'error', text: 'Failed to update size' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  const toggleVisibility = async (projectId: string, currentVisibility: boolean) => {
    setSaving(projectId)
    try {
      const response = await fetch('/api/admin/portal-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, isVisible: !currentVisibility })
      })
      if (response.ok) {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isVisible: !currentVisibility } : p))
        setMessage({ type: 'success', text: `Project ${!currentVisibility ? 'shown' : 'hidden'}` })
      }
    } catch (error) { setMessage({ type: 'error', text: 'Failed to update visibility' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  const startEditing = (project: PortalProjectWithSettings) => {
    setEditingProject(project.id)
    setEditForm({
      client: project.client, title: project.title, subtitle: project.subtitle,
      icon: project.icon, color: project.color, metrics: [...project.metrics],
      flagshipBadge: project.flagshipBadge, challenge: project.challenge, solution: project.solution,
      technical: project.technical ? [...project.technical] : [], outcomes: project.outcomes ? [...project.outcomes] : []
    })
    setExpansionLevels(prev => ({ ...prev, [project.id]: 'full' }))
  }

  const cancelEditing = () => { setEditingProject(null); setEditForm(null) }

  const saveEdits = async (projectId: string) => {
    if (!editForm) return
    setSaving(projectId)
    try {
      const response = await fetch('/api/admin/portal-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId, client: editForm.client, title: editForm.title, subtitle: editForm.subtitle,
          icon: editForm.icon, color: editForm.color, metrics: editForm.metrics,
          flagshipBadge: editForm.flagshipBadge, challenge: editForm.challenge, solution: editForm.solution,
          technical: editForm.technical, outcomes: editForm.outcomes
        })
      })
      if (response.ok) {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...editForm } : p))
        setMessage({ type: 'success', text: 'Project updated' })
        setEditingProject(null); setEditForm(null)
      }
    } catch (error) { setMessage({ type: 'error', text: 'Failed to save changes' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  const updateMetric = (index: number, field: 'value' | 'label', value: string) => {
    if (!editForm?.metrics) return
    const newMetrics = [...editForm.metrics]; newMetrics[index] = { ...newMetrics[index], [field]: value }
    setEditForm({ ...editForm, metrics: newMetrics })
  }

  const updateTechnical = (index: number, field: keyof TechnicalDetail, value: string) => {
    if (!editForm?.technical) return
    const newTech = [...editForm.technical]; newTech[index] = { ...newTech[index], [field]: value }
    setEditForm({ ...editForm, technical: newTech })
  }

  const addTechnical = () => {
    if (!editForm) return
    setEditForm({ ...editForm, technical: [...(editForm.technical || []), { area: '', icon: 'Code2', details: '' }] })
  }
  const removeTechnical = (index: number) => {
    if (!editForm?.technical) return
    setEditForm({ ...editForm, technical: editForm.technical.filter((_, i) => i !== index) })
  }

  const updateOutcome = (index: number, value: string) => {
    if (!editForm?.outcomes) return
    const newOutcomes = [...editForm.outcomes]; newOutcomes[index] = { ...newOutcomes[index], text: value }
    setEditForm({ ...editForm, outcomes: newOutcomes })
  }
  const addOutcome = () => {
    if (!editForm) return
    setEditForm({ ...editForm, outcomes: [...(editForm.outcomes || []), { text: '' }] })
  }
  const removeOutcome = (index: number) => {
    if (!editForm?.outcomes) return
    setEditForm({ ...editForm, outcomes: editForm.outcomes.filter((_, i) => i !== index) })
  }

  const handleFileSelect = (projectId: string) => { setUploadingFor(projectId); fileInputRef.current?.click() }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !uploadingFor) return
    setSaving(uploadingFor)
    try {
      const presignedResponse = await fetch('/api/upload/presigned', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, isPublic: true })
      })
      if (!presignedResponse.ok) throw new Error('Failed to get upload URL')
      const { uploadUrl, cloud_storage_path } = await presignedResponse.json()
      const signedHeadersMatch = uploadUrl.match(/X-Amz-SignedHeaders=([^&]+)/)
      const signedHeaders = signedHeadersMatch ? decodeURIComponent(signedHeadersMatch[1]) : ''
      const uploadHeaders: HeadersInit = { 'Content-Type': file.type }
      if (signedHeaders.includes('content-disposition')) uploadHeaders['Content-Disposition'] = 'attachment'
      const uploadResponse = await fetch(uploadUrl, { method: 'PUT', headers: uploadHeaders, body: file })
      if (!uploadResponse.ok) throw new Error('Failed to upload file')
      const urlResponse = await fetch('/api/upload/get-url', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cloud_storage_path, isPublic: true })
      })
      if (!urlResponse.ok) throw new Error('Failed to get file URL')
      const { url } = await urlResponse.json()
      const project = projects.find(p => p.id === uploadingFor)
      const newScreenshots = [...(project?.screenshots || []), url]
      await fetch('/api/admin/portal-projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: uploadingFor, screenshots: newScreenshots })
      })
      setProjects(prev => prev.map(p => p.id === uploadingFor ? { ...p, screenshots: newScreenshots } : p))
      setMessage({ type: 'success', text: 'Screenshot uploaded' })
    } catch (error) { setMessage({ type: 'error', text: 'Failed to upload screenshot' }) }
    finally { setSaving(null); setUploadingFor(null); if (fileInputRef.current) fileInputRef.current.value = ''; setTimeout(() => setMessage(null), 3000) }
  }

  const removeScreenshot = async (projectId: string, screenshotUrl: string) => {
    setSaving(projectId)
    try {
      const project = projects.find(p => p.id === projectId)
      const newScreenshots = (project?.screenshots || []).filter(s => s !== screenshotUrl)
      await fetch('/api/admin/portal-projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, screenshots: newScreenshots })
      })
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, screenshots: newScreenshots } : p))
      setMessage({ type: 'success', text: 'Screenshot removed' })
    } catch (error) { setMessage({ type: 'error', text: 'Failed to remove screenshot' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  if (!isAuthenticated || loading) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNav />
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
      
      {/* Page Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-400" />
              Portal Projects
            </h1>
            <p className="text-sm text-slate-400">Drag to reorder • Set initial display size</p>
          </div>
          {orderChanged && (
            <button onClick={saveOrder} disabled={saving === 'order'} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
              {saving === 'order' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Order
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}{message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 text-slate-400"><GripVertical size={14} /> Drag to reorder</span>
            <span className="flex items-center gap-2 text-emerald-400"><Maximize2 size={14} /> Full (expanded)</span>
            <span className="flex items-center gap-2 text-slate-400"><Minimize2 size={14} /> Collapsed (header only)</span>
          </div>
        </div>

        <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="space-y-4">
          {projects.map((project, index) => {
            const expansionLevel = expansionLevels[project.id] || 'collapsed'
            const isSaving = saving === project.id
            const isEditing = editingProject === project.id
            const IconComponent = iconMap[isEditing && editForm?.icon ? editForm.icon : project.icon] || Database
            const projectColor = isEditing && editForm?.color ? editForm.color : project.color

            return (
              <Reorder.Item key={project.id} value={project} className={`bg-slate-800/60 rounded-xl border ${project.isVisible ? project.borderColor : 'border-red-500/30 bg-slate-800/30'} overflow-hidden`}>
                
                {/* Header */}
                <div className="p-4 cursor-pointer" onClick={() => !isEditing && cycleExpansion(project.id)}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-slate-300" onClick={e => e.stopPropagation()}>
                        <GripVertical size={20} />
                      </div>
                      <span className="text-slate-500 text-sm font-mono w-6">#{index + 1}</span>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${projectColor} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        {isEditing ? (
                          <div className="space-y-2" onClick={e => e.stopPropagation()}>
                            <input type="text" value={editForm?.client || ''} onChange={e => setEditForm({ ...editForm, client: e.target.value })}
                              className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-sm" placeholder="Client name" />
                            <input type="text" value={editForm?.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-xs" placeholder="Title" />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-white truncate">{project.client}</h3>
                              <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded-full">{project.flagshipBadge}</span>
                              {!project.isVisible && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Hidden</span>}
                            </div>
                            <p className="text-sm text-slate-400 truncate">{project.title}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      {/* Initial Size Selector */}
                      <div className="flex border border-slate-600 rounded-lg overflow-hidden">
                        <button onClick={() => updateInitialSize(project.id, 'collapsed')} disabled={isSaving}
                          className={`p-2 ${project.initialSize === 'collapsed' ? 'bg-slate-600 text-white' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`} title="Collapsed">
                          <Minimize2 size={14} />
                        </button>
                        <button onClick={() => updateInitialSize(project.id, 'full')} disabled={isSaving}
                          className={`p-2 ${project.initialSize === 'full' ? 'bg-emerald-500/30 text-emerald-400' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`} title="Full">
                          <Maximize2 size={14} />
                        </button>
                      </div>
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdits(project.id)} disabled={isSaving} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50">
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                          </button>
                          <button onClick={cancelEditing} className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700"><X size={18} /></button>
                        </>
                      ) : (
                        <button onClick={() => startEditing(project)} className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white"><Edit3 size={18} /></button>
                      )}
                      <button onClick={() => toggleVisibility(project.id, project.isVisible)} disabled={isSaving}
                        className={`p-2 rounded-lg transition-colors ${project.isVisible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} disabled:opacity-50`}>
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : project.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Badge, Icon & Color Editor */}
                  {isEditing && (
                    <div className="mt-3 space-y-3" onClick={e => e.stopPropagation()}>
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <label className="text-xs text-slate-400 mb-2 block">Header Badge:</label>
                        <input type="text" value={editForm?.flagshipBadge || ''} onChange={e => setEditForm({ ...editForm, flagshipBadge: e.target.value })}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-sm mb-2" placeholder="🚀 Your Badge" />
                        <div className="flex flex-wrap gap-1">
                          {badgePresets.map(badge => (
                            <button key={badge} onClick={() => setEditForm({ ...editForm, flagshipBadge: badge })}
                              className={`px-2 py-0.5 text-xs rounded ${editForm?.flagshipBadge === badge ? 'bg-violet-500/30 text-violet-300' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`}>
                              {badge}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <label className="text-xs text-slate-400 mb-2 block">Icon:</label>
                          <div className="flex flex-wrap gap-2">
                            {availableIcons.map(iconName => {
                              const Icon = iconMap[iconName]
                              return (
                                <button key={iconName} onClick={() => setEditForm({ ...editForm, icon: iconName })}
                                  className={`p-2 rounded-lg ${editForm?.icon === iconName ? 'bg-blue-500/30 text-blue-400 ring-1 ring-blue-500' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`}>
                                  <Icon size={16} />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <label className="text-xs text-slate-400 mb-2 block">Color Theme:</label>
                          <div className="flex flex-wrap gap-2">
                            {colorPresets.map(color => (
                              <button key={color.value} onClick={() => setEditForm({ ...editForm, color: color.value })}
                                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color.value} ${editForm?.color === color.value ? 'ring-2 ring-white' : ''}`} title={color.name} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Level - KPIs & Details */}
                <AnimatePresence>
                  {expansionLevel === 'full' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t border-slate-700/30 pt-3">
                        <div className="flex gap-3 flex-wrap">
                          {(isEditing ? editForm?.metrics : project.metrics)?.map((metric, mIdx) => (
                            <div key={mIdx} className={`bg-gradient-to-br ${projectColor} bg-opacity-10 rounded-lg px-3 py-2 shrink-0`}>
                              {isEditing ? (
                                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                                  <input type="text" value={metric.value} onChange={e => updateMetric(mIdx, 'value', e.target.value)}
                                    className="w-16 bg-slate-800/50 border border-slate-600 rounded px-1 py-0.5 text-white text-sm text-center" />
                                  <input type="text" value={metric.label} onChange={e => updateMetric(mIdx, 'label', e.target.value)}
                                    className="w-24 bg-slate-800/50 border border-slate-600 rounded px-1 py-0.5 text-slate-300 text-xs" />
                                </div>
                              ) : (
                                <><span className="text-white font-semibold text-sm">{metric.value}</span><span className="text-slate-300 text-xs ml-1">{metric.label}</span></>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Full Level - All Content */}
                <AnimatePresence>
                  {expansionLevel === 'full' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 space-y-4">
                        <div className="bg-slate-900/30 rounded-lg p-3">
                          <h5 className="text-xs font-medium text-amber-400 mb-1">💡 Challenge</h5>
                          {isEditing ? (
                            <textarea value={editForm?.challenge || ''} onChange={e => setEditForm({ ...editForm, challenge: e.target.value })}
                              onClick={e => e.stopPropagation()} rows={3} className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-sm" />
                          ) : <p className="text-sm text-slate-300">{project.challenge}</p>}
                        </div>
                        <div className="bg-slate-900/30 rounded-lg p-3">
                          <h5 className="text-xs font-medium text-emerald-400 mb-1">✅ Solution</h5>
                          {isEditing ? (
                            <textarea value={editForm?.solution || ''} onChange={e => setEditForm({ ...editForm, solution: e.target.value })}
                              onClick={e => e.stopPropagation()} rows={3} className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-sm" />
                          ) : <p className="text-sm text-slate-300">{project.solution}</p>}
                        </div>
                        <div className="bg-slate-900/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs font-medium text-blue-400">🔧 Technical Details</h5>
                            {isEditing && <button onClick={e => { e.stopPropagation(); addTechnical() }} className="text-xs text-blue-400 hover:text-blue-300">+ Add</button>}
                          </div>
                          <div className="space-y-2">
                            {(isEditing ? editForm?.technical : project.technical)?.map((tech, tIdx) => (
                              <div key={tIdx} className="flex gap-2 items-start">
                                {isEditing ? (
                                  <div className="flex-1 space-y-1" onClick={e => e.stopPropagation()}>
                                    <div className="flex gap-2">
                                      <input type="text" value={tech.area} onChange={e => updateTechnical(tIdx, 'area', e.target.value)}
                                        className="w-32 bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-white text-xs" placeholder="Area" />
                                      <select value={tech.icon} onChange={e => updateTechnical(tIdx, 'icon', e.target.value)}
                                        className="bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-xs">
                                        {availableIcons.map(i => <option key={i} value={i}>{i}</option>)}
                                      </select>
                                      <button onClick={() => removeTechnical(tIdx)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                                    </div>
                                    <textarea value={tech.details} onChange={e => updateTechnical(tIdx, 'details', e.target.value)} rows={2}
                                      className="w-full bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-xs" placeholder="Details" />
                                  </div>
                                ) : <><span className="text-blue-400">•</span><span className="text-slate-300 text-sm"><strong>{tech.area}:</strong> {tech.details}</span></>}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs font-medium text-violet-400">🎯 Outcomes</h5>
                            {isEditing && <button onClick={e => { e.stopPropagation(); addOutcome() }} className="text-xs text-violet-400 hover:text-violet-300">+ Add</button>}
                          </div>
                          <div className="space-y-2">
                            {(isEditing ? editForm?.outcomes : project.outcomes)?.map((outcome, oIdx) => (
                              <div key={oIdx} className="flex gap-2 items-center">
                                {isEditing ? (
                                  <div className="flex-1 flex gap-2" onClick={e => e.stopPropagation()}>
                                    <input type="text" value={outcome.text} onChange={e => updateOutcome(oIdx, e.target.value)}
                                      className="flex-1 bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-slate-300 text-sm" placeholder="Outcome" />
                                    <button onClick={() => removeOutcome(oIdx)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                                  </div>
                                ) : <><span className="text-violet-400">✓</span><span className="text-slate-300 text-sm">{outcome.text}</span></>}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t border-slate-700/30 pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2"><ImageIcon size={16} />Screenshots ({project.screenshots.length})</h4>
                            <button onClick={e => { e.stopPropagation(); handleFileSelect(project.id) }} disabled={isSaving}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm disabled:opacity-50">
                              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}Upload
                            </button>
                          </div>
                          {project.screenshots.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {project.screenshots.map((screenshot, sIdx) => (
                                <div key={sIdx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 group">
                                  <Image src={screenshot} alt={`Screenshot ${sIdx + 1}`} fill className="object-cover" />
                                  <button onClick={e => { e.stopPropagation(); removeScreenshot(project.id, screenshot) }}
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"><X size={14} /></button>
                                </div>
                              ))}
                            </div>
                          ) : <div className="text-center py-6 text-slate-500"><ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" /><p className="text-sm">No screenshots yet</p></div>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </main>
    </div>
  )
}
