import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all code showcases
export async function GET() {
  try {
    const showcases = await prisma.codeShowcase.findMany({
      orderBy: { displayOrder: 'asc' }
    })
    return NextResponse.json(showcases)
  } catch (error) {
    console.error('Error fetching code showcases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch code showcases' },
      { status: 500 }
    )
  }
}

// POST create new code showcase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, language, code, fileName, category, isVisible, displayOrder } = body

    if (!title || !description || !language || !code) {
      return NextResponse.json(
        { error: 'Title, description, language, and code are required' },
        { status: 400 }
      )
    }

    const showcase = await prisma.codeShowcase.create({
      data: {
        title,
        description,
        language,
        code,
        fileName: fileName || null,
        category: category || 'general',
        isVisible: isVisible ?? true,
        displayOrder: displayOrder ?? 0
      }
    })

    return NextResponse.json(showcase)
  } catch (error) {
    console.error('Error creating code showcase:', error)
    return NextResponse.json(
      { error: 'Failed to create code showcase' },
      { status: 500 }
    )
  }
}

// PUT update code showcase
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, language, code, fileName, category, isVisible, displayOrder } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const showcase = await prisma.codeShowcase.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(language !== undefined && { language }),
        ...(code !== undefined && { code }),
        ...(fileName !== undefined && { fileName }),
        ...(category !== undefined && { category }),
        ...(isVisible !== undefined && { isVisible }),
        ...(displayOrder !== undefined && { displayOrder })
      }
    })

    return NextResponse.json(showcase)
  } catch (error) {
    console.error('Error updating code showcase:', error)
    return NextResponse.json(
      { error: 'Failed to update code showcase' },
      { status: 500 }
    )
  }
}

// DELETE code showcase
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

    await prisma.codeShowcase.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting code showcase:', error)
    return NextResponse.json(
      { error: 'Failed to delete code showcase' },
      { status: 500 }
    )
  }
}
