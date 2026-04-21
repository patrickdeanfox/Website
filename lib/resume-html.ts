import {
  defaultHeroContent,
  defaultCareerContent,
  defaultAboutContent,
} from '@/lib/default-content'

export interface ResumeData {
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
  education: { degree: string; school: string; year: string }[]
}

export function buildResumeData(): ResumeData {
  const skillCategories = defaultAboutContent.skillCategories.map((cat) => ({
    category: cat.title,
    items: cat.skills.map((s) => s.name),
  }))

  const experience = defaultCareerContent.entries.map((entry) => ({
    company: entry.company,
    role: entry.role,
    period: entry.period,
    location: entry.location,
    highlights: entry.highlights.map((h) => h.text),
  }))

  const certifications: string[] = [
    'FINRA Series 7 (General Securities Representative)',
    'FINRA Series 66 (Uniform Combined State Law)',
    'Property & Casualty Insurance Licensed (All 50 States)',
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
      { degree: 'Professional Development', school: 'Various Certifications & Training', year: 'Ongoing' },
    ],
  }
}

export function generateStandardResumeHTML(data: ResumeData): string {
  return `
<style>
  .resume-root * { margin: 0; padding: 0; box-sizing: border-box; }
  .resume-root {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.5;
    color: #1a1a1a;
    background: #ffffff;
    padding: 32px 40px;
    max-width: 850px;
    margin: 0 auto;
    font-size: 11pt;
  }
  .resume-root .header { text-align: center; border-bottom: 3px solid #2563EB; padding-bottom: 16px; margin-bottom: 18px; }
  .resume-root .name { font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.5px; }
  .resume-root .title { font-size: 16px; color: #2563EB; font-weight: 600; margin-bottom: 8px; }
  .resume-root .contact { font-size: 11px; color: #64748b; }
  .resume-root .contact a { color: #2563EB; text-decoration: none; }
  .resume-root .section { margin-bottom: 16px; }
  .resume-root .section-title { font-size: 13px; font-weight: 700; color: #2563EB; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 10px; }
  .resume-root .summary { font-size: 11pt; color: #334155; line-height: 1.6; }
  .resume-root .philosophy { background: linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%); border-left: 3px solid #2563EB; padding: 10px 14px; margin-bottom: 16px; font-style: italic; font-size: 10pt; color: #475569; }
  .resume-root .two-column { display: flex; gap: 24px; }
  .resume-root .left-column { flex: 2; }
  .resume-root .right-column { flex: 1; padding-left: 16px; border-left: 1px solid #e2e8f0; }
  .resume-root .job { margin-bottom: 14px; page-break-inside: avoid; }
  .resume-root .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .resume-root .company { font-weight: 700; font-size: 12pt; color: #0f172a; }
  .resume-root .period { font-size: 10pt; color: #64748b; white-space: nowrap; }
  .resume-root .role-location { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
  .resume-root .role { font-size: 11pt; color: #2563EB; font-weight: 500; }
  .resume-root .location { font-size: 10pt; color: #94a3b8; font-style: italic; }
  .resume-root .highlights { list-style: none; padding-left: 0; margin: 0; }
  .resume-root .highlights li { font-size: 10pt; color: #334155; padding-left: 14px; position: relative; margin-bottom: 3px; line-height: 1.4; }
  .resume-root .highlights li::before { content: '▸'; color: #2563EB; position: absolute; left: 0; font-size: 10px; }
  .resume-root .skill-category { margin-bottom: 10px; }
  .resume-root .skill-category-title { font-size: 10pt; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
  .resume-root .skills-list { font-size: 9pt; color: #475569; line-height: 1.5; }
  .resume-root .cert-item { font-size: 9pt; color: #334155; padding: 4px 0; border-bottom: 1px dotted #e2e8f0; }
  .resume-root .cert-item:last-child { border-bottom: none; }
</style>
<div class="resume-root">
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
        ${data.experience.map((job) => `
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
              ${job.highlights.slice(0, 4).map((h) => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="right-column">
      <div class="section">
        <div class="section-title">Skills</div>
        ${data.skills.map((cat) => `
          <div class="skill-category">
            <div class="skill-category-title">${cat.category}</div>
            <div class="skills-list">${cat.items.join(', ')}</div>
          </div>
        `).join('')}
      </div>
      <div class="section">
        <div class="section-title">Certifications</div>
        ${data.certifications.map((cert) => `<div class="cert-item">${cert}</div>`).join('')}
      </div>
      <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map((edu) => `<div class="cert-item">${edu.degree}<br/><span style="font-size:8pt;color:#64748b;">${edu.school}</span></div>`).join('')}
      </div>
    </div>
  </div>
</div>`
}

export function generateATSResumeHTML(data: ResumeData): string {
  const allSkills = data.skills.flatMap((cat) => cat.items)
  return `
<style>
  .resume-root * { margin: 0; padding: 0; box-sizing: border-box; }
  .resume-root {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    color: #000000;
    background: #ffffff;
    padding: 48px 56px;
    font-size: 11pt;
    max-width: 850px;
    margin: 0 auto;
  }
  .resume-root .header { margin-bottom: 16px; text-align: left; }
  .resume-root .name { font-size: 16pt; font-weight: bold; margin-bottom: 4px; }
  .resume-root .title { font-size: 12pt; margin-bottom: 4px; }
  .resume-root .contact { font-size: 10pt; margin-bottom: 12px; }
  .resume-root .section { margin-bottom: 14px; }
  .resume-root .section-title { font-size: 11pt; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid #000; padding-bottom: 2px; }
  .resume-root .summary { margin-bottom: 12px; font-size: 10pt; }
  .resume-root .job { margin-bottom: 10px; }
  .resume-root .job-header { font-weight: bold; font-size: 10pt; }
  .resume-root .job-company { font-size: 10pt; }
  .resume-root ul { margin-left: 18px; margin-top: 4px; }
  .resume-root li { margin-bottom: 2px; font-size: 10pt; }
  .resume-root .skills-section { margin-bottom: 8px; }
  .resume-root .skills-category { font-weight: bold; font-size: 10pt; }
  .resume-root .skills-list { font-size: 10pt; margin-bottom: 6px; }
  .resume-root .certs { font-size: 10pt; }
</style>
<div class="resume-root">
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
    ${data.experience.map((job) => `
      <div class="job">
        <div class="job-header">${job.role}</div>
        <div class="job-company">${job.company} | ${job.location} | ${job.period}</div>
        <ul>
          ${job.highlights.map((h) => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>
  <div class="section">
    <div class="section-title">Skills & Technical Expertise</div>
    ${data.skills.map((cat) => `
      <div class="skills-section">
        <span class="skills-category">${cat.category}:</span>
        <span class="skills-list">${cat.items.join(', ')}</span>
      </div>
    `).join('')}
  </div>
  <div class="section">
    <div class="section-title">Certifications & Licenses</div>
    <div class="certs">
      ${data.certifications.map((cert) => `<div>• ${cert}</div>`).join('')}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Education</div>
    ${data.education.map((edu) => `<p class="certs">${edu.degree} - ${edu.school}</p>`).join('')}
  </div>
</div>`
}
