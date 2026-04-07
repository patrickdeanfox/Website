import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

// Public endpoint to check if advocate chat is enabled
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'settings' },
      select: {
        advocateChatEnabled: true
      }
    })

    // Also check if job tailor has expired and auto-revert if needed
    const fullSettings = await prisma.siteSettings.findUnique({
      where: { id: 'settings' }
    })

    if (fullSettings?.jobTailorActive && fullSettings.jobTailorExpiry) {
      if (new Date(fullSettings.jobTailorExpiry) < new Date()) {
        // Auto-revert: expiry has passed
        await prisma.siteSettings.update({
          where: { id: 'settings' },
          data: {
            jobTailorActive: false,
            jobTailorExpiry: null,
            jobTailorData: Prisma.DbNull
          }
        })
      }
    }

    return NextResponse.json({
      advocateChatEnabled: settings?.advocateChatEnabled ?? true
    })
  } catch (error) {
    console.error('Failed to fetch public settings:', error)
    return NextResponse.json(
      { advocateChatEnabled: true },
      { status: 200 }
    )
  }
}
