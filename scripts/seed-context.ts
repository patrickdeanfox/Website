import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const contextEntries = [
  {
    projectId: 'career-overview',
    projectName: 'Career Overview',
    type: 'note',
    content: 'Patrick has a 21-year career (2005-present) spanning financial services, operations leadership, and analytics/AI. This unique trajectory means he can speak the language of finance, operations, and technology fluently.'
  },
  {
    projectId: 'financial-services',
    projectName: 'Financial Services Background',
    type: 'detail',
    content: 'Started career at Merrill Lynch (2005-2007) and USAA (2009-2012). At USAA, earned FINRA Series 7 (General Securities Representative) and Series 66 (Uniform Combined State Law) licenses, plus Property & Casualty insurance licenses in all 50 states. This background provides deep understanding of regulated industries, compliance requirements, and financial data governance.'
  },
  {
    projectId: 'operations-leadership',
    projectName: 'Operations Leadership',
    type: 'detail',
    content: 'Served as COO twice: Thomas Inventory Services (7.5 years, scaled $3M to $12M, 5M+ units annually) and Propel Electric Bikes (scaled $2M to $8M, 8 to 35 employees, opened 3 locations). Built data pipelines with Python before "data engineering" was a job title. This operations background means Patrick understands the business side of analytics—he knows what it is like to be the person waiting on reports.'
  },
  {
    projectId: 'ai-llm-experience',
    projectName: 'AI/LLM Experience',
    type: 'detail',
    content: 'Patrick has hands-on experience deploying local LLMs (Ollama, Mistral) in Docker containers on Linux. He pioneered LLM integration at Zuar—first employee to deploy production chatbots. Uses MCP (Model Context Protocol) architecture for chatbots connected to data sources, preventing data leaks by only providing page-specific context. This portfolio website includes two AI examples: the Career Advocate chatbot and the Portfolio Chat Assistant.'
  },
  {
    projectId: 'propel-integrations',
    projectName: 'Propel Integration Architecture',
    type: 'detail',
    content: 'At Propel Electric Bikes, product managed custom plugins connecting WordPress/WooCommerce, ShopMonkey (bike services/scheduling), SOS Inventory WMS, Shipmate, and LTL shipping. Goal was near real-time inventory sync across all tools. Built with Python, SQL, PHP, with agency assistance for productization. Also navigated company through COVID lockdowns, opening 3rd location in Wilmington, DE during the pandemic, and built overseas customer success team for email/VM/order support.'
  },
  {
    projectId: 'thomas-python-etl',
    projectName: 'Thomas Python ETL',
    type: 'detail',
    content: 'At Thomas Inventory Services, built custom Python ETL to ingest POs and SOs, convert to Excel files matching inventory system format, generate automated pick lists, and create dynamic Amazon FBA labels based on constantly changing requirements. Eventually integrated with Camelot Excalibur WMS. This was data engineering before the job title existed.'
  },
  {
    projectId: 'leadership-scale',
    projectName: 'Leadership Scale',
    type: 'detail',
    content: 'Managed 35-40 direct reports at peak, including managing managers (multi-tier leadership). Implemented Carrot for team recognition and Gusto for HR. Experience scaling teams across multiple locations and building overseas support teams to optimize costs.'
  },
  {
    projectId: 'industries-served',
    projectName: 'Industries Served',
    type: 'detail',
    content: 'Primary verticals: 3PL/Logistics, Retail & E-commerce (Sales + Operations), SaaS & Professional Services. Zuar clients span healthcare, energy, food service, architecture, wastewater management, workforce analytics, and more. This breadth means Patrick can quickly understand new industry contexts and translate business requirements into technical solutions.'
  },
  {
    projectId: 'unique-value',
    projectName: 'Unique Value Proposition',
    type: 'note',
    content: 'Patrick is one of the few professionals who can read a balance sheet, architect a data pipeline, and deploy an LLM—all in the same conversation. His career arc tells a compelling story: Finance → Operations → Technology → AI. This is not a career of random jumps—each phase built on the previous one, creating a uniquely versatile professional.'
  }
]

async function main() {
  console.log('Seeding context entries...')
  
  // Clear existing entries first
  await prisma.contextEntry.deleteMany({})
  
  for (const entry of contextEntries) {
    await prisma.contextEntry.create({
      data: entry
    })
    console.log(`Created: ${entry.projectName}`)
  }
  
  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
