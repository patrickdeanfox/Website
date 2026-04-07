import { NextRequest, NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/portfolio-data'
import { portalProjects } from '@/lib/portal-projects-data'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // Build portfolio context
    const portfolioContext = portfolioItems.map(item =>
      `${item.title}: ${item.description}`
    ).join('\n')

    const projectsContext = portalProjects.map(p =>
      `Project: ${p.client}\nIndustry: ${p.industry}\nTitle: ${p.title}\nChallenge: ${p.challenge}\nSolution: ${p.solution}\nTechnical: ${p.technical.map(t => `${t.area}: ${t.details}`).join('; ')}\nOutcomes: ${p.outcomes.map(o => o.text).join('; ')}`
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

    // Build messages array
    const chatMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ]

    // Add conversation history (last 10 messages)
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((msg: ChatMessage) => {
        chatMessages.push({ role: msg.role, content: msg.content })
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
        max_tokens: 1500,
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

    // Try to extract any structured data from the response
    let extractedData = null
    try {
      // Look for JSON blocks in the response
      const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[1])
      }
    } catch (e) {
      // No structured data found, that's fine
    }

    return NextResponse.json({
      response: responseContent.replace(/```json\n[\s\S]*?\n```/g, '').trim(),
      extractedData
    })

  } catch (error) {
    console.error('Admin chat error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
