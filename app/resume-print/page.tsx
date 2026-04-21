'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  buildResumeData,
  generateStandardResumeHTML,
  generateATSResumeHTML,
} from '@/lib/resume-html'

export default function ResumePrintPage() {
  const searchParams = useSearchParams()
  const format = searchParams?.get('format') === 'ats' ? 'ats' : 'standard'
  const [hasPrinted, setHasPrinted] = useState(false)

  const html = useMemo(() => {
    const data = buildResumeData()
    return format === 'ats' ? generateATSResumeHTML(data) : generateStandardResumeHTML(data)
  }, [format])

  useEffect(() => {
    const title = format === 'ats' ? 'Patrick_Fox_Resume_ATS' : 'Patrick_Fox_Resume'
    document.title = title
    const timer = setTimeout(() => {
      window.print()
      setHasPrinted(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [format])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body { background: #ffffff !important; color: #1a1a1a !important; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .print-toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: center; gap: 12px; padding: 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
            .print-toolbar button, .print-toolbar a {
              padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 14px;
              border: 1px solid #2563EB; color: #2563EB; background: #ffffff; cursor: pointer;
              text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
            }
            .print-toolbar button.primary { background: #2563EB; color: #ffffff; }
            .print-toolbar .hint { font-size: 12px; color: #64748b; align-self: center; }
            @media print {
              .print-toolbar { display: none !important; }
              html, body { margin: 0; padding: 0; }
              @page { size: Letter; margin: 0.5in; }
            }
          `,
        }}
      />
      <div className="print-toolbar">
        <button type="button" className="primary" onClick={() => window.print()}>
          {hasPrinted ? 'Print / Save as PDF again' : 'Print / Save as PDF'}
        </button>
        <span className="hint">
          In the print dialog, choose <strong>Save as PDF</strong> as the destination.
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
