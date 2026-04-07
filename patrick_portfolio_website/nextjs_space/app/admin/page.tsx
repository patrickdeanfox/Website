'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Settings, FileText, MessageSquare, Database, Briefcase,
  ArrowRight, Lock, Unlock, Eye, Code2, BarChart3, Sparkles,
  Shield, CheckCircle, AlertCircle
} from 'lucide-react'

const adminSections = [
  {
    id: 'job-tailor',
    title: 'Job Tailoring',
    description: 'Analyze job descriptions and tailor portfolio relevance',
    icon: Briefcase,
    href: '/admin/job-tailor',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'content',
    title: 'Content Editor',
    description: 'Edit Hero, About, Resume, and AI section content',
    icon: FileText,
    href: '/admin/content',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'portal-projects',
    title: 'Portal Projects',
    description: 'Manage case studies, screenshots, and project ordering',
    icon: Database,
    href: '/admin/portal-projects',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'code-showcase',
    title: 'Code Showcase',
    description: 'Manage code samples with built-in editor and file upload',
    icon: Code2,
    href: '/admin/code-showcase',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'Manage recommendations with LinkedIn links',
    icon: MessageSquare,
    href: '/admin/testimonials',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'context',
    title: 'AI Context',
    description: 'Add context entries for the Career Advocate chatbot',
    icon: Sparkles,
    href: '/admin/context',
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'chat-logs',
    title: 'Chat Logs',
    description: 'View Career Advocate conversations and analytics',
    icon: MessageSquare,
    href: '/admin/chat-logs',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Toggle features and manage site-wide settings',
    icon: Settings,
    href: '/admin/settings',
    color: 'from-slate-500 to-slate-600'
  }
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    setIsAuthenticated(auth === 'true')
  }, [])

  const handleAuthenticate = () => {
    if (password === '1234') {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      setShowPasswordModal(false)
      setPassword('')
      setPasswordError('')
    } else {
      setPasswordError('Invalid password')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Manage your portfolio</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Site
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full text-emerald-400 text-sm">
                  <Unlock className="w-4 h-4" />
                  Authenticated
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg text-blue-400 text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
              >
                <Lock className="w-4 h-4" />
                Authenticate
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start gap-4"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white mb-1">Public View Mode</h2>
            <p className="text-sm text-slate-400">
              Anyone can browse the admin interface to see how it works. 
              To make changes, click &quot;Authenticate&quot; and enter the password.
              This is a demonstration of transparent portfolio architecture.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Admin Sections Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={section.href}
                  className="block bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group"
                >
                  <div className={`h-1 bg-gradient-to-r ${section.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} bg-opacity-20`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
                    <p className="text-sm text-slate-400">{section.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            How This Admin Panel Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Public Viewing</span>
              </div>
              <p className="text-sm text-slate-400">
                Anyone can browse all admin pages to see the architecture and how content is managed.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Lock className="w-4 h-4" />
                <span className="font-medium">Protected Changes</span>
              </div>
              <p className="text-sm text-slate-400">
                Any action that modifies data requires authentication. Changes are saved to PostgreSQL.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Session-Based Auth</span>
              </div>
              <p className="text-sm text-slate-400">
                Authentication persists for your browser session. Close the tab to automatically log out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-xl border border-slate-700 p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              Enter Password
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Authenticate to enable editing capabilities.
            </p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
              placeholder="Enter password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            
            {passwordError && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
                <AlertCircle className="w-4 h-4" />
                {passwordError}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                  setPasswordError('')
                }}
                className="flex-1 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAuthenticate}
                className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                Authenticate
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
