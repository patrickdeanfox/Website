'use client'

import { JobProvider } from '@/lib/job-context'
import { ContentProvider } from '@/lib/content-context'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      <JobProvider>
        {children}
      </JobProvider>
    </ContentProvider>
  )
}
