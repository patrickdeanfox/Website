import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getDefaultContentForSection } from '@/lib/default-content'

// Deep merge function for nested objects and arrays
function deepMerge(defaults: any, overrides: any): any {
  if (overrides === undefined || overrides === null) {
    return defaults
  }
  
  if (Array.isArray(defaults)) {
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
  
  if (typeof overrides === 'string' && overrides === '') {
    return defaults
  }
  
  return overrides !== undefined ? overrides : defaults
}

// Public API to fetch content for frontend components
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('section')
    
    if (!sectionId) {
      return NextResponse.json(
        { error: 'Section ID is required' },
        { status: 400 }
      )
    }
    
    const saved = await prisma.sectionContent.findUnique({
      where: { sectionId }
    })
    
    const defaults = getDefaultContentForSection(sectionId)
    const content = saved ? deepMerge(defaults, saved.content) : defaults
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Failed to fetch content:', error)
    // Return defaults on error
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('section')
    const defaults = getDefaultContentForSection(sectionId || '')
    return NextResponse.json(defaults)
  }
}
