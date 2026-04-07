import { NextResponse, NextRequest } from 'next/server'
import { defaultHeroContent, defaultCareerContent, defaultAboutContent } from '@/lib/default-content'

interface ResumeData {
  name: string
  title: string
  email: string
  phone: string
  linkedin: string
  summary: string
  philosophyQuote: string
  experience: {
    company: string
    role: string
    period: string
    location: string
    highlights: string[]
  }[]
  skills: { category: string; items: string[] }[]
  certifications: string[]
  education: {
    degree: string
    school: string
    year: string
  }[]
}

// Build resume data dynamically from the default content
function buildResumeData(): ResumeData {
  // Extract skills from about content, grouping by category
  const skillCategories = defaultAboutContent.skillCategories.map(cat => ({
    category: cat.title,
    items: cat.skills.map(s => s.name)
  }))

  // Build experience from career entries
  const experience = defaultCareerContent.entries.map(entry => ({
    company: entry.company,
    role: entry.role,
    period: entry.period,
    location: entry.location,
    highlights: entry.highlights.map(h => h.text)
  }))

  // Extract certifications from USAA entry
  const certifications: string[] = [
    'FINRA Series 7 (General Securities Representative)',
    'FINRA Series 66 (Uniform Combined State Law)',
    'Property & Casualty Insurance Licensed (All 50 States)'
  ]

  return {
    name: defaultHeroContent.name,
    title: defaultHeroContent.title,
    email: 'patrickdeanfox@gmail.com',
    phone: '(512) 555-0123',
    linkedin: 'linkedin.com/in/patrick-dean-fox/',
    summary: defaultCareerContent.summary,
    philosophyQuote: defaultHeroContent.philosophyQuote,
    experience,
    skills: skillCategories,
    certifications,
    education: [
      {
        degree: 'Professional Development',
        school: 'Various Certifications & Training',
        year: 'Ongoing'
      }
    ]
  }
}

function generateStandardHTML(data: ResumeData, tailored: boolean = false): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 32px 40px;
      max-width: 850px;
      margin: 0 auto;
      font-size: 11pt;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #2563EB;
      padding-bottom: 16px;
      margin-bottom: 18px;
    }
    .name {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      letter-spacing: -0.5px;
    }
    .title {
      font-size: 16px;
      color: #2563EB;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .contact {
      font-size: 11px;
      color: #64748b;
    }
    .contact a { color: #2563EB; text-decoration: none; }
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #2563EB;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }
    .summary {
      font-size: 11pt;
      color: #334155;
      line-height: 1.6;
    }
    .philosophy {
      background: linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%);
      border-left: 3px solid #2563EB;
      padding: 10px 14px;
      margin-bottom: 16px;
      font-style: italic;
      font-size: 10pt;
      color: #475569;
    }
    .two-column {
      display: flex;
      gap: 24px;
    }
    .left-column {
      flex: 2;
    }
    .right-column {
      flex: 1;
      padding-left: 16px;
      border-left: 1px solid #e2e8f0;
    }
    .job {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .company {
      font-weight: 700;
      font-size: 12pt;
      color: #0f172a;
    }
    .period {
      font-size: 10pt;
      color: #64748b;
      white-space: nowrap;
    }
    .role-location {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    .role {
      font-size: 11pt;
      color: #2563EB;
      font-weight: 500;
    }
    .location {
      font-size: 10pt;
      color: #94a3b8;
      font-style: italic;
    }
    .highlights {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    .highlights li {
      font-size: 10pt;
      color: #334155;
      padding-left: 14px;
      position: relative;
      margin-bottom: 3px;
      line-height: 1.4;
    }
    .highlights li::before {
      content: '▸';
      color: #2563EB;
      position: absolute;
      left: 0;
      font-size: 10px;
    }
    .skill-category {
      margin-bottom: 10px;
    }
    .skill-category-title {
      font-size: 10pt;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .skills-list {
      font-size: 9pt;
      color: #475569;
      line-height: 1.5;
    }
    .cert-item {
      font-size: 9pt;
      color: #334155;
      padding: 4px 0;
      border-bottom: 1px dotted #e2e8f0;
    }
    .cert-item:last-child {
      border-bottom: none;
    }
    ${tailored ? '.tailored-badge { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 9px; }' : ''}
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.name}</div>
    <div class="title">${data.title}</div>
    <div class="contact">
      ${data.email} &nbsp;|&nbsp; ${data.phone} &nbsp;|&nbsp; <a href="https://www.${data.linkedin}">${data.linkedin}</a>
    </div>
  </div>

  <div class="philosophy">
    "${data.philosophyQuote}" — I master whatever I invest my time in.
  </div>

  <div class="two-column">
    <div class="left-column">
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p class="summary">${data.summary}</p>
      </div>

      <div class="section">
        <div class="section-title">Professional Experience</div>
        ${data.experience.map(job => `
          <div class="job">
            <div class="job-header">
              <span class="company">${job.company}</span>
              <span class="period">${job.period}</span>
            </div>
            <div class="role-location">
              <span class="role">${job.role}</span>
              <span class="location">${job.location}</span>
            </div>
            <ul class="highlights">
              ${job.highlights.slice(0, 4).map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="right-column">
      <div class="section">
        <div class="section-title">Skills</div>
        ${data.skills.map(cat => `
          <div class="skill-category">
            <div class="skill-category-title">${cat.category}</div>
            <div class="skills-list">${cat.items.join(', ')}</div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <div class="section-title">Certifications</div>
        ${data.certifications.map(cert => `<div class="cert-item">${cert}</div>`).join('')}
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map(edu => `<div class="cert-item">${edu.degree}<br/><span style="font-size:8pt;color:#64748b;">${edu.school}</span></div>`).join('')}
      </div>
    </div>
  </div>
</body>
</html>
  `
}

function generateATSHTML(data: ResumeData): string {
  // ATS-optimized: Simple formatting, no tables, no columns, plain text-like
  // Uses standard fonts, simple bullets, no graphics, keyword-rich content
  const allSkills = data.skills.flatMap(cat => cat.items)
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.4;
      color: #000000;
      padding: 48px 56px;
      font-size: 11pt;
    }
    .header {
      margin-bottom: 16px;
      text-align: left;
    }
    .name {
      font-size: 16pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .title {
      font-size: 12pt;
      margin-bottom: 4px;
    }
    .contact {
      font-size: 10pt;
      margin-bottom: 12px;
    }
    .section {
      margin-bottom: 14px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 6px;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }
    .summary {
      margin-bottom: 12px;
      font-size: 10pt;
    }
    .job {
      margin-bottom: 10px;
    }
    .job-header {
      font-weight: bold;
      font-size: 10pt;
    }
    .job-company {
      font-size: 10pt;
    }
    ul {
      margin-left: 18px;
      margin-top: 4px;
    }
    li {
      margin-bottom: 2px;
      font-size: 10pt;
    }
    .skills-section {
      margin-bottom: 8px;
    }
    .skills-category {
      font-weight: bold;
      font-size: 10pt;
    }
    .skills-list {
      font-size: 10pt;
      margin-bottom: 6px;
    }
    .certs {
      font-size: 10pt;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.name}</div>
    <div class="title">${data.title}</div>
    <div class="contact">${data.email} | ${data.phone} | ${data.linkedin}</div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary">${data.summary}</p>
  </div>

  <div class="section">
    <div class="section-title">Core Competencies</div>
    <p class="skills-list">${allSkills.join(' • ')}</p>
  </div>

  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${data.experience.map(job => `
      <div class="job">
        <div class="job-header">${job.role}</div>
        <div class="job-company">${job.company} | ${job.location} | ${job.period}</div>
        <ul>
          ${job.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Skills & Technical Expertise</div>
    ${data.skills.map(cat => `
      <div class="skills-section">
        <span class="skills-category">${cat.category}:</span>
        <span class="skills-list">${cat.items.join(', ')}</span>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Certifications & Licenses</div>
    <div class="certs">
      ${data.certifications.map(cert => `<div>• ${cert}</div>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    ${data.education.map(edu => `<p class="certs">${edu.degree} - ${edu.school}</p>`).join('')}
  </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const { format } = await request.json()
    const isATS = format === 'ats'

    // Build resume data dynamically from the default content
    const resumeData: ResumeData = buildResumeData()

    // Generate HTML based on format
    const htmlContent = isATS 
      ? generateATSHTML(resumeData)
      : generateStandardHTML(resumeData, false)

    // Create PDF request
    const createResponse = await fetch('https://apps.abacus.ai/api/createConvertHtmlToPdfRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        html_content: htmlContent,
        pdf_options: {
          format: 'Letter',
          margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
          print_background: true
        }
      })
    })

    if (!createResponse.ok) {
      const error = await createResponse.json().catch(() => ({ error: 'Failed to create PDF request' }))
      return NextResponse.json({ success: false, error: error.error }, { status: 500 })
    }

    const { request_id } = await createResponse.json()
    if (!request_id) {
      return NextResponse.json({ success: false, error: 'No request ID returned' }, { status: 500 })
    }

    // Poll for completion
    const maxAttempts = 60
    let attempts = 0

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const statusResponse = await fetch('https://apps.abacus.ai/api/getConvertHtmlToPdfStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id, deployment_token: process.env.ABACUSAI_API_KEY })
      })

      const statusResult = await statusResponse.json()
      const status = statusResult?.status || 'FAILED'

      if (status === 'SUCCESS') {
        const pdfBuffer = Buffer.from(statusResult.result.result, 'base64')
        const filename = isATS ? 'Patrick_Fox_Resume_ATS.pdf' : 'Patrick_Fox_Resume.pdf'
        
        return new NextResponse(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`
          }
        })
      } else if (status === 'FAILED') {
        return NextResponse.json({ success: false, error: 'PDF generation failed' }, { status: 500 })
      }

      attempts++
    }

    return NextResponse.json({ success: false, error: 'PDF generation timed out' }, { status: 500 })
  } catch (error) {
    console.error('Error generating resume PDF:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate resume' }, { status: 500 })
  }
}
