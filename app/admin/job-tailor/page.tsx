'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, FileText, Sparkles, CheckCircle2, XCircle, Edit3, 
  Loader2, ChevronDown, ChevronUp, Eye,
  AlertCircle, Save, RotateCcw, Wand2,
  Clock, RefreshCw, Pin, Settings
} from 'lucide-react'
import Link from 'next/link'
import AdminNav from '@/components/admin-nav'
import { portfolioItems, PortfolioItem } from '@/lib/portfolio-data'

interface RelevanceMapping {
  itemId: string
  relevanceScore: number
  explanation: string
  matchingKeywords: string[]
  suggestedChanges?: string
}

interface JobAnalysis {
  companyName: string
  jobTitle: string
  industry: string
  keyRequirements: string[]
  desiredSkills: string[]
  fitSummary: string
  topStrengths: string[]
  relevanceMappings: RelevanceMapping[]
}

interface ApprovalState {
  [itemId: string]: 'pending' | 'approved' | 'rejected' | 'edited'
}

interface EditState {
  [itemId: string]: string
}

export default function JobTailorAdmin() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [approvalState, setApprovalState] = useState<ApprovalState>({})
  const [editState, setEditState] = useState<EditState>({})
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [filterScore, setFilterScore] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'preview'>('overview')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [expiryHours, setExpiryHours] = useState(24)
  const [isActivating, setIsActivating] = useState(false)
  const [tailorStatus, setTailorStatus] = useState<{
    active: boolean
    expiry: string | null
  } | null>(null)

  // Fetch current tailoring status
  const fetchTailorStatus = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setTailorStatus({
          active: data.jobTailorActive,
          expiry: data.jobTailorExpiry
        })
      }
    } catch (error) {
      console.error('Failed to fetch tailor status:', error)
    }
  }

  // Activate tailoring with optional timer
  const activateTailoring = async (withTimer: boolean) => {
    setIsActivating(true)
    try {
      const tailoredData = {
        analysis,
        approvalState,
        editState,
        appliedAt: new Date().toISOString()
      }

      const expiry = withTimer 
        ? new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString()
        : null

      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTailorActive: true,
          jobTailorData: tailoredData,
          jobTailorExpiry: expiry
        })
      })

      // Also store in sessionStorage for immediate use
      sessionStorage.setItem('portfolioTailoring', JSON.stringify(tailoredData))
      
      setShowTimerModal(false)
      fetchTailorStatus()
      alert(withTimer 
        ? `Tailoring activated! Will auto-revert in ${expiryHours} hours.`
        : 'Tailoring activated! Visit the portfolio to see changes.'
      )
    } catch (error) {
      alert('Failed to activate tailoring')
    } finally {
      setIsActivating(false)
    }
  }

  // Revert to default
  const revertToDefault = async () => {
    if (!confirm('Are you sure you want to revert to the default state? This will remove all tailoring.')) return
    
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTailorActive: false,
          jobTailorData: null,
          jobTailorExpiry: null
        })
      })

      sessionStorage.removeItem('portfolioTailoring')
      fetchTailorStatus()
      alert('Reverted to default state')
    } catch (error) {
      alert('Failed to revert')
    }
  }

  // Set current as new default
  const setAsDefault = async () => {
    if (!confirm('Are you sure you want to make the current tailoring the new default?')) return
    
    try {
      const tailoredData = {
        analysis,
        approvalState,
        editState,
        appliedAt: new Date().toISOString()
      }

      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTailorDefaults: tailoredData,
          jobTailorActive: false,
          jobTailorData: null,
          jobTailorExpiry: null
        })
      })

      sessionStorage.removeItem('portfolioTailoring')
      fetchTailorStatus()
      alert('Current state is now the new default!')
    } catch (error) {
      alert('Failed to set as default')
    }
  }

  useEffect(() => {
    fetchTailorStatus()
  }, [])

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true'
    if (!isAuth) {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return
    
    setIsAnalyzing(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      })
      
      if (!response.ok) throw new Error('Analysis failed')
      
      const data = await response.json()
      setAnalysis(data)
      
      // Initialize approval states
      const initialApprovals: ApprovalState = {}
      data.relevanceMappings?.forEach((mapping: RelevanceMapping) => {
        initialApprovals[mapping.itemId] = 'pending'
      })
      setApprovalState(initialApprovals)
      setActiveTab('overview')
    } catch (err) {
      setError('Failed to analyze job description. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleApprove = (itemId: string) => {
    setApprovalState(prev => ({ ...prev, [itemId]: 'approved' }))
  }

  const handleReject = (itemId: string) => {
    setApprovalState(prev => ({ ...prev, [itemId]: 'rejected' }))
  }

  const handleEdit = (itemId: string, text: string) => {
    setEditState(prev => ({ ...prev, [itemId]: text }))
    setApprovalState(prev => ({ ...prev, [itemId]: 'edited' }))
    setEditingItem(null)
  }

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const approveAll = () => {
    const newState: ApprovalState = {}
    analysis?.relevanceMappings?.forEach(mapping => {
      if (mapping.relevanceScore >= filterScore) {
        newState[mapping.itemId] = 'approved'
      }
    })
    setApprovalState(prev => ({ ...prev, ...newState }))
  }

  const resetAll = () => {
    const newState: ApprovalState = {}
    analysis?.relevanceMappings?.forEach(mapping => {
      newState[mapping.itemId] = 'pending'
    })
    setApprovalState(newState)
    setEditState({})
  }

  const getPortfolioItem = (itemId: string): PortfolioItem | undefined => {
    return portfolioItems.find(item => item.id === itemId)
  }

  const filteredMappings = analysis?.relevanceMappings?.filter(
    mapping => mapping.relevanceScore >= filterScore
  ) || []

  const stats = {
    total: analysis?.relevanceMappings?.length || 0,
    approved: Object.values(approvalState).filter(s => s === 'approved').length,
    rejected: Object.values(approvalState).filter(s => s === 'rejected').length,
    edited: Object.values(approvalState).filter(s => s === 'edited').length,
    pending: Object.values(approvalState).filter(s => s === 'pending').length
  }

  const applyToPortfolio = () => {
    // Show timer modal to choose activation options
    setShowTimerModal(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNav />
      
      {/* Page Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-blue-400" />
            Job Tailoring Dashboard
          </h1>
          <p className="text-sm text-slate-400">Customize portfolio for specific job opportunities</p>
        </div>
      </div>

      {/* Status Banner */}
      {tailorStatus?.active && (
        <div className="bg-blue-500/10 border-b border-blue-500/30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300">
                <strong>Tailoring Active</strong>
                {tailorStatus.expiry && (
                  <span className="ml-2 text-blue-400">
                    • Auto-reverts {new Date(tailorStatus.expiry).toLocaleString()}
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={revertToDefault}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
              >
                <RefreshCw size={14} />
                Revert to Default
              </button>
              <button
                onClick={setAsDefault}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm rounded-lg transition-colors"
              >
                <Pin size={14} />
                Set as New Default
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 rounded-lg transition-colors"
          >
            <Settings size={18} />
            Settings
          </Link>
          {tailorStatus?.active && (
            <button
              onClick={revertToDefault}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              Revert to Default
            </button>
          )}
        </div>

        {/* Job Description Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Job Description
          </h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full h-48 bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={analyzeJob}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze & Generate Mappings
                </>
              )}
            </button>
            {analysis && (
              <button
                onClick={() => {
                  setAnalysis(null)
                  setJobDescription('')
                  setApprovalState({})
                  setEditState({})
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2"
              >
                <RotateCcw size={18} />
                Clear
              </button>
            )}
          </div>
          {error && (
            <div className="mt-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </motion.div>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {(['overview', 'items', 'preview'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Summary */}
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Job Summary</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400 text-sm">Company</span>
                        <p className="text-white font-medium">{analysis.companyName || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Position</span>
                        <p className="text-white font-medium">{analysis.jobTitle || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Industry</span>
                        <p className="text-white font-medium">{analysis.industry || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fit Summary */}
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Fit Analysis</h3>
                    <p className="text-slate-300 leading-relaxed">{analysis.fitSummary}</p>
                  </div>

                  {/* Top Strengths */}
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Strengths</h3>
                    <ul className="space-y-2">
                      {analysis.topStrengths?.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Approval Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-sm text-slate-400">Total Items</div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
                        <div className="text-sm text-slate-400">Approved</div>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
                        <div className="text-sm text-slate-400">Rejected</div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-amber-400">{stats.edited}</div>
                        <div className="text-sm text-slate-400">Edited</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Items Tab */}
              {activeTab === 'items' && (
                <div>
                  {/* Filter & Actions */}
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 mb-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">Min Score:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filterScore}
                        onChange={(e) => setFilterScore(Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-white font-medium w-12">{filterScore}%</span>
                    </div>
                    <div className="flex-1" />
                    <button
                      onClick={approveAll}
                      className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <CheckCircle2 size={18} />
                      Approve All Visible
                    </button>
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-2 bg-slate-700/50 text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <RotateCcw size={18} />
                      Reset All
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {filteredMappings.map((mapping) => {
                      const item = getPortfolioItem(mapping.itemId)
                      const status = approvalState[mapping.itemId]
                      const isExpanded = expandedItems.includes(mapping.itemId)
                      const isEditing = editingItem === mapping.itemId

                      return (
                        <div
                          key={mapping.itemId}
                          className={`bg-slate-800/50 rounded-xl border transition-colors ${
                            status === 'approved' ? 'border-green-500/30' :
                            status === 'rejected' ? 'border-red-500/30' :
                            status === 'edited' ? 'border-amber-500/30' :
                            'border-slate-700/50'
                          }`}
                        >
                          <div
                            className="p-4 flex items-center gap-4 cursor-pointer"
                            onClick={() => toggleExpand(mapping.itemId)}
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                              mapping.relevanceScore >= 80 ? 'bg-green-500/20 text-green-400' :
                              mapping.relevanceScore >= 50 ? 'bg-amber-500/20 text-amber-400' :
                              'bg-slate-700/50 text-slate-400'
                            }`}>
                              {mapping.relevanceScore}%
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white truncate">
                                {item?.title || mapping.itemId}
                              </h4>
                              <p className="text-sm text-slate-400 truncate">
                                {item?.category} • {item?.type}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {status === 'approved' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                              {status === 'rejected' && <XCircle className="w-5 h-5 text-red-400" />}
                              {status === 'edited' && <Edit3 className="w-5 h-5 text-amber-400" />}
                              {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 border-t border-slate-700/50 space-y-4">
                                  <div>
                                    <span className="text-slate-400 text-sm">Original Content</span>
                                    <p className="text-slate-300 mt-1">{item?.description}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Why It's Relevant</span>
                                    <p className="text-slate-300 mt-1">{mapping.explanation}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 text-sm">Matching Keywords</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {mapping.matchingKeywords?.map((kw, i) => (
                                        <span key={i} className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                                          {kw}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Edit Area */}
                                  {isEditing ? (
                                    <div className="space-y-2">
                                      <textarea
                                        defaultValue={editState[mapping.itemId] || mapping.suggestedChanges || item?.description}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-white text-sm resize-none h-24"
                                        id={`edit-${mapping.itemId}`}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => {
                                            const textarea = document.getElementById(`edit-${mapping.itemId}`) as HTMLTextAreaElement
                                            handleEdit(mapping.itemId, textarea.value)
                                          }}
                                          className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg text-sm"
                                        >
                                          <Save size={14} />
                                          Save Edit
                                        </button>
                                        <button
                                          onClick={() => setEditingItem(null)}
                                          className="text-slate-400 px-3 py-1.5 text-sm"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleApprove(mapping.itemId); }}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                          status === 'approved'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                        }`}
                                      >
                                        <CheckCircle2 size={14} />
                                        Approve
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleReject(mapping.itemId); }}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                          status === 'rejected'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        }`}
                                      >
                                        <XCircle size={14} />
                                        Reject
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setEditingItem(mapping.itemId); }}
                                        className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg text-sm hover:bg-amber-500/30 transition-colors"
                                      >
                                        <Edit3 size={14} />
                                        Edit
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Preview Changes</h3>
                    <button
                      onClick={applyToPortfolio}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-6 py-2 rounded-lg"
                    >
                      <Save size={18} />
                      Apply to Portfolio
                    </button>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                    <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                      {JSON.stringify({ analysis, approvalState, editState }, null, 2)}
                    </pre>
                  </div>
                  <p className="text-slate-400 text-sm mt-4">
                    Note: Approved and edited items will be highlighted on the portfolio when you apply changes.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Timer Modal */}
      <AnimatePresence>
        {showTimerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTimerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl border border-slate-700/50 max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">Activate Tailoring</h3>
              <p className="text-slate-400 text-sm mb-6">
                Choose how to apply your tailored content to the portfolio.
              </p>

              <div className="space-y-4">
                {/* Permanent Option */}
                <button
                  onClick={() => activateTailoring(false)}
                  disabled={isActivating}
                  className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-left transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Pin className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-white">Activate Permanently</span>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">
                    Keep tailoring active until you manually revert or set a new default.
                  </p>
                </button>

                {/* Timer Option */}
                <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-white">Activate with Timer</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 pl-8">
                    Automatically revert to default after a set time.
                  </p>
                  <div className="flex items-center gap-3 pl-8">
                    <label className="text-slate-400 text-sm">Revert after:</label>
                    <select
                      value={expiryHours}
                      onChange={(e) => setExpiryHours(Number(e.target.value))}
                      className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={4}>4 hours</option>
                      <option value={8}>8 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                      <option value={48}>48 hours</option>
                      <option value={72}>72 hours</option>
                      <option value={168}>1 week</option>
                    </select>
                    <button
                      onClick={() => activateTailoring(true)}
                      disabled={isActivating}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isActivating ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                      Set Timer
                    </button>
                  </div>
                </div>

                {/* Set as Default Option */}
                <button
                  onClick={setAsDefault}
                  disabled={isActivating}
                  className="w-full p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-left transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-white">Make This the New Default</span>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">
                    Replace the original default with this tailored version permanently.
                  </p>
                </button>
              </div>

              <button
                onClick={() => setShowTimerModal(false)}
                className="w-full mt-4 px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
