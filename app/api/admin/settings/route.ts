import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'settings' }
    })

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: 'settings' }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Helper to handle JSON null values
    const getJsonValue = (value: any) => {
      if (value === null || value === undefined) return Prisma.DbNull
      return value
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'settings' },
      update: {
        ...(data.advocateChatEnabled !== undefined && { advocateChatEnabled: data.advocateChatEnabled }),
        ...(data.testimonialsEnabled !== undefined && { testimonialsEnabled: data.testimonialsEnabled }),
        ...(data.jobTailorActive !== undefined && { jobTailorActive: data.jobTailorActive }),
        ...(data.jobTailorExpiry !== undefined && { jobTailorExpiry: data.jobTailorExpiry ? new Date(data.jobTailorExpiry) : null }),
        ...(data.jobTailorData !== undefined && { jobTailorData: getJsonValue(data.jobTailorData) }),
        ...(data.jobTailorDefaults !== undefined && { jobTailorDefaults: getJsonValue(data.jobTailorDefaults) })
      },
      create: {
        id: 'settings',
        advocateChatEnabled: data.advocateChatEnabled ?? true,
        testimonialsEnabled: data.testimonialsEnabled ?? true,
        jobTailorActive: data.jobTailorActive ?? false,
        jobTailorExpiry: data.jobTailorExpiry ? new Date(data.jobTailorExpiry) : null,
        jobTailorData: getJsonValue(data.jobTailorData),
        jobTailorDefaults: getJsonValue(data.jobTailorDefaults)
      }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
