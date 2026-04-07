import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST reorder testimonials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body // Array of { id, displayOrder }

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      )
    }

    // Update all items in a transaction
    await prisma.$transaction(
      items.map(item =>
        prisma.testimonial.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to reorder testimonials' },
      { status: 500 }
    )
  }
}
