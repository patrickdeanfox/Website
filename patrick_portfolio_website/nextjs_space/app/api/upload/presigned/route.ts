export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { generatePresignedUploadUrl } from '@/lib/s3'

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType, isPublic } = await request.json()
    
    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName and contentType are required' },
        { status: 400 }
      )
    }
    
    const result = await generatePresignedUploadUrl(fileName, contentType, isPublic ?? true)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}
