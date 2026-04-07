// Centralized portfolio data that can be used for job analysis
// Each item has a unique ID that maps to relevance data

export interface PortfolioItem {
  id: string
  type: 'skill' | 'achievement' | 'project' | 'experience' | 'metric'
  category: string
  title: string
  description: string
  keywords: string[]
}

export const portfolioItems: PortfolioItem[] = [
  // Current Role - Zuar
  {
    id: 'zuar-role',
    type: 'experience',
    category: 'Zuar Inc',
    title: 'Analytics Implementation Manager',
    description: 'Lead end-to-end analytics implementations for enterprise clients, handling data pipelines, portal development, and project management.',
    keywords: ['analytics', 'implementation', 'enterprise', 'consulting', 'project management']
  },
  {
    id: 'zuar-portals',
    type: 'metric',
    category: 'Zuar Inc',
    title: '16+ Client Portals Launched',
    description: 'Built and deployed over 16 analytics portals for enterprise clients across various industries.',
    keywords: ['portals', 'enterprise', 'client delivery', 'deployment']
  },
  {
    id: 'zuar-pages',
    type: 'metric',
    category: 'Zuar Inc',
    title: '200+ Portal Pages Built',
    description: 'Created over 200 individual dashboard pages with embedded analytics, custom JavaScript, and responsive design.',
    keywords: ['dashboards', 'front-end', 'javascript', 'responsive design', 'ui']
  },
  {
    id: 'zuar-datasources',
    type: 'metric',
    category: 'Zuar Inc',
    title: '24+ Data Sources Integrated',
    description: 'Connected and transformed data from 24+ different source types including APIs, databases, and files.',
    keywords: ['data integration', 'etl', 'apis', 'databases', 'data engineering']
  },
  {
    id: 'zuar-hours',
    type: 'metric',
    category: 'Zuar Inc',
    title: '2,000+ Consulting Hours',
    description: 'Logged over 2,000 hours of client-facing consulting work on analytics implementations.',
    keywords: ['consulting', 'client management', 'stakeholder engagement']
  },
  {
    id: 'zuar-etl',
    type: 'skill',
    category: 'Zuar Inc',
    title: 'ETL Pipeline Development',
    description: 'Design and implement data pipelines using Zuar Runner, Python, and SQL for automated data transformation.',
    keywords: ['etl', 'data pipelines', 'python', 'sql', 'automation', 'zuar runner']
  },
  {
    id: 'zuar-bi',
    type: 'skill',
    category: 'Zuar Inc',
    title: 'BI Platform Expertise',
    description: 'Deploy and embed Tableau, ThoughtSpot, and Power BI dashboards in client portals.',
    keywords: ['tableau', 'thoughtspot', 'power bi', 'bi', 'dashboards', 'embedded analytics']
  },
  {
    id: 'zuar-frontend',
    type: 'skill',
    category: 'Zuar Inc',
    title: 'Front-End Development',
    description: 'Custom JavaScript, HTML, and CSS development for interactive portal experiences.',
    keywords: ['javascript', 'html', 'css', 'front-end', 'web development']
  },
  {
    id: 'zuar-sso',
    type: 'skill',
    category: 'Zuar Inc',
    title: 'SSO & Security Implementation',
    description: 'Implement enterprise SSO integration, row-level security, and role-based access control.',
    keywords: ['sso', 'security', 'authentication', 'rbac', 'enterprise security']
  },

  // Propel Electric Bikes
  {
    id: 'propel-role',
    type: 'experience',
    category: 'Propel Electric Bikes',
    title: 'Chief Operating Officer',
    description: 'Led operations during significant growth period, implementing analytics infrastructure and scaling team operations.',
    keywords: ['operations', 'coo', 'leadership', 'growth', 'scaling']
  },
  {
    id: 'propel-growth',
    type: 'metric',
    category: 'Propel Electric Bikes',
    title: '$2M to $8M Revenue Growth',
    description: 'Oversaw operations during period of significant revenue growth from $2M to $8M annually.',
    keywords: ['revenue growth', 'business growth', 'scaling', 'operations']
  },
  {
    id: 'propel-team',
    type: 'metric',
    category: 'Propel Electric Bikes',
    title: 'Scaled Team 8 to 35',
    description: 'Grew team from 8 to 35 employees across 3 locations during rapid expansion.',
    keywords: ['team building', 'hiring', 'scaling', 'leadership', 'multi-location']
  },
  {
    id: 'propel-looker',
    type: 'skill',
    category: 'Propel Electric Bikes',
    title: 'Looker/BigQuery Implementation',
    description: 'Built first analytics infrastructure using Looker and BigQuery for company-wide visibility.',
    keywords: ['looker', 'bigquery', 'google cloud', 'data warehouse', 'bi implementation']
  },
  {
    id: 'propel-inventory',
    type: 'achievement',
    category: 'Propel Electric Bikes',
    title: 'Inventory Analytics System',
    description: 'Created visibility into inventory levels, sales velocity, and seasonality for better purchasing decisions.',
    keywords: ['inventory management', 'supply chain', 'analytics', 'forecasting']
  },

  // Thomas Inventory Services
  {
    id: 'thomas-role',
    type: 'experience',
    category: 'Thomas Inventory Services',
    title: 'COO (promoted from Ops Manager)',
    description: 'Grew with company over 7.5 years from Operations Manager to COO, building BI infrastructure from scratch.',
    keywords: ['operations', 'coo', 'leadership', 'career growth', 'promotion']
  },
  {
    id: 'thomas-revenue',
    type: 'metric',
    category: 'Thomas Inventory Services',
    title: '$3M to $12M Company Growth',
    description: 'Part of leadership team that grew company from $3M to $12M over 7.5 years.',
    keywords: ['revenue growth', 'business growth', 'startup', '3pl']
  },
  {
    id: 'thomas-wms',
    type: 'achievement',
    category: 'Thomas Inventory Services',
    title: 'WMS Implementation',
    description: 'Led evaluation, selection, and implementation of warehouse management systems across 3 facilities.',
    keywords: ['wms', 'warehouse', 'logistics', 'implementation', 'systems']
  },
  {
    id: 'thomas-bi',
    type: 'skill',
    category: 'Thomas Inventory Services',
    title: 'Built BI from Scratch',
    description: 'Developed reporting and analytics capability from nothing, evolving from Excel to SQL to proper BI tools.',
    keywords: ['bi', 'analytics', 'sql', 'reporting', 'data']
  },
  {
    id: 'thomas-fba',
    type: 'achievement',
    category: 'Thomas Inventory Services',
    title: 'FBA Prep Operations',
    description: 'Managed operations processing 5M+ units annually for Amazon FBA sellers.',
    keywords: ['fba', 'amazon', 'logistics', 'fulfillment', 'operations']
  },

  // Skills - Data Engineering
  {
    id: 'skill-python',
    type: 'skill',
    category: 'Data Engineering',
    title: 'Python',
    description: 'Python for APIs, ETL scripts, and automation.',
    keywords: ['python', 'programming', 'scripting', 'automation']
  },
  {
    id: 'skill-sql',
    type: 'skill',
    category: 'Data Engineering',
    title: 'SQL',
    description: 'SQL for data transformations, modeling, and analysis.',
    keywords: ['sql', 'database', 'data modeling', 'queries']
  },
  {
    id: 'skill-datamodeling',
    type: 'skill',
    category: 'Data Engineering',
    title: 'Data Modeling',
    description: 'Dimensional modeling and semantic layer design for analytics.',
    keywords: ['data modeling', 'dimensional modeling', 'star schema', 'data architecture']
  },

  // Skills - Front-End
  {
    id: 'skill-javascript',
    type: 'skill',
    category: 'Front-End',
    title: 'JavaScript',
    description: 'JavaScript for interactive web applications and dashboard customization.',
    keywords: ['javascript', 'js', 'front-end', 'web development']
  },
  {
    id: 'skill-react',
    type: 'skill',
    category: 'Front-End',
    title: 'React',
    description: 'React for building modern web applications.',
    keywords: ['react', 'front-end', 'web development', 'ui']
  },

  // AI Skills
  {
    id: 'skill-llm',
    type: 'skill',
    category: 'AI & Automation',
    title: 'Local LLM Implementations',
    description: 'Deploying and experimenting with local language models for enterprise use cases.',
    keywords: ['llm', 'ai', 'machine learning', 'nlp', 'language models']
  },
  {
    id: 'skill-chatbots',
    type: 'skill',
    category: 'AI & Automation',
    title: 'Chatbot Development',
    description: 'Building chatbots using MCP that connect to business systems.',
    keywords: ['chatbots', 'ai', 'conversational ai', 'mcp', 'agents']
  },
  {
    id: 'skill-prompts',
    type: 'skill',
    category: 'AI & Automation',
    title: 'Prompt Engineering',
    description: 'Crafting effective prompts for AI workflows and applications.',
    keywords: ['prompt engineering', 'ai', 'llm', 'gpt']
  },
  {
    id: 'skill-vibe',
    type: 'skill',
    category: 'AI & Automation',
    title: 'AI-Assisted Development',
    description: 'Using AI coding assistants to accelerate development and expand capabilities.',
    keywords: ['ai-assisted', 'vibe coding', 'copilot', 'ai development']
  },

  // Projects
  {
    id: 'project-intradiem',
    type: 'project',
    category: 'Client Projects',
    title: 'Intradiem Portal',
    description: 'Enterprise workforce intelligence portal with 32+ pages, 20+ data sources, multi-tenant architecture.',
    keywords: ['enterprise', 'portal', 'workforce analytics', 'contact center', 'multi-tenant']
  },
  {
    id: 'project-boulder',
    type: 'project',
    category: 'Client Projects',
    title: 'Boulder Associates Dashboard',
    description: 'Resource utilization dashboard for architecture firm using ThoughtSpot.',
    keywords: ['thoughtspot', 'utilization', 'architecture', 'resource planning']
  },
  {
    id: 'project-dukes',
    type: 'project',
    category: 'Client Projects',
    title: 'Dukes Root Control Migration',
    description: 'Complete Tableau rip and replace with cloud-based Zuar Portal for field operations.',
    keywords: ['migration', 'tableau', 'field operations', 'mobile', 'cloud']
  },
  
  // New Portal Projects
  {
    id: 'project-pe-demo',
    type: 'project',
    category: 'AI Innovation',
    title: 'PE Demo - LLM Pioneer Project',
    description: 'First local LLM integration in Portal, pioneering the AI chat feature that later became a productized capability. Installed Ollama Mistral 3 on Docker container with MCP-like architecture.',
    keywords: ['llm', 'ai', 'ollama', 'mistral', 'innovation', 'private equity', 'mcp', 'docker', 'local ai']
  },
  {
    id: 'project-wrights-media',
    type: 'project',
    category: 'Client Projects',
    title: 'Wrights Media Publisher Platform',
    description: '2-year enterprise engagement consolidating 26 data sources, resulting in 6-figure annual Salesforce savings through enhanced analytics.',
    keywords: ['enterprise', 'salesforce', 'bi replacement', 'cost savings', 'roi', 'media', 'publishing']
  },
  {
    id: 'project-compass-ignite',
    type: 'project',
    category: 'Client Projects',
    title: 'Compass/Ignite Enterprise Hub',
    description: 'Multi-BI embedded analytics hub with 67 pages, Tableau + Power BI integration, 30+ user groups with custom JS modules.',
    keywords: ['enterprise', 'tableau', 'power bi', 'multi-bi', 'food services', 'sso', 'javascript']
  },
  {
    id: 'project-acadia',
    type: 'project',
    category: 'Client Projects',
    title: 'Acadia AI Analytics Platform',
    description: 'ThoughtSpot-powered platform with Ask Acadia AI chatbot deployed across 15+ client instances.',
    keywords: ['thoughtspot', 'ai chatbot', 'multi-tenant', 'saas', 'natural language', 'analytics']
  },
  {
    id: 'project-positive-insights',
    type: 'project',
    category: 'Client Projects',
    title: 'Positive Insights Tax Analytics',
    description: 'Tableau replacement success story - analytics platform that contributed to company acquisition by Priority Tax Relief.',
    keywords: ['tableau migration', 'tax services', 'acquisition', 'financial services', 'growth']
  },
  {
    id: 'project-flik-lenz',
    type: 'project',
    category: 'Client Projects',
    title: 'FLIK/Lenz Operations Portal',
    description: 'Icon-based food service compliance portal optimized for tablet use in kitchen environments.',
    keywords: ['food service', 'compliance', 'operations', 'mobile', 'tablet', 'ux']
  },
  
  // AI Integration Skills
  {
    id: 'ai-llm-integration',
    type: 'skill',
    category: 'AI & Automation',
    title: 'LLM Integration & Deployment',
    description: 'Pioneered local LLM integration with Ollama, building MCP-like architectures for enterprise AI capabilities.',
    keywords: ['llm', 'ollama', 'mcp', 'ai integration', 'local ai', 'enterprise ai']
  },
  {
    id: 'ai-workflow-automation',
    type: 'skill',
    category: 'AI & Automation',
    title: 'AI Workflow Automation',
    description: 'Building AI-powered workflows that connect to business systems for automated data analysis and reporting.',
    keywords: ['ai workflows', 'automation', 'mcp', 'tool calling', 'agents']
  },
  
  // ROI Metric
  {
    id: 'zuar-roi',
    type: 'metric',
    category: 'Zuar Inc',
    title: 'Client ROI & Cost Savings',
    description: 'Delivered measurable ROI through BI platform migrations and analytics enhancements, including 6-figure annual savings.',
    keywords: ['roi', 'cost savings', 'business value', 'migration', 'efficiency']
  },

  // Financial Services - USAA
  {
    id: 'usaa-role',
    type: 'experience',
    category: 'Financial Services',
    title: 'Financial Foundations Specialist at USAA',
    description: 'Provided comprehensive financial guidance to military members and their families, holding multiple securities and insurance licenses.',
    keywords: ['financial services', 'usaa', 'military', 'financial planning', 'client services']
  },
  {
    id: 'usaa-series7',
    type: 'skill',
    category: 'Financial Services',
    title: 'FINRA Series 7 & 66 Licenses',
    description: 'Held FINRA Series 7 (General Securities Representative) and Series 66 (Uniform Combined State Law) licenses for securities transactions and investment advisory services.',
    keywords: ['series 7', 'series 66', 'finra', 'securities', 'investment advisor', 'compliance', 'regulated industry']
  },
  {
    id: 'usaa-pc',
    type: 'skill',
    category: 'Financial Services',
    title: 'P&C Insurance Licensed (All 50 States)',
    description: 'Property & Casualty insurance licenses across all 50 states, enabling comprehensive financial services delivery.',
    keywords: ['insurance', 'p&c', 'property casualty', 'licensed', 'multi-state', 'compliance']
  },

  // DRC Collective
  {
    id: 'drc-role',
    type: 'experience',
    category: 'Financial Services',
    title: 'Business Controller at DRC Collective',
    description: 'Full financial operations ownership for creative collective including reporting, bookkeeping, and budgeting.',
    keywords: ['controller', 'finance', 'accounting', 'bookkeeping', 'budgeting', 'financial operations']
  },
  {
    id: 'drc-quickbooks',
    type: 'skill',
    category: 'Financial Services',
    title: 'QuickBooks Implementation',
    description: 'Implemented and managed QuickBooks for company accounting, reporting, and financial operations.',
    keywords: ['quickbooks', 'accounting software', 'bookkeeping', 'financial reporting', 'small business']
  },
  {
    id: 'drc-finance',
    type: 'skill',
    category: 'Financial Services',
    title: 'Financial Reporting & Analysis',
    description: 'Financial reporting, data analysis, and business operations administration bridging creative and business functions.',
    keywords: ['financial reporting', 'analysis', 'budgeting', 'p&l', 'finance']
  },

  // Merrill Lynch
  {
    id: 'merrill-role',
    type: 'experience',
    category: 'Financial Services',
    title: 'Finance Account Specialist at Merrill Lynch',
    description: 'Career start at premier wealth management firm, exposure to institutional financial operations and compliance requirements.',
    keywords: ['merrill lynch', 'wealth management', 'financial services', 'account management', 'compliance']
  },
  {
    id: 'merrill-start',
    type: 'achievement',
    category: 'Financial Services',
    title: 'Financial Services Foundation',
    description: 'Built foundation in regulated industry processes that shaped later approach to data governance and compliance-aware analytics.',
    keywords: ['financial services', 'compliance', 'data governance', 'regulated industry', 'foundation']
  },

  // Propel Integrations
  {
    id: 'propel-integrations',
    type: 'skill',
    category: 'Propel Electric Bikes',
    title: 'Multi-Platform Integration Architecture',
    description: 'Product managed and contributed to custom plugins connecting WordPress/WooCommerce, ShopMonkey, SOS Inventory, Shipmate, and LTL shipping for real-time inventory sync.',
    keywords: ['integrations', 'woocommerce', 'wordpress', 'inventory', 'php', 'python', 'ecommerce', 'multi-platform']
  },

  // Thomas Python ETL
  {
    id: 'thomas-python',
    type: 'skill',
    category: 'Thomas Inventory Services',
    title: 'Custom Python ETL Development',
    description: 'Built custom Python ETL to ingest POs/SOs, generate dynamic Amazon FBA labels, and create automated pick lists—data engineering before it was a job title.',
    keywords: ['python', 'etl', 'automation', 'amazon fba', 'labels', 'inventory', 'data engineering']
  },

  // Industries Served
  {
    id: 'industry-3pl',
    type: 'achievement',
    category: 'Industries',
    title: '3PL & Logistics Experience',
    description: '7.5 years in third-party logistics managing FBA prep operations, warehouse systems, and fulfillment operations.',
    keywords: ['3pl', 'logistics', 'fulfillment', 'warehouse', 'supply chain', 'fba']
  },
  {
    id: 'industry-ecommerce',
    type: 'achievement',
    category: 'Industries',
    title: 'E-Commerce & Retail Operations',
    description: 'COO experience scaling e-commerce operations from $2M to $8M, integrating multiple platforms for real-time inventory.',
    keywords: ['ecommerce', 'retail', 'woocommerce', 'operations', 'scaling']
  },
  {
    id: 'industry-saas',
    type: 'achievement',
    category: 'Industries',
    title: 'SaaS & Professional Services',
    description: 'Analytics implementation for enterprise SaaS clients including Fortune 500 companies.',
    keywords: ['saas', 'professional services', 'enterprise', 'consulting', 'analytics']
  },

  // Leadership Scale
  {
    id: 'leadership-scale',
    type: 'achievement',
    category: 'Leadership',
    title: 'Multi-Tier Team Leadership',
    description: 'Managed 35-40 direct reports at peak, including managing managers across multiple locations. Implemented Carrot for team recognition and Gusto for HR.',
    keywords: ['leadership', 'management', 'team building', 'hr', 'multi-location', 'direct reports']
  },

  // Code Examples - Custom Development Work
  {
    id: 'code-cto-savings',
    type: 'project',
    category: 'Custom Development',
    title: 'CTO Savings Dashboard',
    description: 'Interactive dashboard component with expandable accordions, amCharts integration for data visualization, search/filter functionality, and Zuar Portal datasource integration. Features parent/child account grouping, comparison mode, and responsive design.',
    keywords: ['javascript', 'dashboard', 'amcharts', 'accordion', 'data visualization', 'css', 'responsive', 'enterprise', 'custom component']
  },
  {
    id: 'code-approvals-sidebar',
    type: 'project',
    category: 'Custom Development',
    title: 'Approval Workflow Sidebar',
    description: 'Custom sidebar component for admin approval workflows and historic summaries messaging. Features collapsible sidebar, Tableau integration for context, CRUD operations for messages, modal state management, and permission-based UI controls.',
    keywords: ['javascript', 'sidebar', 'approvals', 'workflow', 'modal', 'tableau integration', 'crud', 'admin ui', 'css']
  },
  {
    id: 'code-smoke-pdf',
    type: 'project',
    category: 'Custom Development',
    title: 'Smoke Testing PDF Report Generator',
    description: 'Client-side PDF generation using jsPDF and html2canvas with Mapbox GL map integration, amCharts for inflow potential visualization, dynamic defect pages with photo galleries, and progress tracking. Magazine-style layout with responsive design.',
    keywords: ['pdf generation', 'jspdf', 'html2canvas', 'mapbox', 'amcharts', 'reporting', 'javascript', 'data visualization', 'print']
  }
]

export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id)
}

export function getPortfolioItemsByCategory(category: string): PortfolioItem[] {
  return portfolioItems.filter(item => item.category === category)
}

export function getPortfolioItemsByType(type: PortfolioItem['type']): PortfolioItem[] {
  return portfolioItems.filter(item => item.type === type)
}
