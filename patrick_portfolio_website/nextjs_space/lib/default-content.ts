// Complete default content extracted from all section components
// This serves as the source of truth for editable content

export interface HeroContent {
  tagline: string
  name: string
  title: string
  subtitle: string
  philosophyQuote: string
  philosophyAttribution: string
  description: string
  stats: Array<{ value: number; suffix: string; label: string; itemId: string }>
}

export interface AboutContent {
  headline: string
  description: string
  howIGotHereTitle: string
  howIGotHereP1: string
  howIGotHereP2: string
  whatIveDeliveredTitle: string
  achievements: Array<{ text: string; suffix: string; itemId: string; highlight: boolean }>
  aiNote: string
  skillCategories: Array<{
    title: string
    icon: string
    color: string
    skills: Array<{ name: string; itemId: string | null }>
  }>
}

// New unified Career structure - combines Resume facts with Deep Dive examples
export interface CareerHighlight {
  text: string
  skills: string[]
  linkTo: string | null
  itemId: string | null
}

export interface CareerMetric {
  text: string
  itemId: string | null
}

export interface DeepDiveTechnical {
  area: string
  icon: string
  details: string
  itemId: string | null
}

export interface DeepDiveOutcome {
  text: string
  itemId: string | null
}

export interface DeepDiveContent {
  title: string
  subtitle: string
  challenge: string
  solution: string
  technical: DeepDiveTechnical[]
  outcomes: DeepDiveOutcome[]
}

export interface CareerEntry {
  id: string
  company: string
  industry: string
  role: string
  period: string
  location: string
  icon: string
  color: string
  borderColor: string
  roleItemId: string | null
  image?: string | null
  isCurrent: boolean
  // Factual information (the "what")
  highlights: CareerHighlight[]
  metrics: CareerMetric[]
  // Deep dive (the "how" - examples and stories) - optional
  deepDive?: DeepDiveContent | null
}

export interface TimelineItem {
  year: string
  role: string
  company: string
  type: string
}

export interface CareerContent {
  summary: string
  timelineTitle: string
  timeline: TimelineItem[]
  entries: CareerEntry[]
}

export interface AIContent {
  headline: string
  description: string
  multiplierText: string
  multiplierDescription: string
}

// Legacy interfaces for backward compatibility during migration
export interface ResumeJobHighlight {
  text: string
  skills: string[]
  linkTo: string | null
  itemId: string | null
}

export interface ResumeJobMetric {
  text: string
  itemId: string | null
}

export interface ResumeJob {
  id: string
  company: string
  role: string
  period: string
  location: string
  color: string
  borderColor: string
  roleItemId: string | null
  image?: string | null
  highlights: ResumeJobHighlight[]
  metrics: ResumeJobMetric[]
}

export interface ResumeContent {
  summary: string
  timelineTitle: string
  timeline: TimelineItem[]
  experience: ResumeJob[]
}

export interface ExperienceTechnical {
  area: string
  icon: string
  details: string
  itemId: string | null
}

export interface ExperienceOutcome {
  text: string
  itemId: string | null
}

export interface ExperienceProject {
  id: string
  company: string
  industry: string
  title: string
  subtitle: string
  icon: string
  color: string
  borderColor: string
  period: string
  isCurrent: boolean
  roleItemId: string | null
  metrics: Array<{ value: string; label: string; itemId: string | null }>
  challenge: string
  solution: string
  technical: ExperienceTechnical[]
  outcomes: ExperienceOutcome[]
  relatedAchievements: Array<{ text: string; role: string }>
}

export interface ExperienceContent {
  badgeText: string
  headline: string
  description: string
  projects: ExperienceProject[]
}

export const defaultHeroContent: HeroContent = {
  tagline: '21 Years Mastering What Matters',
  name: 'Patrick Dean Fox',
  title: 'Analytics Implementation Manager',
  subtitle: 'Full-Stack BI Developer • Data Engineer • AI-Augmented Builder',
  philosophyQuote: 'A jack of all trades is a master of none, but oftentimes better than a master of one.',
  philosophyAttribution: 'The full quote that defines my approach',
  description: "I believe in mastering whatever I invest my time in. Whether it's finance, operations, data engineering, or AI—I dive deep, learn fast, and deliver. My diverse background isn't a distraction; it's my superpower for solving complex, cross-functional problems.",
  stats: [
    { value: 200, suffix: '+', label: 'Portal Pages Built', itemId: 'zuar-pages' },
    { value: 24, suffix: '+', label: 'Datasources Integrated', itemId: 'zuar-datasources' },
    { value: 16, suffix: '+', label: 'Client Portals', itemId: 'zuar-portals' },
    { value: 2000, suffix: '+', label: 'Consulting Hours', itemId: 'zuar-hours' }
  ]
}

export const defaultAboutContent: AboutContent = {
  headline: 'Full-Stack Analytics Expertise',
  description: "21 years spanning financial services, operations leadership, and modern analytics/AI. I work across the entire data stack—connecting sources, transforming data, and building the solutions that help teams make better decisions.",
  howIGotHereTitle: 'How I Got Here',
  howIGotHereP1: "I started in financial services at Merrill Lynch and USAA—where I earned Series 7, Series 66, and P&C insurance licenses across all 50 states. That foundation taught me compliance, client communication, and how to explain complex topics clearly.",
  howIGotHereP2: "Then came operations leadership: COO twice over, scaling companies from $2M to $12M. I built data pipelines before 'data engineering' was a job title. Now at Zuar, I combine all of it—finance background, operational instincts, and technical skills—to build analytics solutions for enterprise clients.",
  whatIveDeliveredTitle: 'What I\'ve Delivered',
  achievements: [
    { text: '$3M → $12M + $2M → $8M', suffix: ' revenue scaling as COO at two companies', itemId: 'thomas-revenue', highlight: true },
    { text: '16+ client portals', suffix: ' launched at Zuar for enterprise clients', itemId: 'zuar-portals', highlight: true },
    { text: 'First LLM deployment', suffix: ' at Zuar—pioneered AI chatbot integration', itemId: 'skill-chatbots', highlight: true },
    { text: '35-40 direct reports', suffix: ' at peak, managing managers across locations', itemId: 'leadership-scale', highlight: false },
    { text: 'Series 7, 66 & P&C licenses', suffix: ' in all 50 states from USAA days', itemId: 'usaa-series7', highlight: false }
  ],
  aiNote: "I use AI tools to move faster and take on work I couldn't have done before",
  skillCategories: [
    {
      title: 'Data Engineering',
      icon: 'Database',
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Python (APIs, ETL)', itemId: 'skill-python' },
        { name: 'SQL (Transformations)', itemId: 'skill-sql' },
        { name: 'Zuar Runner', itemId: 'zuar-etl' },
        { name: 'BigQuery', itemId: 'propel-looker' },
        { name: 'Data Modeling', itemId: 'skill-datamodeling' }
      ]
    },
    {
      title: 'Front-End Development',
      icon: 'Code2',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'JavaScript', itemId: 'skill-javascript' },
        { name: 'HTML/CSS', itemId: 'zuar-frontend' },
        { name: 'Angular', itemId: null },
        { name: 'React', itemId: 'skill-react' },
        { name: 'AI-Assisted Dev', itemId: 'skill-vibe' }
      ]
    },
    {
      title: 'BI Platforms',
      icon: 'BarChart3',
      color: 'from-violet-500 to-purple-500',
      skills: [
        { name: 'Data Experience Platform', itemId: 'zuar-bi' },
        { name: 'Tableau', itemId: 'zuar-bi' },
        { name: 'ThoughtSpot', itemId: 'project-boulder' },
        { name: 'Power BI', itemId: 'zuar-bi' },
        { name: 'Looker', itemId: 'propel-looker' }
      ]
    },
    {
      title: 'AI & Automation',
      icon: 'Brain',
      color: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'Local LLMs', itemId: 'skill-llm' },
        { name: 'Chatbots (MCP)', itemId: 'skill-chatbots' },
        { name: 'Prompt Engineering', itemId: 'skill-prompts' },
        { name: 'Vibe Coding', itemId: 'skill-vibe' },
        { name: 'Workflow AI', itemId: null }
      ]
    },
    {
      title: 'Design & UX',
      icon: 'Palette',
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Dashboard Design', itemId: 'zuar-pages' },
        { name: 'Data Visualization', itemId: 'zuar-bi' },
        { name: 'UX Research', itemId: null },
        { name: 'Responsive Design', itemId: 'zuar-frontend' },
        { name: 'Accessibility', itemId: null }
      ]
    },
    {
      title: 'Infrastructure',
      icon: 'Server',
      color: 'from-slate-500 to-slate-600',
      skills: [
        { name: 'SSO Implementation', itemId: 'zuar-sso' },
        { name: 'Role-Based Access', itemId: 'zuar-sso' },
        { name: 'API Integration', itemId: 'zuar-datasources' },
        { name: 'Cloud Deployment', itemId: 'project-dukes' },
        { name: 'Security', itemId: 'zuar-sso' }
      ]
    },
    {
      title: 'Financial Services',
      icon: 'DollarSign',
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'FINRA Series 7', itemId: 'usaa-series7' },
        { name: 'FINRA Series 66', itemId: 'usaa-series7' },
        { name: 'P&C Insurance (50 States)', itemId: 'usaa-pc' },
        { name: 'QuickBooks', itemId: 'drc-quickbooks' },
        { name: 'Financial Reporting', itemId: 'drc-finance' }
      ]
    }
  ]
}

// NEW: Unified Career Content - merges Resume + Experience
export const defaultCareerContent: CareerContent = {
  summary: "21 years spanning financial services (Merrill Lynch, USAA), operations leadership (COO twice), and modern analytics/AI implementation. One of the few professionals who can read a balance sheet, architect a data pipeline, and deploy an LLM—all in the same conversation.",
  timelineTitle: '21 Years of Growth',
  timeline: [
    { year: '2005', role: 'Finance Account Specialist', company: 'Merrill Lynch', type: 'start' },
    { year: '2007', role: 'Business Controller', company: 'DRC Collective', type: 'transition' },
    { year: '2009', role: 'Financial Foundations', company: 'USAA', type: 'transition' },
    { year: '2012', role: 'Operations Manager', company: 'Thomas Inventory', type: 'start' },
    { year: '2013', role: 'Director of Ops', company: 'Thomas Inventory', type: 'promotion' },
    { year: '2016', role: 'COO', company: 'Thomas Inventory', type: 'promotion' },
    { year: '2020', role: 'Operations Manager', company: 'Propel Bikes', type: 'start' },
    { year: '2021', role: 'COO', company: 'Propel Bikes', type: 'promotion' },
    { year: '2022', role: 'Analytics Manager', company: 'Zuar Inc', type: 'current' },
    { year: '2026', role: 'Present', company: 'Zuar Inc', type: 'now' }
  ],
  entries: [
    {
      id: 'zuar',
      company: 'Zuar Inc',
      industry: 'Analytics Consulting',
      role: 'Analytics Implementation Manager',
      period: 'Oct 2022 - Present',
      location: 'Remote',
      icon: 'BarChart3',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      roleItemId: 'zuar-role',
      isCurrent: true,
      highlights: [
        { text: 'Lead end-to-end analytics implementations for enterprise clients including Fortune 500 companies', skills: ['BI Platforms', 'ETL'], linkTo: 'projects', itemId: 'zuar-role' },
        { text: 'Build data pipelines connecting 24+ source system types using Zuar Runner', skills: ['SQL', 'Data Modeling'], linkTo: 'projects', itemId: 'zuar-etl' },
        { text: 'Deploy and embed Tableau, ThoughtSpot, Power BI in custom-branded portals', skills: ['BI Platforms', 'Front-End'], linkTo: 'projects', itemId: 'zuar-bi' },
        { text: 'Pioneer LLM integration for clients—first Zuar employee to deploy production chatbots', skills: ['Python', 'AI'], linkTo: 'projects', itemId: 'skill-chatbots' },
        { text: 'Achieve 40% higher adoption rates and 85% user retention across implementations', skills: ['Leadership'], linkTo: null, itemId: 'zuar-adoption' }
      ],
      metrics: [
        { text: '16+ Client Portals', itemId: 'zuar-portals' },
        { text: '200+ Pages Built', itemId: 'zuar-pages' },
        { text: '24+ Data Sources', itemId: 'zuar-datasources' },
        { text: '2,000+ Hours', itemId: 'zuar-hours' }
      ],
      deepDive: {
        title: 'Full-Stack Analytics at Enterprise Scale',
        subtitle: 'From greenfield builds to Fortune 500 deployments',
        challenge: "Clients come to Zuar needing analytics for their customers or employees—without buying individual BI licenses. Each engagement is different: different data sources (APIs, databases, spreadsheets), different business contexts (wastewater management, architecture firms, workforce analytics), and different user sophistication levels. The challenge isn't just technical—it's understanding what each client actually needs and translating that into working solutions.",
        solution: "I handle full implementation cycles: discovery calls to understand requirements, data architecture design, ETL pipeline development, portal customization, and end-user training. When projects require capabilities beyond traditional BI—like natural language interfaces or automated insights—I've pioneered LLM integration within our platform. I was the first Zuar employee to deploy production chatbots for clients, opening up a new service category.",
        technical: [
          { area: 'Data Pipeline Architecture', icon: 'Database', details: 'I connect to APIs (REST, GraphQL, OAuth), databases (PostgreSQL, MySQL, SQL Server, BigQuery), and flat files. I write the SQL transformations that model raw data into analytics-ready structures. Zuar Runner handles orchestration—I configure jobs for incremental loads, full refreshes, and real-time streaming where needed.', itemId: 'zuar-etl' },
          { area: 'Portal Development', icon: 'BarChart3', details: 'I build Data Experience Platforms with embedded Tableau, ThoughtSpot, or Power BI. This means writing JavaScript for custom interactivity, CSS for pixel-perfect branding, and ensuring responsive design across devices. I\'ve implemented everything from simple dashboard portals to complex multi-tenant applications with role-based content.', itemId: 'zuar-frontend' },
          { area: 'Security & Access Control', icon: 'Server', details: 'Enterprise clients require robust security. I set up SSO integration with their identity providers (Okta, Azure AD, custom SAML), configure row-level security so users only see their data, and implement role-based permissions for different user types. Compliance documentation is part of every delivery.', itemId: 'zuar-sso' },
          { area: 'LLM & AI Integration', icon: 'Zap', details: 'I pioneered chatbot deployment at Zuar—the PE Demo project was my proof of concept that convinced leadership to offer this as a service. Now I use AI coding assistants for rapid prototyping, complex SQL generation, and tackling unfamiliar technical domains faster than traditional learning curves would allow.', itemId: 'skill-vibe' }
        ],
        outcomes: [
          { text: '16+ portals launched for clients across industries—wastewater, architecture, workforce management, media, and more', itemId: 'zuar-portals' },
          { text: '200+ individual dashboard pages built with custom interactivity and branding', itemId: 'zuar-pages' },
          { text: '24+ different data source types integrated—from standard databases to obscure industry-specific APIs', itemId: 'zuar-datasources' },
          { text: 'Pioneered LLM integration—first production chatbot deployment in company history (PE Demo)', itemId: 'skill-chatbots' },
          { text: '40% higher adoption rates and 85% user retention vs. industry benchmarks', itemId: 'zuar-adoption' }
        ]
      }
    },
    {
      id: 'propel',
      company: 'Propel Electric Bikes',
      industry: 'E-Commerce & Retail',
      role: 'Operations Manager → COO',
      period: 'Mar 2020 - Oct 2022',
      location: 'Brooklyn, NY / Long Beach, CA',
      icon: 'Zap',
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/30',
      roleItemId: 'propel-role',
      isCurrent: false,
      highlights: [
        { text: 'Scaled operations during explosive growth phase ($2M→$8M revenue)', skills: ['Operations'], linkTo: null, itemId: 'propel-growth' },
        { text: 'Implemented Looker/BigQuery as company\'s first real analytics infrastructure', skills: ['BI Platforms', 'Data Engineering'], linkTo: null, itemId: 'propel-looker' },
        { text: 'Grew team from 8 to 35 across 3 locations (Brooklyn, Long Beach, overseas support)', skills: ['Leadership'], linkTo: null, itemId: 'propel-team' },
        { text: 'Product managed custom WordPress plugins connecting WooCommerce, ShopMonkey, SOS Inventory, Shipmate, and LTL shipping', skills: ['JavaScript', 'Python', 'PHP'], linkTo: null, itemId: 'propel-integrations' },
        { text: 'Navigated company through COVID lockdowns—opening 3rd location in Wilmington, DE during pandemic', skills: ['Leadership'], linkTo: null, itemId: null },
        { text: 'Built overseas customer success team for email, voicemail, and order support to optimize hiring costs', skills: ['Operations'], linkTo: null, itemId: null }
      ],
      metrics: [
        { text: '$2M→$8M Revenue', itemId: 'propel-growth' },
        { text: '8→35 Employees', itemId: 'propel-team' },
        { text: '35% Less Stockouts', itemId: 'propel-inventory' },
        { text: '3 Locations', itemId: null }
      ],
      deepDive: {
        title: 'Zero to BI Hero',
        subtitle: 'Building analytics infrastructure from nothing during hypergrowth',
        challenge: "When I joined Propel in 2020, the company was running on spreadsheets and gut instinct. Inventory management was chaos—we'd be completely out of stock on popular e-bike models while sitting on 6 months of slow-moving inventory. Leadership wanted visibility into operations but had zero tooling. Meanwhile, revenue was growing 4x and we needed to scale everything: team, processes, and decision-making speed.",
        solution: "I implemented Looker and BigQuery as our analytics backbone—our first real BI infrastructure. Started with the most painful problem (inventory) and expanded to sales, service, and financial analytics. I built data pipelines connecting Shopify, our service management system, marketing tools, and accounting software. By the time I left, we had dashboards for purchasing decisions, sales rep performance, service turnaround tracking, and executive reporting.",
        technical: [
          { area: 'BigQuery Data Warehouse', icon: 'Database', details: 'Built a central data warehouse pulling from Shopify (e-commerce), Lightspeed (point of sale), RepairShopr (service tickets), Google Analytics, and QuickBooks. Wrote Python ETL jobs for automated syncs and handled the messy reality of inconsistent data across systems.', itemId: 'propel-looker' },
          { area: 'Looker Implementation', icon: 'LineChart', details: 'Created LookML data models and built 15+ dashboards for different stakeholders. Sales team tracked performance by rep and location. Purchasing used inventory velocity and seasonality models to place smarter orders. Leadership got unified views across the business.', itemId: 'propel-looker' },
          { area: 'Inventory Analytics', icon: 'Boxes', details: 'The inventory problem was my first win. Built views showing stock levels vs. sales velocity, seasonality patterns, and days-of-stock calculations. This directly reduced stockouts by 35% and excess inventory by 22%—we stopped losing sales to "out of stock" and stopped tying up cash in slow movers.', itemId: 'propel-inventory' },
          { area: 'WordPress Plugin Development', icon: 'Zap', details: 'Product managed (and contributed code to) custom plugins for bike configuration and inventory sync. The configurator let customers build custom e-bikes online; the sync plugin kept WooCommerce inventory accurate across our warehouse systems.', itemId: null }
        ],
        outcomes: [
          { text: 'Went from zero analytics infrastructure to company-wide BI in 18 months', itemId: 'propel-looker' },
          { text: '35% reduction in stockouts—stopped losing sales to "out of stock"', itemId: 'propel-inventory' },
          { text: '22% reduction in excess inventory—freed up working capital', itemId: 'propel-inventory' },
          { text: 'Scaled team from 8 to 35 employees across 3 locations', itemId: 'propel-team' },
          { text: 'Promoted from Operations Manager to COO in first year', itemId: 'propel-role' }
        ]
      }
    },
    {
      id: 'thomas',
      company: 'Thomas Inventory Services',
      industry: 'Third-Party Logistics & FBA Prep',
      role: 'Operations Manager → Director → COO',
      period: 'Sep 2012 - Mar 2020',
      location: 'Somerville, NJ',
      icon: 'Warehouse',
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/30',
      roleItemId: 'thomas-role',
      isCurrent: false,
      highlights: [
        { text: 'Grew with company from $3M startup to $12M established 3PL over 7.5 years', skills: ['Operations'], linkTo: null, itemId: 'thomas-revenue' },
        { text: 'Built custom Python ETL to ingest POs/SOs, generate dynamic Amazon FBA labels, and create automated pick lists', skills: ['Python', 'Data Engineering'], linkTo: null, itemId: 'thomas-python' },
        { text: 'Built BI and reporting infrastructure from scratch—Excel to SQL to Camelot Excalibur WMS', skills: ['BI Platforms', 'SQL'], linkTo: null, itemId: 'thomas-bi' },
        { text: 'Led WMS selection and implementation (Camelot Excalibur) across 3 warehouse facilities', skills: ['Data Engineering', 'ETL'], linkTo: null, itemId: 'thomas-wms' },
        { text: 'Managed FBA prep operations processing 5M+ units annually', skills: ['Operations'], linkTo: null, itemId: 'thomas-fba' },
        { text: 'Achieved 96% enterprise client retention through operational excellence', skills: ['Leadership'], linkTo: null, itemId: null }
      ],
      metrics: [
        { text: '7.5 Year Tenure', itemId: null },
        { text: '$3M→$12M Growth', itemId: 'thomas-revenue' },
        { text: '5M+ Units/Year', itemId: 'thomas-fba' },
        { text: '96% Retention', itemId: null }
      ],
      deepDive: {
        title: 'Startup to Scale',
        subtitle: '7.5 years building analytics and operations from the ground up',
        challenge: "I joined Thomas Inventory Services when it was a small FBA prep company—one warehouse, maybe 10 people, $3M in revenue. Everything was tracked in spreadsheets. As we grew to handle millions of units, the lack of visibility became a real problem. We needed to know throughput, accuracy rates, labor efficiency, and client profitability—and we needed to know in real-time, not two weeks after month-end.",
        solution: "I stuck around for almost 8 years, getting promoted from Operations Manager to Director to COO. Along the way, I built whatever reporting infrastructure we needed—started with Excel dashboards and Access databases, moved to SQL Server with reporting views, and eventually implemented proper BI tools as the company could afford them. I also led the WMS evaluations and rollouts as we expanded to multiple facilities.",
        technical: [
          { area: 'WMS Implementation', icon: 'Server', details: 'Evaluated, selected, and rolled out warehouse management systems across 3 facilities. Each warehouse had different needs—FBA prep required different workflows than retail distribution or B2B fulfillment. I customized system configurations and trained teams on new processes.', itemId: 'thomas-wms' },
          { area: 'Homegrown BI Evolution', icon: 'BarChart3', details: 'Built analytics as the company could afford it. Started with Excel dashboards connected to Access databases. Migrated to SQL Server with automated report generation. Eventually implemented proper BI tools. Each evolution happened when the previous solution couldn\'t handle our scale.', itemId: 'thomas-bi' },
          { area: 'FBA Prep Operations', icon: 'Package', details: 'Managed operations processing millions of units for Amazon sellers. Built tracking for throughput (units/hour), accuracy rates, and compliance with Amazon\'s constantly changing requirements. This was where I learned to think about data operationally—not just reporting, but driving decisions.', itemId: 'thomas-fba' },
          { area: 'Process Automation', icon: 'Database', details: 'Created ETL processes to consolidate data from WMS, shipping carriers (UPS, FedEx, Amazon SWA), and client systems. Automated the reports that used to take hours of manual work—daily throughput, weekly billing, monthly client scorecards.', itemId: null }
        ],
        outcomes: [
          { text: 'Company grew from $3M to $12M revenue during my tenure', itemId: 'thomas-revenue' },
          { text: 'Promoted twice: Operations Manager → Director of Operations → COO', itemId: 'thomas-role' },
          { text: 'Scaled processing from 1.2M to 5M+ units annually', itemId: 'thomas-fba' },
          { text: 'Built BI capability that evolved with company growth', itemId: 'thomas-bi' },
          { text: 'Achieved 96% enterprise client retention through operational transparency', itemId: null }
        ]
      }
    },
    {
      id: 'usaa',
      company: 'USAA',
      industry: 'Financial Services',
      role: 'Financial Foundations Specialist',
      period: 'Oct 2009 - Sep 2012',
      location: 'Tampa, FL',
      icon: 'Shield',
      color: 'from-blue-600 to-slate-700',
      borderColor: 'border-blue-600/30',
      roleItemId: 'usaa-role',
      isCurrent: false,
      highlights: [
        { text: 'Held FINRA Series 7 (General Securities Representative) and Series 66 (Uniform Combined State Law) licenses', skills: ['Financial Services'], linkTo: null, itemId: 'usaa-series7' },
        { text: 'Licensed for Property & Casualty insurance in all 50 states', skills: ['Financial Services'], linkTo: null, itemId: 'usaa-pc' },
        { text: 'Provided comprehensive financial guidance to military members and their families', skills: ['Leadership'], linkTo: null, itemId: null },
        { text: 'Developed ability to explain complex financial concepts to non-technical audiences', skills: ['Leadership'], linkTo: null, itemId: null }
      ],
      metrics: [
        { text: 'Series 7 & 66', itemId: 'usaa-series7' },
        { text: 'P&C All 50 States', itemId: 'usaa-pc' },
        { text: 'Military Families', itemId: null },
        { text: '3 Year Tenure', itemId: null }
      ],
      deepDive: null
    },
    {
      id: 'drc',
      company: 'DRC Collective',
      industry: 'Retail & Creative Services',
      role: 'Business Controller',
      period: 'Sep 2007 - Oct 2009',
      location: 'Philadelphia, PA',
      icon: 'Calculator',
      color: 'from-purple-500 to-violet-500',
      borderColor: 'border-purple-500/30',
      roleItemId: 'drc-role',
      isCurrent: false,
      highlights: [
        { text: 'Full financial operations ownership including reporting, bookkeeping, and budgeting', skills: ['Financial Services'], linkTo: null, itemId: 'drc-finance' },
        { text: 'Implemented and managed QuickBooks for company accounting and reporting', skills: ['Data Engineering'], linkTo: null, itemId: 'drc-quickbooks' },
        { text: 'Operations administration bridging creative and business functions', skills: ['Operations'], linkTo: null, itemId: null },
        { text: 'Data analysis for business decision-making and performance tracking', skills: ['BI Platforms'], linkTo: null, itemId: null }
      ],
      metrics: [
        { text: 'QuickBooks', itemId: 'drc-quickbooks' },
        { text: 'Financial Reporting', itemId: 'drc-finance' },
        { text: 'Bookkeeping', itemId: null },
        { text: '2+ Year Tenure', itemId: null }
      ],
      deepDive: null
    },
    {
      id: 'merrill',
      company: 'Merrill Lynch',
      industry: 'Financial Services & Wealth Management',
      role: 'Finance Account Specialist',
      period: 'Aug 2005 - Sep 2007',
      location: 'Hopewell, NJ',
      icon: 'TrendingUp',
      color: 'from-indigo-500 to-blue-500',
      borderColor: 'border-indigo-500/30',
      roleItemId: 'merrill-role',
      isCurrent: false,
      highlights: [
        { text: 'Began career at premier financial services and wealth management firm', skills: ['Financial Services'], linkTo: null, itemId: 'merrill-start' },
        { text: 'Account management and client relationship support', skills: ['Leadership'], linkTo: null, itemId: null },
        { text: 'Exposure to institutional financial operations and compliance requirements', skills: ['Financial Services'], linkTo: null, itemId: null },
        { text: 'Foundation in regulated industry processes that shaped later approach to data governance', skills: ['Operations'], linkTo: null, itemId: null }
      ],
      metrics: [
        { text: 'Wealth Management', itemId: null },
        { text: 'Account Support', itemId: null },
        { text: 'Client Relations', itemId: null },
        { text: '2+ Year Tenure', itemId: null }
      ],
      deepDive: null
    }
  ]
}

// LEGACY: Keep these for backward compatibility - mapped from new structure
export const defaultResumeContent: ResumeContent = {
  summary: defaultCareerContent.summary,
  timelineTitle: defaultCareerContent.timelineTitle,
  timeline: defaultCareerContent.timeline,
  experience: defaultCareerContent.entries.map(entry => ({
    id: entry.id,
    company: entry.company,
    role: entry.role,
    period: entry.period,
    location: entry.location,
    color: entry.color,
    borderColor: entry.borderColor,
    roleItemId: entry.roleItemId,
    image: entry.image,
    highlights: entry.highlights,
    metrics: entry.metrics
  }))
}

export const defaultExperienceContent: ExperienceContent = {
  badgeText: 'Career Deep Dives',
  headline: 'Experience Case Studies',
  description: 'Detailed look at what I actually did at each company. The messy reality behind the resume bullet points.',
  projects: defaultCareerContent.entries
    .filter(entry => entry.deepDive)
    .map(entry => ({
      id: entry.id === 'zuar' ? 'zuar-deep' : entry.id,
      company: entry.company,
      industry: entry.industry,
      title: entry.deepDive!.title,
      subtitle: entry.deepDive!.subtitle,
      icon: entry.icon,
      color: entry.color,
      borderColor: entry.borderColor,
      period: entry.period,
      isCurrent: entry.isCurrent,
      roleItemId: entry.roleItemId,
      metrics: entry.metrics.slice(0, 4).map(m => ({ 
        value: m.text.split(' ')[0] || '', 
        label: m.text.split(' ').slice(1).join(' ') || m.text,
        itemId: m.itemId 
      })),
      challenge: entry.deepDive!.challenge,
      solution: entry.deepDive!.solution,
      technical: entry.deepDive!.technical,
      outcomes: entry.deepDive!.outcomes,
      relatedAchievements: []
    }))
}

export const defaultAIContent: AIContent = {
  headline: 'AI-Augmented Work',
  description: "I've been experimenting with AI tools to expand what's possible in my work. Not replacing human judgment, but augmenting it—letting me take on projects I couldn't have tackled before.",
  multiplierText: 'The AI Multiplier',
  multiplierDescription: "AI doesn't replace expertise—it amplifies it. I can now prototype faster, tackle unfamiliar code, and explore solutions I wouldn't have considered. It's changed how I approach problems."
}

// Helper to get any section's default content
export function getDefaultContentForSection(sectionId: string): any {
  switch (sectionId) {
    case 'hero': return defaultHeroContent
    case 'about': return defaultAboutContent
    case 'resume': return defaultResumeContent
    case 'experience': return defaultExperienceContent
    case 'career': return defaultCareerContent
    case 'ai': return defaultAIContent
    default: return null
  }
}
