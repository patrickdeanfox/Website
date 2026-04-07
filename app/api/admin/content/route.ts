import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getDefaultContentForSection } from '@/lib/default-content'

const SECTION_IDS = ['hero', 'about', 'career', 'ai']

// Deep merge function for nested objects and arrays
function deepMerge(defaults: any, overrides: any): any {
  if (overrides === undefined || overrides === null) {
    return defaults
  }
  
  if (Array.isArray(defaults)) {
    // For arrays, use override if it exists and has items, otherwise use default
    return Array.isArray(overrides) && overrides.length > 0 ? overrides : defaults
  }
  
  if (typeof defaults === 'object' && defaults !== null) {
    const result: any = { ...defaults }
    for (const key of Object.keys(overrides)) {
      if (key in defaults) {
        result[key] = deepMerge(defaults[key], overrides[key])
      } else {
        result[key] = overrides[key]
      }
    }
    return result
  }
  
  // For primitives, use override if it's not empty
  if (typeof overrides === 'string' && overrides === '') {
    return defaults
  }
  
  return overrides !== undefined ? overrides : defaults
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('section')
    
    if (sectionId) {
      // Get specific section
      const saved = await prisma.sectionContent.findUnique({
        where: { sectionId }
      })
      
      const defaults = getDefaultContentForSection(sectionId)
      const content = saved ? deepMerge(defaults, saved.content) : defaults
      
      return NextResponse.json({
        sectionId,
        content,
        hasOverrides: !!saved
      })
    }
    
    // Get all sections
    const savedSections = await prisma.sectionContent.findMany()
    const savedMap: Record<string, any> = {}
    savedSections.forEach((section) => {
      savedMap[section.sectionId] = section.content
    })
    
    const result = SECTION_IDS.map((id) => {
      const defaults = getDefaultContentForSection(id)
      const saved = savedMap[id]
      const content = saved ? deepMerge(defaults, saved) : defaults
      
      return {
        id,
        sectionId: id,
        content,
        hasOverrides: !!saved
      }
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sectionId, content } = await request.json()

    if (!sectionId) {
      return NextResponse.json(
        { error: 'Section ID is required' },
        { status: 400 }
      )
    }

    // Save content (can be complex nested objects)
    const section = await prisma.sectionContent.upsert({
      where: { sectionId },
      update: { content },
      create: { sectionId, content }
    })

    // Return merged content
    const defaults = getDefaultContentForSection(sectionId)
    const mergedContent = deepMerge(defaults, section.content)

    return NextResponse.json({
      sectionId,
      content: mergedContent,
      hasOverrides: true
    })
  } catch (error) {
    console.error('Failed to save content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('section')
    
    if (!sectionId) {
      return NextResponse.json(
        { error: 'Section ID is required' },
        { status: 400 }
      )
    }

    await prisma.sectionContent.delete({
      where: { sectionId }
    }).catch(() => null) // Ignore if doesn't exist
    
    const defaults = getDefaultContentForSection(sectionId)
    
    return NextResponse.json({
      sectionId,
      content: defaults,
      hasOverrides: false
    })
  } catch (error) {
    console.error('Failed to delete content:', error)
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    )
  }
}
