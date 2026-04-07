import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET only visible code showcases for public display
export async function GET() {
  try {
    const showcases = await prisma.codeShowcase.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: 'asc' }
    })
    return NextResponse.json(showcases)
  } catch (error) {
    console.error('Error fetching visible code showcases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch code showcases' },
      { status: 500 }
    )
  }
}
