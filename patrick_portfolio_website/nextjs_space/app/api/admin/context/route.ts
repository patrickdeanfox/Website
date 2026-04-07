import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const entries = await prisma.contextEntry.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Failed to fetch context:', error)
    return NextResponse.json(
      { error: 'Failed to fetch context' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, projectName, type, content } = await request.json()

    if (!projectId || !content || !type) {
      return NextResponse.json(
        { error: 'Project ID, type, and content are required' },
        { status: 400 }
      )
    }

    const entry = await prisma.contextEntry.create({
      data: {
        projectId,
        projectName: projectName || 'General',
        type,
        content
      }
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to create context:', error)
    return NextResponse.json(
      { error: 'Failed to create context' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    await prisma.contextEntry.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete context:', error)
    return NextResponse.json(
      { error: 'Failed to delete context' },
      { status: 500 }
    )
  }
}
