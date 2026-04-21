'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, User, FolderOpen, FileText, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { name: 'Projects', href: '#projects', icon: FolderOpen, isAnchor: true },
  { name: 'About', href: '#about', icon: User, isAnchor: true },
  { name: 'Career', href: '#career', icon: FileText, isAnchor: true },
  { name: 'Resume', href: '#resume', icon: FileText, isAnchor: true },
  { name: 'Contact', href: '#contact', icon: Mail, isAnchor: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 50)
    }
    window?.addEventListener?.('scroll', handleScroll)
    return () => window?.removeEventListener?.('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-blue-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            <span className="gradient-text">Patrick Fox</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems?.map?.((item, i) => {
              const Icon = item?.icon
              const className = "flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
              
              if (item.isAnchor) {
                return (
                  <motion.a
                    key={item?.name ?? i}
                    href={item?.href ?? '#'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={className}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{item?.name ?? ''}</span>
                  </motion.a>
                )
              }
              
              return (
                <motion.div
                  key={item?.name ?? i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={item?.href ?? '/'} className={className}>
                    {Icon && <Icon size={16} />}
                    <span>{item?.name ?? ''}</span>
                  </Link>
                </motion.div>
              )
            }) ?? []}
            
            {/* LinkedIn CTA */}
            <motion.a
              href="https://www.linkedin.com/in/patrick-dean-fox/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 ml-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
            >
              <Linkedin size={16} />
              <span>Connect</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems?.map?.((item) => {
              const Icon = item?.icon
              const className = "flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
              
              if (item.isAnchor) {
                return (
                  <a
                    key={item?.name ?? ''}
                    href={item?.href ?? '#'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={className}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{item?.name ?? ''}</span>
                  </a>
                )
              }
              
              return (
                <Link
                  key={item?.name ?? ''}
                  href={item?.href ?? '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={className}
                >
                  {Icon && <Icon size={18} />}
                  <span>{item?.name ?? ''}</span>
                </Link>
              )
            }) ?? []}
            <a
              href="https://www.linkedin.com/in/patrick-dean-fox/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 mt-2 text-blue-400 bg-blue-500/10 rounded-lg border border-blue-500/30"
            >
              <Linkedin size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
