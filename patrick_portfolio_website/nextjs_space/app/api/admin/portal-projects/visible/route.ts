export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { portalProjects } from '@/lib/portal-projects-data'

// GET - Fetch only visible portal projects (for public display)
export async function GET() {
  try {
    const dbSettings = await prisma.portalProject.findMany()
    const settingsMap = new Map(dbSettings.map(s => [s.projectId, s]))
    
    const visibleProjects = portalProjects
      .map(project => {
        const dbSetting = settingsMap.get(project.id)
        const metricsOverride = dbSetting?.metricsOverride as Array<{value: string; label: string}> | null
        const technicalOverride = dbSetting?.technicalOverride as Array<{area: string; icon: string; details: string}> | null
        const outcomesOverride = dbSetting?.outcomesOverride as Array<{text: string}> | null
        
        return {
          ...project,
          client: dbSetting?.clientOverride || project.client,
          title: dbSetting?.titleOverride || project.title,
          subtitle: dbSetting?.subtitleOverride || project.subtitle,
          icon: dbSetting?.iconOverride || project.icon,
          color: dbSetting?.colorOverride || project.color,
          metrics: metricsOverride || project.metrics,
          flagshipBadge: dbSetting?.flagshipBadge || project.flagshipBadge || '⭐ Featured Project',
          challenge: dbSetting?.challengeOverride || project.challenge,
          solution: dbSetting?.solutionOverride || project.solution,
          technical: technicalOverride || project.technical,
          outcomes: outcomesOverride || project.outcomes,
          isVisible: dbSetting?.isVisible ?? true,
          displayOrder: dbSetting?.displayOrder ?? project.displayOrder,
          initialSize: dbSetting?.initialSize ?? 'full',
          screenshots: dbSetting?.screenshots?.length ? dbSetting.screenshots : project.defaultScreenshots,
        }
      })
      .filter(project => project.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
    
    return NextResponse.json(visibleProjects)
  } catch (error) {
    console.error('Error fetching visible portal projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
