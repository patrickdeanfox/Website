import { NextRequest, NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/portfolio-data'
import { portalProjects } from '@/lib/portal-projects-data'
import { prisma } from '@/lib/db'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'
import type Anthropic from '@anthropic-ai/sdk'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

async function searchCompanyInfo(companyName: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 300,
      system: 'You are a research assistant. Provide a brief 2-3 sentence summary about the company mentioned, including their industry, main products/services, and any notable characteristics. Be concise and factual.',
      messages: [{ role: 'user', content: `Tell me about the company: ${companyName}` }],
    })
    const block = response.content.find((b) => b.type === 'text')
    return block && block.type === 'text' ? block.text : ''
  } catch (error) {
    console.error('Company search error:', error)
    return ''
  }
}

async function extractCompanyName(message: string): Promise<string | null> {
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 50,
      system: 'Extract the company name from the user message. Return ONLY the company name, nothing else. If no company is mentioned, return "NONE".',
      messages: [{ role: 'user', content: message }],
    })
    const block = response.content.find((b) => b.type === 'text')
    const result = block && block.type === 'text' ? block.text.trim() : ''
    return result && result !== 'NONE' ? result : null
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, companyKnown, sessionId } = await request.json()

    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                      request.headers.get('x-real-ip') || undefined
    const referrer = request.headers.get('referer') || undefined

    const portfolioContext = portfolioItems.map((item) =>
      `${item.title}: ${item.description} (${item.keywords.join(', ')})`
    ).join('\n')

    const projectsContext = portalProjects.map((p) =>
      `${p.client} (${p.industry}): ${p.title}. Challenge: ${p.challenge}. Solution: ${p.solution}. Outcomes: ${p.outcomes.map((o) => o.text).join('; ')}`
    ).join('\n\n')

    let additionalContext = ''
    try {
      const contextEntries = await prisma.contextEntry.findMany({
        orderBy: { createdAt: 'desc' },
      })
      if (contextEntries.length > 0) {
        additionalContext = '\n\nADDITIONAL CONTEXT:\n' + contextEntries.map((entry) =>
          `[${entry.projectName}] ${entry.content}`
        ).join('\n')
      }
    } catch (error) {
      console.error('Failed to fetch context entries:', error)
    }

    let companyContext: { name: string; industry: string; summary: string } | null = null
    let companyInfo = ''

    if (!companyKnown) {
      const companyName = await extractCompanyName(message)
      if (companyName) {
        companyInfo = await searchCompanyInfo(companyName)
        if (companyInfo) {
          companyContext = {
            name: companyName,
            industry: 'Technology',
            summary: companyInfo,
          }
        }
      }
    }

    const stableSystemPrompt = `You are Patrick Fox's AI Career Advocate - a friendly, professional assistant helping recruiters and hiring managers understand why Patrick would be an excellent addition to their team.

ABOUT PATRICK:
- 21-year career spanning financial services (Merrill Lynch, USAA), operations leadership (COO twice), and modern analytics/AI implementation
- Currently Analytics Implementation Manager at Zuar Inc
- One of the few professionals who can read a balance sheet, architect a data pipeline, and deploy an LLM—all in the same conversation
- Built 16+ client portals, 200+ portal pages, integrated 24+ data sources
- Pioneer in LLM/AI integration - first Zuar employee to deploy production chatbots

CAREER TRAJECTORY:
- Started at Merrill Lynch (2005-2007) and USAA (2009-2012) where he earned Series 7, Series 66, and P&C insurance licenses across all 50 states
- Business Controller at DRC Collective - financial reporting, QuickBooks, bookkeeping
- 7.5 years at Thomas Inventory Services rising from Operations Manager to COO, scaling from $3M to $12M
- COO at Propel Electric Bikes during COVID, scaling from $2M to $8M revenue and 8 to 35 employees
- Built data pipelines with Python before "data engineering" was a job title
- Now brings all that experience to enterprise analytics implementation

TECHNICAL SKILLS:
- Languages: Python, SQL, JavaScript, HTML/CSS, PHP
- BI Tools: Tableau, ThoughtSpot, Power BI, Looker
- Data: BigQuery, Zuar Runner (ETL/ELT), Data Modeling
- AI/LLM: Ollama, Docker, MCP architecture, prompt engineering, chatbot development
- Financial: Series 7, Series 66, P&C Insurance, QuickBooks, Financial Reporting

PATRICK'S KEY SKILLS & EXPERIENCE:
${portfolioContext}

NOTABLE PROJECTS:
${projectsContext}
${additionalContext}

GUIDELINES:
1. Be enthusiastic but genuine - Patrick has real accomplishments to highlight
2. Connect Patrick's experience to the visitor's likely needs
3. Use specific examples and metrics when possible
4. Emphasize the rare combination of finance + operations + technical skills
5. If they ask about gaps, honestly acknowledge but pivot to adaptability and learning speed
6. Keep responses concise but impactful (2-4 paragraphs max)
7. Encourage them to explore the portfolio or reach out directly
8. Be conversational and personable, not robotic

Remember: You're advocating for Patrick, but authentically. Don't oversell - his work speaks for itself.`

    const chatMessages: Anthropic.MessageParam[] = []

    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: ChatMessage) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          chatMessages.push({ role: msg.role, content: msg.content })
        }
      })
    }

    const currentUserContent = companyInfo
      ? `[Visitor's company context — ${companyContext?.name}: ${companyInfo}\nTailor responses to highlight alignment with this company's likely needs.]\n\n${message}`
      : message

    chatMessages.push({ role: 'user', content: currentUserContent })

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: stableSystemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: chatMessages,
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const responseContent = textBlock && textBlock.type === 'text' ? textBlock.text : ''

    if (!responseContent) {
      return NextResponse.json({ error: 'No response generated' }, { status: 500 })
    }

    if (sessionId) {
      try {
        await prisma.chatLog.create({
          data: {
            sessionId,
            role: 'user',
            content: message,
            userAgent,
            ipAddress,
            referrer,
            companyDetected: companyContext?.name || null,
          },
        })
        await prisma.chatLog.create({
          data: {
            sessionId,
            role: 'assistant',
            content: responseContent,
            companyDetected: companyContext?.name || null,
          },
        })
      } catch (logError) {
        console.error('Failed to log conversation:', logError)
      }
    }

    return NextResponse.json({
      response: responseContent,
      companyContext,
    })
  } catch (error) {
    console.error('Advocate chat error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
