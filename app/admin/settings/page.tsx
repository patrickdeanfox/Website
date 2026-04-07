'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Settings, MessageSquare, Clock, RefreshCw,
  ToggleLeft, ToggleRight, Loader2, CheckCircle,
  AlertCircle, Briefcase, Sparkles, Quote
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'

interface SiteSettings {
  id: string
  advocateChatEnabled: boolean
  testimonialsEnabled: boolean
  jobTailorActive: boolean
  jobTailorExpiry: string | null
  jobTailorData: any
  jobTailorDefaults: any
}

export default function SettingsAdmin() {
  const [isAuth, setIsAuth] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true'
    if (!auth) {
      router.push('/admin')
    } else {
      setIsAuth(true)
      fetchSettings()
    }
  }, [router])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = async (key: keyof SiteSettings, value: any) => {
    if (!settings) return
    
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Setting updated successfully' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Failed to update setting' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setSaving(false)
    }
  }

  const revertToDefaults = async () => {
    if (!settings || !settings.jobTailorDefaults) return
    
    setSaving(true)
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
      setMessage({ type: 'success', text: 'Reverted to default state' })
      fetchSettings()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to revert' })
    } finally {
      setSaving(false)
    }
  }

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-400" />
            Site Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">Control frontend features and behaviors</p>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}
          >
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </motion.div>
        )}

        {/* Settings Cards */}
        <div className="space-y-6">
          
          {/* Advocate Chatbot Toggle */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Career Advocate</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    The floating chatbot that helps visitors understand your value proposition.
                    When enabled, it appears on the bottom-right of the portfolio.
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting('advocateChatEnabled', !settings?.advocateChatEnabled)}
                className={`p-2 rounded-lg transition-colors ${settings?.advocateChatEnabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}
                disabled={saving}
              >
                {settings?.advocateChatEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <p className={`text-sm ${settings?.advocateChatEnabled ? 'text-green-400' : 'text-slate-500'}`}>
                Status: {settings?.advocateChatEnabled ? 'Active - Chatbot is visible to visitors' : 'Disabled - Chatbot is hidden'}
              </p>
            </div>
          </div>

          {/* Testimonials Toggle */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Testimonials Section</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Display recommendations from colleagues and clients on your portfolio.
                    Toggle off to hide the entire testimonials section.
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSetting('testimonialsEnabled', !settings?.testimonialsEnabled)}
                className={`p-2 rounded-lg transition-colors ${settings?.testimonialsEnabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}
                disabled={saving}
              >
                {settings?.testimonialsEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <p className={`text-sm ${settings?.testimonialsEnabled ? 'text-green-400' : 'text-slate-500'}`}>
                Status: {settings?.testimonialsEnabled ? 'Active - Testimonials section is visible' : 'Disabled - Testimonials section is hidden'}
              </p>
            </div>
          </div>

          {/* Job Tailoring Controls */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Job Tailoring</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Manage the job-specific content customizations on your portfolio.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Current Status</p>
                  <p className="text-slate-400 text-sm">
                    {settings?.jobTailorActive ? 'Active customization applied' : 'Using default content'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${settings?.jobTailorActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'}`}>
                  {settings?.jobTailorActive ? 'Tailored' : 'Default'}
                </span>
              </div>

              {settings?.jobTailorExpiry && (
                <div className="flex items-center gap-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <p className="text-amber-300 text-sm">
                    Auto-revert scheduled for: {new Date(settings.jobTailorExpiry).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={revertToDefaults}
                  disabled={saving || !settings?.jobTailorActive}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <RefreshCw size={18} />
                  Revert to Default
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
