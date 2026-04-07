'use client'

import { ArrowUp, Linkedin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window?.scrollTo?.({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 border-t border-blue-500/20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              <span className="gradient-text">Patrick Fox</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-md">
              Analytics Implementation Manager helping organizations 
              turn raw data into actionable insights.
            </p>
          </div>
          
          {/* LinkedIn CTA */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-slate-400 text-sm">Let&apos;s connect</p>
            <a
              href="https://www.linkedin.com/in/patrick-dean-fox/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-[#0077B5] hover:bg-[#006299] rounded-lg text-white font-medium transition-all duration-300 hover:-translate-y-1"
            >
              <Linkedin size={20} />
              <span>Connect on LinkedIn</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="divider-elegant mb-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-sm">
            © 2026 Patrick Dean Fox
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
              Projects
            </a>
            <a href="#about" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
              About
            </a>
            <a href="#ai" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
              AI
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} className="text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
