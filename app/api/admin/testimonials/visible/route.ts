import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET only visible testimonials for public display
export async function GET() {
  try {
    // Check if testimonials section is enabled
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'settings' }
    })

    if (settings && !settings.testimonialsEnabled) {
      return NextResponse.json({ enabled: false, testimonials: [] })
    }

    const testimonials = await prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: 'asc' }
    })
    return NextResponse.json({ enabled: true, testimonials })
  } catch (error) {
    console.error('Error fetching visible testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}
