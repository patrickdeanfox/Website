// Portal Projects Data - sorted by impressiveness/impact
// Order: PE Demo (LLM pioneer) > Wrights Media (6-figure ROI) > Compass/Ignite (enterprise scale) > Acadia (ThoughtSpot+AI) > Positive Insights (acquisition) > FLIK (vertical)

import { Database, Code2, Server, BarChart3, Cpu, Zap, Users, LineChart, TrendingUp, Target, Building2, Sparkles } from 'lucide-react'

export interface PortalProject {
  id: string
  client: string
  industry: string
  title: string
  subtitle: string
  icon: string
  color: string
  borderColor: string
  projectItemId: string
  metrics: Array<{
    value: string
    label: string
    itemId: string | null
  }>
  challenge: string
  solution: string
  technical: Array<{
    area: string
    icon: string
    details: string
    itemId: string | null
  }>
  outcomes: Array<{
    text: string
    itemId: string | null
  }>
  defaultScreenshots: string[]
  displayOrder: number
  isFlagship?: boolean
  flagshipBadge?: string
}

export const portalProjects: PortalProject[] = [
  {
    id: 'pe-demo',
    client: 'Private Equity Intelligence Platform',
    industry: 'Private Equity / AI Innovation',
    title: 'AI-Powered Portfolio Analytics',
    subtitle: 'First Local LLM Integration in Portal',
    icon: 'Cpu',
    color: 'from-violet-500 to-slate-900',
    borderColor: 'border-violet-500/30',
    projectItemId: 'project-pe-demo',
    isFlagship: true,
    flagshipBadge: '🚀 Innovation Pioneer',
    metrics: [
      { value: '7', label: 'Dashboard Pages', itemId: 'zuar-pages' },
      { value: '5', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: 'First', label: 'Local LLM Integration', itemId: 'ai-llm-integration' },
      { value: 'New', label: 'Product Feature', itemId: null }
    ],
    challenge: "Private equity firms needed a way to quickly analyze portfolio company performance across dozens of metrics. Traditional dashboards required users to know exactly what they were looking for. Leadership wanted an intuitive way for non-technical partners to query complex financial data.",
    solution: "I pioneered what became Portal's AI chat feature by installing Ollama with Mistral 3 directly on the Portal Docker container. Built an MCP-like architecture where the LLM could understand natural language queries and translate them into the appropriate dashboard filters and visualizations. Partners could ask questions like 'Show me EBITDA trends for our healthcare portfolio companies' and get instant results.",
    technical: [
      {
        area: 'Local LLM Integration',
        icon: 'Cpu',
        details: 'Installed Ollama on Portal\'s Docker container, configured Mistral 3 model for on-premise inference. Built API endpoints for chat-based queries with context awareness and conversation memory.',
        itemId: 'ai-llm-integration'
      },
      {
        area: 'MCP-Style Architecture',
        icon: 'Code2',
        details: 'Developed a protocol where the LLM could understand available data, generate appropriate SQL queries, and surface results through existing visualization components. Created tool-calling patterns for dashboard interaction.',
        itemId: 'ai-workflow-automation'
      },
      {
        area: 'Portfolio Analytics',
        icon: 'BarChart3',
        details: 'Built dashboards for EBITDA, cost savings, action tracking, and KPI monitoring. Each dashboard supports natural language filtering through the AI layer.',
        itemId: 'zuar-bi'
      }
    ],
    outcomes: [
      { text: 'Pet project that became a formal development initiative within Zuar', itemId: null },
      { text: 'Architecture later productized as Portal\'s Claude chat feature', itemId: 'ai-llm-integration' },
      { text: 'Helped win new enterprise logos seeking AI-powered analytics', itemId: 'zuar-portals' },
      { text: 'Demonstrated viability of local LLM integration for sensitive financial data', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 1
  },
  {
    id: 'wrights-media',
    client: 'Media Publisher Analytics',
    industry: 'Media & Publishing',
    title: 'Enterprise BI Replacement Platform',
    subtitle: '6-Figure Annual Salesforce Savings',
    icon: 'TrendingUp',
    color: 'from-emerald-500 to-slate-900',
    borderColor: 'border-emerald-500/30',
    projectItemId: 'project-wrights-media',
    isFlagship: true,
    flagshipBadge: '💰 6-Figure ROI',
    metrics: [
      { value: '18', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '26', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '2yr', label: 'Engagement', itemId: null },
      { value: '6-Fig', label: 'Annual Savings', itemId: 'zuar-roi' }
    ],
    challenge: "A major media publishing company was spending six figures annually on Salesforce analytics licensing. They needed robust reporting on licensing revenue, royalty tracking, and brand performance—but the cost of their existing BI solution was unsustainable.",
    solution: "Over a 2-year engagement, I built a comprehensive analytics platform that consolidated 26 different data sources into a unified view. The enhanced analytics and visualization capabilities gave leadership confidence to migrate away from Salesforce BI entirely, resulting in six-figure annual savings.",
    technical: [
      {
        area: 'Data Consolidation',
        icon: 'Database',
        details: 'Integrated 26 disparate data sources including licensing databases, royalty systems, brand performance APIs, and financial systems. Built automated ETL pipelines with daily refresh cycles.',
        itemId: 'zuar-etl'
      },
      {
        area: 'Advanced Analytics',
        icon: 'BarChart3',
        details: 'Created sophisticated royalty tracking dashboards, brand performance scorecards, and licensing revenue forecasting. Delivered insights that weren\'t possible in their previous system.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Migration Strategy',
        icon: 'Server',
        details: 'Developed a phased migration plan that allowed parallel running of both systems. Ensured feature parity before recommending full transition, building client confidence.',
        itemId: 'zuar-frontend'
      }
    ],
    outcomes: [
      { text: 'Eliminated 6-figure annual Salesforce BI licensing costs', itemId: 'zuar-roi' },
      { text: 'Consolidated 26 data sources into unified analytics platform', itemId: 'zuar-datasources' },
      { text: 'Client gained confidence to leave Salesforce ecosystem entirely', itemId: null },
      { text: 'Enhanced analytics capabilities delivered insights not previously possible', itemId: 'zuar-bi' }
    ],
    defaultScreenshots: [],
    displayOrder: 2
  },
  {
    id: 'compass-ignite',
    client: 'Enterprise Food Services Platform',
    industry: 'Enterprise Food Services',
    title: 'Multi-BI Embedded Analytics Hub',
    subtitle: 'Tableau + Power BI + 30 User Groups',
    icon: 'Building2',
    color: 'from-blue-500 to-slate-900',
    borderColor: 'border-blue-500/30',
    projectItemId: 'project-compass-ignite',
    metrics: [
      { value: '67', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '18', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '30+', label: 'User Groups', itemId: 'zuar-sso' },
      { value: '2', label: 'BI Platforms', itemId: 'zuar-bi' }
    ],
    challenge: "This enterprise food services company had analytics spread across Tableau and Power BI with no unified way for different user groups to access their relevant dashboards. IT spent significant time managing access permissions across 30+ distinct user groups.",
    solution: "Built a unified analytics hub that embedded both Tableau and Power BI dashboards within a single portal experience. Custom JavaScript modules enabled advanced features like commenting, approval workflows, and cross-platform filtering. Each of the 30+ user groups sees only their relevant content.",
    technical: [
      {
        area: 'Multi-BI Embedding',
        icon: 'BarChart3',
        details: 'Implemented seamless embedding of both Tableau and Power BI dashboards. Built abstraction layer to provide consistent user experience regardless of underlying BI platform.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Custom JS Modules',
        icon: 'Code2',
        details: 'Developed commenting system, approval workflows, and custom filtering controls. Users can collaborate on insights and get sign-offs without leaving the portal.',
        itemId: 'zuar-frontend'
      },
      {
        area: 'Enterprise SSO',
        icon: 'Server',
        details: 'Complex SSO integration with 30+ user groups mapped to granular permissions. Each group sees only their relevant dashboards and data based on role and department.',
        itemId: 'zuar-sso'
      }
    ],
    outcomes: [
      { text: 'Unified Tableau and Power BI into single user experience', itemId: 'zuar-bi' },
      { text: 'Automated access control for 30+ distinct user groups', itemId: 'zuar-sso' },
      { text: 'Added collaboration features with commenting and approvals', itemId: null },
      { text: 'Reduced IT burden of managing multiple BI platform permissions', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 3
  },
  {
    id: 'acadia',
    client: 'AI-Enhanced Analytics Platform',
    industry: 'Analytics / SaaS',
    title: 'ThoughtSpot + AI Chatbot Portal',
    subtitle: 'Ask Acadia Deployed Across 15+ Instances',
    icon: 'Sparkles',
    color: 'from-amber-500 to-slate-900',
    borderColor: 'border-amber-500/30',
    projectItemId: 'project-acadia',
    metrics: [
      { value: '95', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '8', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '15+', label: 'Client Instances', itemId: 'zuar-portals' },
      { value: 'AI', label: 'Chat Feature', itemId: 'ai-llm-integration' }
    ],
    challenge: "Acadia needed to scale their analytics offering across multiple client instances while maintaining consistency and adding modern AI capabilities. Each client wanted their own branded portal with natural language query support.",
    solution: "Built a template-based portal architecture using ThoughtSpot for natural language search. Deployed 'Ask Acadia' AI chatbot across all instances, enabling users to query data conversationally. The architecture allows rapid spin-up of new client instances with consistent features.",
    technical: [
      {
        area: 'ThoughtSpot Integration',
        icon: 'BarChart3',
        details: 'Deep integration with ThoughtSpot for natural language search. Users can type questions and get instant visualizations without knowing the underlying data structure.',
        itemId: 'zuar-bi'
      },
      {
        area: 'AI Chatbot',
        icon: 'Cpu',
        details: 'Deployed "Ask Acadia" conversational interface powered by LLM. Handles complex analytical questions and guides users through data exploration.',
        itemId: 'ai-llm-integration'
      },
      {
        area: 'Multi-Tenant Architecture',
        icon: 'Server',
        details: 'Template-based deployment enabling rapid provisioning of new client instances. Each client gets branded experience with isolated data while sharing core infrastructure.',
        itemId: 'zuar-portals'
      }
    ],
    outcomes: [
      { text: 'Scaled to 15+ client instances with consistent AI features', itemId: 'zuar-portals' },
      { text: 'Ask Acadia chatbot handles thousands of user queries monthly', itemId: 'ai-llm-integration' },
      { text: 'ThoughtSpot integration enables truly self-service analytics', itemId: 'zuar-bi' },
      { text: 'Template architecture reduces new client onboarding from weeks to days', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 4
  },
  {
    id: 'positive-insights',
    client: 'Tax Services Analytics',
    industry: 'Financial Services / Tax',
    title: 'Tableau Replacement Success Story',
    subtitle: 'Analytics Platform That Drove Acquisition',
    icon: 'Target',
    color: 'from-rose-500 to-slate-900',
    borderColor: 'border-rose-500/30',
    projectItemId: 'project-positive-insights',
    metrics: [
      { value: '40', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '5', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '100%', label: 'Tableau Replace', itemId: 'zuar-bi' },
      { value: 'Acquired', label: 'Business Outcome', itemId: null }
    ],
    challenge: "A growing tax services firm was outgrowing their Tableau implementation. They needed a more cost-effective, scalable solution that could handle their expanding client base and increasing data complexity.",
    solution: "Executed a complete Tableau rip-and-replace, migrating all existing dashboards to Portal while enhancing capabilities. The modernized analytics platform became a key asset in the company's growth story, contributing to their acquisition by Priority Tax Relief.",
    technical: [
      {
        area: 'Migration Planning',
        icon: 'Database',
        details: 'Audited existing Tableau workbooks, identified optimization opportunities, and built migration roadmap. Ensured zero data loss and feature parity during transition.',
        itemId: 'zuar-etl'
      },
      {
        area: 'Dashboard Modernization',
        icon: 'BarChart3',
        details: 'Rebuilt dashboards with improved visualizations and faster load times. Added new capabilities like mobile responsiveness and embedded sharing.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Scalable Architecture',
        icon: 'Server',
        details: 'Designed for growth, enabling easy addition of new clients and data sources. Architecture supported the company through rapid expansion phase.',
        itemId: 'zuar-frontend'
      }
    ],
    outcomes: [
      { text: 'Successfully replaced entire Tableau infrastructure', itemId: 'zuar-bi' },
      { text: 'Analytics platform became key asset in acquisition discussions', itemId: null },
      { text: 'Company acquired by Priority Tax Relief', itemId: null },
      { text: 'Platform continues operating post-acquisition with enhanced features', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 5
  },
  {
    id: 'flik-lenz',
    client: 'Food Service Compliance Platform',
    industry: 'Food Service Operations',
    title: 'Icon-Based Operations Portal',
    subtitle: 'Compliance & Performance Tracking',
    icon: 'Target',
    color: 'from-cyan-500 to-slate-900',
    borderColor: 'border-cyan-500/30',
    projectItemId: 'project-flik-lenz',
    metrics: [
      { value: '23', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '7', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: 'Icon', label: 'Based Navigation', itemId: null },
      { value: 'Ops', label: 'Focus', itemId: null }
    ],
    challenge: "Food service operations teams needed quick access to compliance data and performance metrics, but traditional dashboard navigation was too complex for field users who needed information quickly.",
    solution: "Built an icon-based navigation system optimized for operational users. Large, clear icons lead directly to compliance dashboards, food safety metrics, and performance tracking. Designed for quick access on tablets in kitchen environments.",
    technical: [
      {
        area: 'Icon-Based UX',
        icon: 'Code2',
        details: 'Designed intuitive icon navigation for non-technical users. Large touch targets for tablet use. Visual hierarchy guides users to most-needed metrics.',
        itemId: 'zuar-frontend'
      },
      {
        area: 'Compliance Dashboards',
        icon: 'BarChart3',
        details: 'Built food safety compliance tracking, health inspection readiness dashboards, and operational KPIs. Real-time alerting for compliance issues.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Operations Integration',
        icon: 'Database',
        details: 'Connected to POS systems, inventory management, and compliance databases. Automated data flows keep dashboards current throughout the day.',
        itemId: 'zuar-etl'
      }
    ],
    outcomes: [
      { text: 'Simplified analytics access for operational staff', itemId: null },
      { text: 'Icon-based design reduced training time significantly', itemId: 'zuar-frontend' },
      { text: 'Real-time compliance visibility improved audit readiness', itemId: null },
      { text: 'Tablet-optimized design enabled use in kitchen environments', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 6
  },
  // Existing projects - now with updated structure
  {
    id: 'intradiem',
    client: 'Enterprise Contact Center Platform',
    industry: 'Contact Center Analytics',
    title: 'Enterprise Workforce Intelligence Portal',
    subtitle: 'Embedded Analytics for Contact Center Optimization',
    icon: 'Users',
    color: 'from-indigo-500 to-slate-900',
    borderColor: 'border-blue-500/30',
    projectItemId: 'project-intradiem',
    metrics: [
      { value: '32+', label: 'Portal Pages', itemId: 'zuar-pages' },
      { value: '20+', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '7', label: 'Month Timeline', itemId: null },
      { value: '5', label: 'User Roles', itemId: 'zuar-sso' }
    ],
    challenge: "This enterprise platform needed a way to show their customers the value of their workforce automation—cost savings, staffing efficiency, and agent productivity. Each customer wanted to see their own data in a branded, easy-to-use portal.",
    solution: "Built a multi-tenant analytics portal where each customer logs in and sees only their data. The portal pulls from multiple APIs, transforms everything in SQL, and presents it through embedded Tableau dashboards. Customers can drill down from company-wide metrics to individual agent performance.",
    technical: [
      {
        area: 'Data Pipeline',
        icon: 'Database',
        details: 'Connected to Intradiem APIs and customer data sources. Wrote Python scripts for extraction and SQL transformations in Zuar Runner. Automated daily refreshes with monitoring and alerting.',
        itemId: 'zuar-etl'
      },
      {
        area: 'Portal Development',
        icon: 'Code2',
        details: 'Built the Data Experience Platform, embedding Tableau dashboards. Custom JavaScript for filtering and interactivity. Responsive CSS that works on tablets and phones.',
        itemId: 'zuar-frontend'
      },
      {
        area: 'Security & Access',
        icon: 'Server',
        details: 'SSO integration with customer identity providers. Row-level security in Tableau so customers only see their own data. Role-based permissions for different user types.',
        itemId: 'zuar-sso'
      }
    ],
    outcomes: [
      { text: 'Gave platform customers self-service access to their ROI data', itemId: null },
      { text: 'Reduced support burden since customers could explore data themselves', itemId: null },
      { text: 'Standardized reporting across dozens of enterprise clients', itemId: 'zuar-portals' },
      { text: 'Portal became a key differentiator in sales conversations', itemId: null }
    ],
    defaultScreenshots: [
      '/images/projects/intradiem/executive-summary.png',
      '/images/projects/intradiem/dashboard.png'
    ],
    displayOrder: 7
  },
  {
    id: 'boulder',
    client: 'National Architecture Firm',
    industry: 'Architecture & Design',
    title: 'Resource Utilization Dashboard',
    subtitle: 'Staff Planning & Project Analytics',
    icon: 'Building2',
    color: 'from-teal-500 to-slate-900',
    borderColor: 'border-emerald-500/30',
    projectItemId: 'project-boulder',
    metrics: [
      { value: '12', label: 'Dashboard Views', itemId: 'zuar-pages' },
      { value: '5', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '100+', label: 'Active Users', itemId: null },
      { value: '3', label: 'Month Build', itemId: null }
    ],
    challenge: "An architecture firm needed better visibility into how their staff time was being allocated across projects. The existing process involved manual spreadsheet analysis that was always out of date.",
    solution: "Created a ThoughtSpot-powered analytics portal that shows real-time utilization rates, project profitability, and resource forecasting. Project managers can see who's available, finance can track margins, and leadership gets the big picture.",
    technical: [
      {
        area: 'Data Integration',
        icon: 'Database',
        details: 'Pulled data from their project management system, time tracking software, and financial systems. SQL transformations to create a unified data model for analysis.',
        itemId: 'zuar-etl'
      },
      {
        area: 'Analytics Platform',
        icon: 'BarChart3',
        details: 'Deployed ThoughtSpot for natural language search and exploration. Users can type questions like "show me utilization by department this quarter" and get instant answers.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Portal Experience',
        icon: 'Code2',
        details: 'Embedded ThoughtSpot in a branded portal with custom navigation. Role-based views so different departments see relevant metrics.',
        itemId: 'zuar-frontend'
      }
    ],
    outcomes: [
      { text: 'Replaced weekly manual reporting with real-time dashboards', itemId: null },
      { text: 'Gave project managers tools to optimize resource allocation', itemId: null },
      { text: 'Enabled finance team to track profitability by project and client', itemId: null },
      { text: 'Leadership can now forecast staffing needs months ahead', itemId: null }
    ],
    defaultScreenshots: [],
    displayOrder: 8
  },
  {
    id: 'dukes',
    client: 'Municipal Sewer Services Provider',
    industry: 'Municipal Services',
    title: 'Field Operations Analytics',
    subtitle: 'Complete Tableau Rip & Replace',
    icon: 'Target',
    color: 'from-orange-500 to-slate-900',
    borderColor: 'border-orange-500/30',
    projectItemId: 'project-dukes',
    metrics: [
      { value: '18', label: 'Dashboards', itemId: 'zuar-pages' },
      { value: '6', label: 'Data Sources', itemId: 'zuar-datasources' },
      { value: '3', label: 'Month Migration', itemId: null },
      { value: '50+', label: 'Users', itemId: null }
    ],
    challenge: "The company was running an outdated Tableau Server instance that was expensive, hard to maintain, and only accessible from the office. Field technicians had no way to see their performance data. Leadership wanted a modern solution.",
    solution: "Migrated their entire Tableau environment to a cloud-based Data Experience Platform. Rebuilt key dashboards, improved the data model, and made everything accessible from mobile devices. Field technicians can now check their metrics from the truck.",
    technical: [
      {
        area: 'Migration Planning',
        icon: 'Database',
        details: 'Audited existing Tableau workbooks and data sources. Identified what to keep, what to consolidate, and what to retire. Built a phased migration plan to minimize disruption.',
        itemId: null
      },
      {
        area: 'Dashboard Redesign',
        icon: 'BarChart3',
        details: 'Modernized dashboard designs with cleaner layouts and better mobile support. Added new visualizations for field performance and route efficiency.',
        itemId: 'zuar-bi'
      },
      {
        area: 'Cloud Infrastructure',
        icon: 'Server',
        details: 'Set up cloud hosting with automatic backups and scaling. SSO integration with their existing identity system. Mobile-optimized portal for field access.',
        itemId: 'zuar-sso'
      }
    ],
    outcomes: [
      { text: 'Eliminated on-premise Tableau Server maintenance costs', itemId: null },
      { text: 'Gave field technicians mobile access to their performance data', itemId: null },
      { text: 'Improved dashboard load times and reliability', itemId: null },
      { text: 'Simplified administration with cloud-based management', itemId: null }
    ],
    defaultScreenshots: [
      '/images/projects/dukes/root-control.png'
    ],
    displayOrder: 9
  }
]

export function getProjectById(id: string): PortalProject | undefined {
  return portalProjects.find(p => p.id === id)
}

export function getSortedProjects(): PortalProject[] {
  return [...portalProjects].sort((a, b) => a.displayOrder - b.displayOrder)
}
