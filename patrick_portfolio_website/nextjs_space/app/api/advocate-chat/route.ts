import { NextRequest, NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/portfolio-data'
import { portalProjects } from '@/lib/portal-projects-data'
import { prisma } from '@/lib/db'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// Web search to get company info
async function searchCompanyInfo(companyName: string): Promise<string> {
  try {
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a research assistant. Provide a brief 2-3 sentence summary about the company mentioned, including their industry, main products/services, and any notable characteristics. Be concise and factual.'
          },
          {
            role: 'user',
            content: `Tell me about the company: ${companyName}`
          }
        ],
        max_tokens: 200,
        temperature: 0.3
      })
    })

    if (!response.ok) {
      return ''
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (error) {
    console.error('Company search error:', error)
    return ''
  }
}

// Extract company name from user message
async function extractCompanyName(message: string): Promise<string | null> {
  try {
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'Extract the company name from the user message. Return ONLY the company name, nothing else. If no company is mentioned, return "NONE".'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 50,
        temperature: 0
      })
    })

    if (!response.ok) return null

    const data = await response.json()
    const result = data.choices?.[0]?.message?.content?.trim()
    return result && result !== 'NONE' ? result : null
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, companyKnown, sessionId } = await request.json()
    
    // Extract metadata from request headers
    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                      request.headers.get('x-real-ip') || undefined
    const referrer = request.headers.get('referer') || undefined

    // Build portfolio context
    const portfolioContext = portfolioItems.map(item =>
      `${item.title}: ${item.description} (${item.keywords.join(', ')})`
    ).join('\n')

    const projectsContext = portalProjects.map(p =>
      `${p.client} (${p.industry}): ${p.title}. Challenge: ${p.challenge}. Solution: ${p.solution}. Outcomes: ${p.outcomes.map(o => o.text).join('; ')}`
    ).join('\n\n')

    // Fetch additional context from database
    let additionalContext = ''
    try {
      const contextEntries = await prisma.contextEntry.findMany({
        orderBy: { createdAt: 'desc' }
      })
      if (contextEntries.length > 0) {
        additionalContext = '\n\nADDITIONAL CONTEXT:\n' + contextEntries.map(entry =>
          `[${entry.projectName}] ${entry.content}`
        ).join('\n')
      }
    } catch (error) {
      console.error('Failed to fetch context entries:', error)
    }

    let companyContext = null
    let companyInfo = ''

    // If company not yet known, try to extract from message
    if (!companyKnown) {
      const companyName = await extractCompanyName(message)
      if (companyName) {
        companyInfo = await searchCompanyInfo(companyName)
        if (companyInfo) {
          companyContext = {
            name: companyName,
            industry: 'Technology', // Could be extracted from companyInfo
            summary: companyInfo
          }
        }
      }
    }

    // Build system prompt
    const systemPrompt = `You are Patrick Fox's AI Career Advocate - a friendly, professional assistant helping recruiters and hiring managers understand why Patrick would be an excellent addition to their team.

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

${companyInfo ? `COMPANY CONTEXT (visitor is from ${companyContext?.name}):
${companyInfo}

Tailor your responses to highlight how Patrick's experience aligns with this company's needs.` : ''}

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

    // Build messages array for LLM
    const chatMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ]

    // Add conversation history
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: ChatMessage) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          chatMessages.push({ role: msg.role, content: msg.content })
        }
      })
    }

    // Add current message
    chatMessages.push({ role: 'user', content: message })

    // Call LLM
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: chatMessages,
        max_tokens: 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LLM API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const responseContent = data.choices?.[0]?.message?.content

    if (!responseContent) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      )
    }

    // Log the conversation if sessionId is provided
    if (sessionId) {
      try {
        // Log user message
        await prisma.chatLog.create({
          data: {
            sessionId,
            role: 'user',
            content: message,
            userAgent,
            ipAddress,
            referrer,
            companyDetected: companyContext?.name || null
          }
        })
        
        // Log assistant response
        await prisma.chatLog.create({
          data: {
            sessionId,
            role: 'assistant',
            content: responseContent,
            companyDetected: companyContext?.name || null
          }
        })
      } catch (logError) {
        console.error('Failed to log conversation:', logError)
        // Don't fail the response if logging fails
      }
    }

    return NextResponse.json({
      response: responseContent,
      companyContext
    })

  } catch (error) {
    console.error('Advocate chat error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
