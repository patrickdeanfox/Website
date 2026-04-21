import { NextRequest, NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/portfolio-data'
import { portalProjects } from '@/lib/portal-projects-data'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'
import type Anthropic from '@anthropic-ai/sdk'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    const portfolioContext = portfolioItems.map((item) =>
      `${item.title}: ${item.description}`
    ).join('\n')

    const projectsContext = portalProjects.map((p) =>
      `Project: ${p.client}\nIndustry: ${p.industry}\nTitle: ${p.title}\nChallenge: ${p.challenge}\nSolution: ${p.solution}\nTechnical: ${p.technical.map((t) => `${t.area}: ${t.details}`).join('; ')}\nOutcomes: ${p.outcomes.map((o) => o.text).join('; ')}`
    ).join('\n\n---\n\n')

    const systemPrompt = `You are Patrick Fox's personal portfolio content assistant. Your job is to help Patrick:

1. **Discuss projects** - Ask probing questions to uncover valuable details worth highlighting
2. **Extract content** - Identify key achievements, skills, and outcomes from conversations
3. **Refine descriptions** - Help improve how experiences are presented
4. **Generate content** - Create polished descriptions for portfolio sections

CURRENT PORTFOLIO CONTEXT:

Skills & Experience:
${portfolioContext}

Projects:
${projectsContext}

WHEN DISCUSSING PROJECTS:
- Ask about specific challenges faced
- Probe for quantifiable outcomes (metrics, savings, time improvements)
- Identify unique technical solutions or innovations
- Look for transferable skills that apply broadly
- Find stories that demonstrate problem-solving ability

WHEN EXTRACTING CONTENT:
If you identify valuable information that could be added to the portfolio, format it in your response AND include an extractedData array in your JSON response with objects like:
{
  "type": "experience" | "skill" | "project_detail" | "outcome",
  "data": { /* relevant structured data */ }
}

KEEP RESPONSES:
- Conversational and encouraging
- Focused on extracting valuable details
- Practical and actionable
- Concise but thorough

You're helping Patrick build the most compelling portfolio possible. Be an engaged collaborator who asks good follow-up questions.`

    const chatMessages: Anthropic.MessageParam[] = []

    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((msg: ChatMessage) => {
        chatMessages.push({ role: msg.role, content: msg.content })
      })
    }

    chatMessages.push({ role: 'user', content: message })

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: [
        {
          type: 'text',
          text: systemPrompt,
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

    let extractedData = null
    try {
      const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[1])
      }
    } catch (e) {
      // No structured data — fine
    }

    return NextResponse.json({
      response: responseContent.replace(/```json\n[\s\S]*?\n```/g, '').trim(),
      extractedData,
    })
  } catch (error) {
    console.error('Admin chat error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
