'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
  Code2, Database, Brain, Cpu, Workflow, Zap, Server, Lock,
  MessageSquare, FileText, Layout, Palette, GitBranch, Cloud,
  ArrowLeft, ChevronDown, ChevronRight, Sparkles, Bot, BarChart3,
  Layers, Terminal, Globe, Shield, Cog
} from 'lucide-react'

interface TechSection {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  description: string
  features: string[]
  codeExample?: {
    language: string
    title: string
    code: string
  }
}

const techSections: TechSection[] = [
  {
    id: 'stack',
    title: 'Tech Stack',
    icon: <Layers className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Built with modern web technologies for performance and developer experience.',
    features: [
      'Next.js 14 (App Router) - Server-side rendering and API routes',
      'React 18 with TypeScript - Type-safe component architecture',
      'Tailwind CSS - Utility-first styling with custom design system',
      'Framer Motion - Fluid animations and micro-interactions',
      'Prisma ORM - Type-safe database access',
      'PostgreSQL - Relational data storage'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Next.js App Router Structure',
      code: `// app/page.tsx - Server Component
export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Career />
      <AISection />
      <AdvocateChatbotWrapper />
    </main>
  )
}`
    }
  },
  {
    id: 'ai-advocate',
    title: 'AI Career Advocate',
    icon: <Bot className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500',
    description: 'An intelligent chatbot that advocates for Patrick by understanding visitor context and tailoring responses.',
    features: [
      'Company Detection - Automatically identifies visitor companies and tailors messaging',
      'Context-Aware Responses - Uses MCP-like architecture for page-specific data',
      'Portfolio Integration - References specific projects, metrics, and achievements',
      'Session Logging - Tracks conversations for analytics and improvement',
      'LLM-Powered - Uses GPT-4 for natural, contextual responses'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Advocate Chat API Route',
      code: `// app/api/advocate-chat/route.ts
export async function POST(request: NextRequest) {
  const { message, sessionId } = await request.json()
  
  // Build context from portfolio data
  const portfolioContext = portfolioItems.map(item =>
    \`\${item.title}: \${item.description}\`
  ).join('\\n')
  
  // Fetch additional context from database
  const contextEntries = await prisma.contextEntry.findMany()
  
  // Detect company from message
  const companyName = await extractCompanyName(message)
  const companyInfo = await searchCompanyInfo(companyName)
  
  // Generate response with full context
  const response = await llm.chat({
    model: 'gpt-4.1-mini',
    messages: [systemPrompt, ...history, userMessage]
  })
  
  // Log conversation
  await prisma.chatLog.create({ ... })
  
  return NextResponse.json({ response })
}`
    }
  },
  {
    id: 'job-tailoring',
    title: 'Job Tailoring System',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-500',
    description: 'LLM-powered analysis that maps portfolio items to job descriptions, highlighting relevant experience.',
    features: [
      'Job Description Analysis - Extracts requirements, skills, and company info',
      'Relevance Scoring - Maps each portfolio item to job requirements (0-100)',
      'Visual Indicators - Sparkles icons appear next to relevant achievements',
      'Real-time Updates - UI dynamically updates when job is analyzed',
      'Context Provider - React Context shares analysis across all components'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Job Context Provider',
      code: `// lib/job-context.tsx
export function JobProvider({ children }) {
  const [jobAnalysis, setJobAnalysis] = useState(null)
  
  const analyzeJob = async (description: string) => {
    const response = await fetch('/api/analyze-job', {
      method: 'POST',
      body: JSON.stringify({ jobDescription: description })
    })
    const analysis = await response.json()
    setJobAnalysis(analysis)
  }
  
  const getRelevance = (itemId: string) => {
    return jobAnalysis?.relevanceMappings
      ?.find(m => m.itemId === itemId)
  }
  
  return (
    <JobContext.Provider value={{ analyzeJob, getRelevance }}>
      {children}
    </JobContext.Provider>
  )
}`
    }
  },
  {
    id: 'content-management',
    title: 'Content Management',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-500',
    description: 'Admin system for editing all website content without code changes.',
    features: [
      'Section Editing - Edit Hero, About, Resume, AI sections from admin UI',
      'Portal Projects - Full CRUD for case studies with drag-and-drop ordering',
      'AI Context - Manage context entries that inform the Career Advocate',
      'Real-time Preview - Changes reflect immediately via React Context',
      'Database Persistence - Content stored in PostgreSQL via Prisma'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Content Context Hook',
      code: `// lib/content-context.tsx
export function useContent(sectionId: string) {
  const { content, updateContent, loading } = useContext(ContentContext)
  
  // Get section content with defaults fallback
  const sectionContent = content[sectionId] || 
    getDefaultContentForSection(sectionId)
  
  const update = async (newContent: any) => {
    await fetch('/api/admin/content', {
      method: 'POST',
      body: JSON.stringify({ sectionId, content: newContent })
    })
    updateContent(sectionId, newContent)
  }
  
  return { content: sectionContent, update, loading }
}`
    }
  },
  {
    id: 'mcp-architecture',
    title: 'MCP-Like Architecture',
    icon: <Workflow className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    description: 'Model Context Protocol pattern for secure, scoped AI access to portfolio data.',
    features: [
      'Data Isolation - LLM only sees data relevant to current context',
      'No Data Leaks - API connections pull only page-specific information',
      'Context Injection - Portfolio items and project details passed as context',
      'Database Integration - Context entries stored and retrieved per-project',
      'Secure by Design - LLM cannot access data outside its context window'
    ],
    codeExample: {
      language: 'typescript',
      title: 'MCP Context Building',
      code: `// Building MCP-like context for LLM
const buildContext = async () => {
  // 1. Static portfolio data (always included)
  const portfolioContext = portfolioItems
    .map(item => \`\${item.title}: \${item.description}\`)
  
  // 2. Dynamic project details (scoped)
  const projectsContext = portalProjects
    .map(p => \`\${p.client}: \${p.challenge} -> \${p.solution}\`)
  
  // 3. Admin-managed context entries
  const contextEntries = await prisma.contextEntry.findMany()
  
  // 4. Combine into system prompt
  return \`
    PORTFOLIO: \${portfolioContext.join('\\n')}
    PROJECTS: \${projectsContext.join('\\n')}
    CONTEXT: \${contextEntries.map(e => e.content).join('\\n')}
  \`
}`
    }
  },
  {
    id: 'database',
    title: 'Database Schema',
    icon: <Database className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-500',
    description: 'PostgreSQL database with Prisma ORM for type-safe data access.',
    features: [
      'PortalProject - Project visibility, ordering, content overrides',
      'SiteSettings - Global settings, job tailoring state',
      'SectionContent - Editable section content JSON',
      'ContextEntry - AI context entries by project',
      'ChatLog - Conversation history with metadata'
    ],
    codeExample: {
      language: 'prisma',
      title: 'Prisma Schema Models',
      code: `// prisma/schema.prisma
model ChatLog {
  id            String   @id @default(cuid())
  sessionId     String   // Unique session identifier
  role          String   // user or assistant
  content       String   // Message content
  userAgent     String?
  ipAddress     String?
  referrer      String?
  companyDetected String?
  createdAt     DateTime @default(now())
}

model ContextEntry {
  id          String   @id @default(cuid())
  projectId   String   // e.g., pe-demo, general
  projectName String   // Human-readable name
  type        String   // url, note, detail
  content     String   // The context content
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`
    }
  },
  {
    id: 'animations',
    title: 'Animations & Interactions',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    description: 'Framer Motion powers fluid animations and micro-interactions throughout.',
    features: [
      'Scroll-triggered Animations - Elements animate into view',
      'Staggered Children - List items animate sequentially',
      'Drag & Drop - Project reordering in admin panel',
      'Expandable Cards - Smooth project detail expansion',
      'Hover States - Subtle feedback on interactive elements'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Framer Motion Animations',
      code: `// Scroll-triggered animation
const { ref, inView } = useInView({ 
  triggerOnce: true, 
  threshold: 0.1 
})

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>

// Staggered children
<motion.div variants={container} animate="visible">
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      variants={child}
      custom={i}
      initial="hidden"
      animate="visible"
    />
  ))}
</motion.div>`
    }
  },
  {
    id: 'security',
    title: 'Security & Auth',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500',
    description: 'Simple authentication for admin actions with public read access.',
    features: [
      'Public Viewing - Anyone can browse admin UI to see how it works',
      'Password Protection - Mutations require password verification',
      'Session Storage - Auth state persisted in browser session',
      'API Validation - Server-side password check on write operations',
      'Environment Variables - Secrets stored securely'
    ],
    codeExample: {
      language: 'typescript',
      title: 'Password-Protected Actions',
      code: `// Admin action with password protection
const handleSave = async () => {
  // Check if authenticated
  const isAuth = sessionStorage.getItem('adminAuth')
  
  if (isAuth !== 'true') {
    // Show password prompt
    const password = await promptPassword()
    
    // Verify password
    const verified = await verifyPassword(password)
    if (!verified) {
      showError('Invalid password')
      return
    }
    sessionStorage.setItem('adminAuth', 'true')
  }
  
  // Proceed with save
  await fetch('/api/admin/content', {
    method: 'POST',
    body: JSON.stringify({ sectionId, content })
  })
}`
    }
  }
]

function CodeBlock({ code, language, title }: { code: string; language: string; title: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="mt-4 rounded-lg overflow-hidden border border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 bg-slate-800 flex items-center justify-between text-sm"
      >
        <span className="flex items-center gap-2 text-slate-300">
          <Terminal className="w-4 h-4 text-emerald-400" />
          {title}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="bg-slate-950 p-4 overflow-x-auto">
          <pre className="text-sm text-slate-300 font-mono whitespace-pre">
            {code}
          </pre>
        </div>
      )}
    </div>
  )
}

function TechCard({ section, index }: { section: TechSection; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden"
    >
      <div className={`h-1 bg-gradient-to-r ${section.color}`} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} bg-opacity-20`}>
            {section.icon}
          </div>
          <h3 className="text-xl font-bold text-white">{section.title}</h3>
        </div>
        
        <p className="text-slate-400 mb-4">{section.description}</p>
        
        <ul className="space-y-2">
          {section.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        {section.codeExample && (
          <CodeBlock
            code={section.codeExample.code}
            language={section.codeExample.language}
            title={section.codeExample.title}
          />
        )}
      </div>
    </motion.div>
  )
}

export default function MetaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <Cog className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold">How This Site Works</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <Code2 className="w-4 h-4" />
              Technical Deep Dive
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Building an AI-Powered Portfolio
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              A transparent look at the technology, architecture, and design decisions 
              behind this portfolio website. Explore the code, understand the patterns, 
              and see how AI augments traditional web development.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'GPT-4', 'Framer Motion'].map(tech => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
              <p className="text-sm text-slate-400">React components with server-side rendering and dynamic content</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Server className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">API Layer</h3>
              <p className="text-sm text-slate-400">Next.js API routes handling LLM calls, database ops, and file uploads</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Integration</h3>
              <p className="text-sm text-slate-400">LLM-powered chatbot and job analysis with MCP-like context</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Sections */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Layers className="w-6 h-6 text-cyan-400" />
            Technical Implementation
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {techSections.map((section, index) => (
              <TechCard key={section.id} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to see it in action?</h2>
          <p className="text-slate-400 mb-8">
            Try the Career Advocate chatbot, paste a job description to see the tailoring system, 
            or explore the admin panel to see how content is managed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 bg-slate-800 rounded-lg text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
            >
              View Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          Built by Patrick Dean Fox • View the technology behind modern portfolio design
        </div>
      </footer>
    </div>
  )
}
