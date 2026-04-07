export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getFileUrl } from '@/lib/s3'

export async function POST(request: NextRequest) {
  try {
    const { cloud_storage_path, isPublic } = await request.json()
    
    if (!cloud_storage_path) {
      return NextResponse.json(
        { error: 'cloud_storage_path is required' },
        { status: 400 }
      )
    }
    
    const url = await getFileUrl(cloud_storage_path, isPublic ?? true)
    
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error getting file URL:', error)
    return NextResponse.json(
      { error: 'Failed to get file URL' },
      { status: 500 }
    )
  }
}
