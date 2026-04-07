import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const sessionId = searchParams.get('sessionId')

    // If sessionId is provided, get all messages for that session
    if (sessionId) {
      const messages = await prisma.chatLog.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' }
      })
      return NextResponse.json({ messages })
    }

    // Get unique sessions with their first message and metadata
    const sessions = await prisma.$queryRaw`
      SELECT 
        "sessionId",
        MIN("createdAt") as "startedAt",
        MAX("createdAt") as "lastMessageAt",
        COUNT(*) as "messageCount",
        MAX("userAgent") as "userAgent",
        MAX("ipAddress") as "ipAddress",
        MAX("referrer") as "referrer",
        MAX("companyDetected") as "companyDetected"
      FROM "ChatLog"
      GROUP BY "sessionId"
      ORDER BY MAX("createdAt") DESC
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    ` as Array<{
      sessionId: string
      startedAt: Date
      lastMessageAt: Date
      messageCount: bigint
      userAgent: string | null
      ipAddress: string | null
      referrer: string | null
      companyDetected: string | null
    }>

    // Get total count of unique sessions
    const countResult = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT "sessionId") as count FROM "ChatLog"
    ` as Array<{ count: bigint }>

    const totalSessions = Number(countResult[0]?.count || 0)

    // Convert bigint to number for JSON serialization
    const serializedSessions = sessions.map(s => ({
      ...s,
      messageCount: Number(s.messageCount)
    }))

    return NextResponse.json({
      sessions: serializedSessions,
      pagination: {
        page,
        limit,
        total: totalSessions,
        pages: Math.ceil(totalSessions / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch chat logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat logs' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (sessionId) {
      // Delete specific session
      await prisma.chatLog.deleteMany({
        where: { sessionId }
      })
    } else {
      // Delete all logs
      await prisma.chatLog.deleteMany({})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete chat logs:', error)
    return NextResponse.json(
      { error: 'Failed to delete chat logs' },
      { status: 500 }
    )
  }
}
