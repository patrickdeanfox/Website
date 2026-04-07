import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: 'asc' }
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, company, linkedinUrl, imageUrl, content, relationship, isVisible, displayOrder } = body

    if (!name || !title || !company || !content) {
      return NextResponse.json(
        { error: 'Name, title, company, and content are required' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        title,
        company,
        linkedinUrl: linkedinUrl || null,
        imageUrl: imageUrl || null,
        content,
        relationship: relationship || null,
        isVisible: isVisible ?? true,
        displayOrder: displayOrder ?? 0
      }
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

// PUT update testimonial
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, title, company, linkedinUrl, imageUrl, content, relationship, isVisible, displayOrder } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(company !== undefined && { company }),
        ...(linkedinUrl !== undefined && { linkedinUrl }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(content !== undefined && { content }),
        ...(relationship !== undefined && { relationship }),
        ...(isVisible !== undefined && { isVisible }),
        ...(displayOrder !== undefined && { displayOrder })
      }
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

// DELETE testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    await prisma.testimonial.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
