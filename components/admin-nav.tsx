'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Settings, Sparkles, FileText, Brain, MessageSquare,
  Layers, LogOut, Home, Database, Code2, Quote
} from 'lucide-react'

const navItems = [
  { 
    href: '/admin/job-tailor', 
    icon: Sparkles, 
    label: 'Job Tailor',
    activeClasses: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  },
  { 
    href: '/admin/portal-projects', 
    icon: Layers, 
    label: 'Portal Projects',
    activeClasses: 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
  },
  { 
    href: '/admin/code-showcase', 
    icon: Code2, 
    label: 'Code Showcase',
    activeClasses: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
  },
  { 
    href: '/admin/testimonials', 
    icon: Quote, 
    label: 'Testimonials',
    activeClasses: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
  },
  { 
    href: '/admin/content', 
    icon: FileText, 
    label: 'Content Sections',
    activeClasses: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
  },
  { 
    href: '/admin/context', 
    icon: Database, 
    label: 'AI Context',
    activeClasses: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
  },
  { 
    href: '/admin/chat-logs', 
    icon: MessageSquare, 
    label: 'Chat Logs',
    activeClasses: 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
  },
  { 
    href: '/admin/chat', 
    icon: Brain, 
    label: 'Portfolio Assistant',
    activeClasses: 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
  },
  { 
    href: '/admin/settings', 
    icon: Settings, 
    label: 'Settings',
    activeClasses: 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  return (
    <div className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
          >
            <Home size={20} />
            <span className="font-semibold hidden sm:inline">Portfolio</span>
          </Link>

          {/* Nav Items */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? item.activeClasses
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
