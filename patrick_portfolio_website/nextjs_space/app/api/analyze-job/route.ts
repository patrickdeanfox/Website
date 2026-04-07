import { NextRequest, NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/portfolio-data'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    // Create a comprehensive prompt for the LLM
    const portfolioSummary = portfolioItems.map(item => 
      `ID: ${item.id}\nType: ${item.type}\nCategory: ${item.category}\nTitle: ${item.title}\nDescription: ${item.description}\nKeywords: ${item.keywords.join(', ')}`
    ).join('\n\n')

    const systemPrompt = `You are an expert career coach and recruiter. Your job is to analyze a job description and map it to a candidate's portfolio of experience and skills.

The candidate is Patrick Fox, an Analytics Implementation Manager with 13+ years of experience. Here is his portfolio of experience, skills, and achievements:

${portfolioSummary}

Analyze the provided job description and create relevance mappings showing how each portfolio item relates to the job requirements.

Respond in JSON format with the following structure:
{
  "companyName": "Company name from the job description",
  "jobTitle": "Job title from the description",
  "industry": "Industry/sector",
  "keyRequirements": ["List of 5-7 key requirements from the job"],
  "desiredSkills": ["List of 5-10 desired skills mentioned"],
  "summary": "A 2-3 sentence summary of how Patrick is a strong fit for this role",
  "topStrengths": ["Top 3 strengths Patrick brings to this specific role"],
  "relevanceMappings": [
    {
      "itemId": "The exact ID from the portfolio item",
      "relevanceScore": 85,
      "explanation": "A specific 1-2 sentence explanation of how this experience/skill directly relates to the job requirements. Be specific about which job requirement it addresses.",
      "keywords": ["matching", "keywords", "from", "job"]
    }
  ]
}

IMPORTANT:
- Only include portfolio items that have relevance score >= 50
- Be specific in explanations - reference actual job requirements
- relevanceScore should be 0-100 based on how directly the item addresses job needs
- Focus on the most impactful connections
- Keep explanations concise but specific

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please analyze this job description and create relevance mappings:\n\n${jobDescription}` }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LLM API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to analyze job description' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from analysis' },
        { status: 500 }
      )
    }

    try {
      const analysis = JSON.parse(content)
      return NextResponse.json(analysis)
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content)
      return NextResponse.json(
        { error: 'Failed to parse analysis results' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'An error occurred during analysis' },
      { status: 500 }
    )
  }
}
