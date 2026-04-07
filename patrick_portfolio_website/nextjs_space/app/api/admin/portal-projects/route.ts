export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { portalProjects } from '@/lib/portal-projects-data'

// GET - Fetch all portal projects with their visibility settings and overrides
export async function GET() {
  try {
    const dbSettings = await prisma.portalProject.findMany()
    const settingsMap = new Map(dbSettings.map(s => [s.projectId, s]))
    
    const projectsWithSettings = portalProjects.map(project => {
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
        screenshots: dbSetting?.screenshots ?? project.defaultScreenshots,
        dbId: dbSetting?.id ?? null
      }
    })
    
    projectsWithSettings.sort((a, b) => a.displayOrder - b.displayOrder)
    return NextResponse.json(projectsWithSettings)
  } catch (error) {
    console.error('Error fetching portal projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST - Update project settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      projectId, isVisible, screenshots, displayOrder, initialSize,
      client, title, subtitle, icon, color, metrics,
      flagshipBadge, challenge, solution, technical, outcomes 
    } = body
    
    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 })
    }
    
    const project = await prisma.portalProject.upsert({
      where: { projectId },
      update: {
        ...(isVisible !== undefined && { isVisible }),
        ...(screenshots !== undefined && { screenshots }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(initialSize !== undefined && { initialSize }),
        ...(client !== undefined && { clientOverride: client }),
        ...(title !== undefined && { titleOverride: title }),
        ...(subtitle !== undefined && { subtitleOverride: subtitle }),
        ...(icon !== undefined && { iconOverride: icon }),
        ...(color !== undefined && { colorOverride: color }),
        ...(metrics !== undefined && { metricsOverride: metrics }),
        ...(flagshipBadge !== undefined && { flagshipBadge }),
        ...(challenge !== undefined && { challengeOverride: challenge }),
        ...(solution !== undefined && { solutionOverride: solution }),
        ...(technical !== undefined && { technicalOverride: technical }),
        ...(outcomes !== undefined && { outcomesOverride: outcomes })
      },
      create: {
        projectId,
        name: portalProjects.find(p => p.id === projectId)?.client ?? projectId,
        isVisible: isVisible ?? true,
        screenshots: screenshots ?? [],
        displayOrder: displayOrder ?? 0,
        initialSize: initialSize ?? 'full',
        clientOverride: client ?? null,
        titleOverride: title ?? null,
        subtitleOverride: subtitle ?? null,
        iconOverride: icon ?? null,
        colorOverride: color ?? null,
        metricsOverride: metrics ?? null,
        flagshipBadge: flagshipBadge ?? null,
        challengeOverride: challenge ?? null,
        solutionOverride: solution ?? null,
        technicalOverride: technical ?? null,
        outcomesOverride: outcomes ?? null
      }
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating portal project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}
