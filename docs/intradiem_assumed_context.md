# Intradiem Analytics Portal: Comprehensive Context Document

**Document Purpose:** Portfolio enrichment with realistic, research-based assumptions  
**Created:** February 24, 2026  
**Project:** Zuar Portal Analytics Dashboard Suite

---

## Company Background

### About Intradiem

**Intradiem** is a B2B SaaS company specializing in real-time workforce automation for enterprise contact centers. Founded in 1995 and headquartered in Marietta, Georgia, the company serves Fortune 500 clients across healthcare, financial services, insurance, retail, telecommunications, and utilities sectors.

**Core Product:** Dynamic Workforce Orchestration—an AI-powered platform that continuously monitors live operational data to:
- Identify and reclaim idle time for productive use
- Automate staffing adjustments (VTO/VOT)
- Deliver training during natural workflow gaps
- Reduce Average Handle Time (AHT) and improve adherence
- Predict agent burnout and attrition risk

**Market Position:**
- Serves 350,000+ contact center professionals
- $100M-$250M estimated annual revenue
- Raised $65.2M in funding (latest: $35M in November 2021)
- Strategic partnerships with Five9 and Genesys
- Documented customer savings exceeding $400M annually

**Typical Client Profile:**
- Enterprise organizations with 500-10,000+ contact center agents
- Complex multi-channel operations (voice, chat, email)
- High compliance requirements (HIPAA, PCI-DSS, SOC 2)
- Sophisticated WFM (Workforce Management) maturity

---

## Project Overview

### The Business Need

Intradiem's Customer Success and Sales teams needed a unified analytics portal to:

1. **Demonstrate ROI to customers** — Quantify the cost savings and productivity gains delivered by the Intradiem platform in real-time
2. **Identify expansion opportunities** — Surface whitespace (upsell/cross-sell potential) across the installed base
3. **Monitor customer health** — Track maturity progression, NPS trends, and early warning indicators for churn risk
4. **Align internal teams** — Provide consistent metrics across Customer Success, Sales, Customer Experience, and Executive leadership

### Project Scope

| Dimension | Detail |
|-----------|--------|
| **Timeline** | 6-month engagement (Discovery through Production) |
| **Dashboard Pages** | 32 total across 7 functional areas |
| **Data Sources** | 20+ unique data feeds |
| **Active Users** | 175+ across CS, Sales, CX, and Executive teams |
| **Refresh Frequency** | Daily automated refresh at 4:00 AM ET |
| **Platform** | Zuar Portal with custom theming |
| **Data Infrastructure** | Snowflake data warehouse with dbt transformations |

---

## Gap Area 1: Business Context

### Why This Project Existed

**Strategic Driver:** Intradiem was preparing for a growth-stage funding round and needed to demonstrate exceptional customer retention and expansion metrics. Leadership recognized that their existing analytics capabilities—scattered across spreadsheets, Salesforce reports, and ad-hoc SQL queries—couldn't support the rigor required for due diligence.

**Competitive Pressure:** Contact center automation was becoming crowded, with competitors like NICE, Verint, and Calabrio investing heavily in customer success analytics. Intradiem needed to match or exceed the analytical sophistication that enterprise buyers expected.

**Customer Demand:** Enterprise clients were increasingly asking for executive-ready ROI reports they could present to their own leadership. CSMs were spending excessive time manually compiling these reports instead of driving adoption.

### Stakeholder Landscape

| Stakeholder | Role | Primary Concern | Success Metric |
|-------------|------|-----------------|----------------|
| **VP of Customer Success** | Executive Sponsor | Prove customer value at scale | Net Revenue Retention > 115% |
| **Director of Sales Operations** | Co-Sponsor | Pipeline visibility | Whitespace conversion rate |
| **12 Customer Success Managers** | Primary Users | Daily account management | Time saved on reporting |
| **8 Sales Account Executives** | Secondary Users | Upsell identification | Deals sourced from portal |
| **Customer Experience Lead** | Stakeholder | NPS program effectiveness | Response rate & actionability |
| **CFO** | Executive Stakeholder | Financial accuracy | Audit-ready metrics |

### Industry Context

**Contact Center Economics:**
- Average agent fully-loaded cost: $45,000-$65,000/year
- Agent attrition rate industry average: 30-45% annually
- Cost per agent turnover: $10,000-$30,000
- Average contact center operates at 75-85% efficiency
- 1% productivity improvement = $500K+ annual savings for large centers

**Why Analytics Matter:**
Intradiem customers invest $500K-$5M+ annually in workforce automation. They need proof that this investment delivers measurable returns. The portal exists to make that proof undeniable—both for customer retention and for new customer acquisition (as a sales tool).

---

## Gap Area 2: Problem Definition

### The "Before State"

**Customer Success Team (Before):**
- CSMs spent **6-8 hours weekly** compiling manual reports from 5 different systems
- Cost savings calculations were done in **individual Excel workbooks** with inconsistent formulas
- Account health was assessed through **tribal knowledge** rather than standardized scoring
- QBR (Quarterly Business Review) prep took **2-3 days** per customer
- No visibility into which customers were at risk until renewal conversations

**Sales Team (Before):**
- Whitespace analysis was a **quarterly exercise** that took 3 weeks to compile
- AEs relied on **CSM word-of-mouth** to identify expansion opportunities
- No systematic way to prioritize accounts by expansion potential
- Upsell conversations happened reactively, not proactively

**Executive Team (Before):**
- Portfolio-level metrics required **manual aggregation** across CSM territories
- No real-time view of customer health distribution
- Board reporting was a **monthly fire drill** pulling data from multiple sources
- Couldn't answer basic questions like "What's our average customer maturity?" without research

### Quantified Problems

| Problem | Quantified Impact |
|---------|-------------------|
| Manual reporting time | 6-8 hours/CSM/week × 12 CSMs = **312 hours/month wasted** |
| QBR prep time | 2-3 days/customer × 150 customers/quarter = **$180K opportunity cost/year** |
| Missed upsells | Estimated **$2.4M/year** in expansion revenue not captured due to late identification |
| Churn surprise | 23% of churned accounts had **no early warning** in existing systems |
| Data inconsistency | Finance and CS had **$1.2M variance** in reported customer savings due to formula differences |

### Pain Points by Persona

**CSM Pain Points:**
> "I spend my Monday mornings pulling data instead of helping customers."
> "Every customer asks for ROI proof, and I have to build it from scratch each time."
> "I don't know which accounts need attention until something breaks."

**Sales Pain Points:**
> "By the time I hear about an expansion opportunity, someone else has already called."
> "I can't tell which accounts have budget—the data is all over the place."
> "Our whitespace report is outdated the day it's published."

**Executive Pain Points:**
> "I can't get a straight answer on how many customers are healthy vs. at-risk."
> "Preparing for board meetings is a nightmare of spreadsheet reconciliation."
> "We're flying blind on customer value delivery."

---

## Gap Area 3: Solution Approach

### Discovery Process

**Phase 1: Stakeholder Interviews (Weeks 1-2)**
- Conducted **14 one-on-one interviews** with CSMs, AEs, leaders, and executives
- Shadowed **3 CSMs during live account reviews** to understand workflow
- Reviewed existing reports, spreadsheets, and Salesforce dashboards
- Documented **47 unique data requests** that users were making manually

**Phase 2: Requirements Synthesis (Week 3)**
- Grouped requirements into 7 functional areas
- Identified **5 critical metrics** that every persona needed (Cost Savings, Maturity Score, NPS, ARR, Utilization)
- Mapped data sources to requirements
- Prioritized features using MoSCoW framework (Must/Should/Could/Won't)

**Phase 3: Information Architecture (Week 4)**
- Designed role-based navigation structure
- Created **persona-specific landing pages** to reduce cognitive load
- Established progressive disclosure pattern: Overview → Trend → Detail
- Validated IA with 5 representative users through card sorting exercise

### Key Design Decisions & Rationale

#### Decision 1: Four-Quadrant Bubble Chart for Maturity Model
**Context:** Stakeholders needed to quickly assess customer portfolio health across two dimensions—Platform Maturity (technical adoption) and Operational Maturity (process integration).

**Alternatives Considered:**
- Simple data table with sorting
- Stacked bar chart by maturity tier
- Scatter plot without quadrants

**Chosen Solution:** Four-quadrant bubble chart with bubble size representing ARR.

**Rationale:**
- **Pattern Recognition:** Quadrants create instant visual clusters—users can identify "Low Platform, High Operational" accounts at a glance without reading every data point
- **Prioritization:** Size-by-ARR ensures high-value accounts stand out, enabling smart resource allocation
- **Action Orientation:** Each quadrant maps to a specific intervention strategy (e.g., bottom-left = intensive onboarding, top-right = advocacy/referral candidates)
- **Executive Accessibility:** Senior leaders understood the visualization immediately without training

#### Decision 2: Heatmap for Whitespace Analysis
**Context:** Sales needed to identify which products/features customers hadn't yet adopted and prioritize outreach.

**Alternatives Considered:**
- Checklist/matrix with icons
- Percentage completion bars
- Word cloud of opportunity themes

**Chosen Solution:** Conditional-formatted heatmap with color intensity representing opportunity size.

**Rationale:**
- **Density of Information:** 150 accounts × 12 product areas = 1,800 cells. Only a heatmap can show this at a glance
- **Natural Eye Movement:** Red/orange cells draw attention automatically—no training required
- **Comparative Analysis:** Easy to see patterns across accounts (e.g., "No one has Feature X")
- **Sales Efficiency:** AEs can scan their territory in seconds vs. minutes with a table

#### Decision 3: Role-Based Landing Pages
**Context:** With 32 pages, users could easily get lost. Different personas have different starting points.

**Alternatives Considered:**
- Single unified home page with all links
- Search-based navigation
- Alphabetical page listing

**Chosen Solution:** Four distinct landing pages (Home, CS Landing, Sales Landing, CX Landing) with role-specific featured content.

**Rationale:**
- **Reduced Cognitive Load:** CSMs see CS-relevant KPIs immediately, not Sales metrics they don't need
- **Task Orientation:** Landing pages answer "What should I look at today?" not just "What exists?"
- **Adoption Optimization:** New users found their way 40% faster in usability testing
- **Maintenance Scalability:** Adding new pages doesn't clutter the primary navigation

#### Decision 4: Cost-to-Operate (CTO) as Primary Savings Metric
**Context:** Intradiem's value proposition centers on reducing contact center operating costs. Multiple metrics existed (AHT reduction, idle time recovery, shrinkage improvement), but no single "north star."

**Alternatives Considered:**
- Show all component metrics equally
- Use productivity percentage
- Financial savings only (no operational metrics)

**Chosen Solution:** CTO as the unified metric, with drill-down to components.

**Rationale:**
- **Customer Language:** Clients talked about "cost to operate their contact center"—matching their mental model
- **Executive Appeal:** CFOs and VPs care about dollars, not percentages
- **Comparability:** CTO normalizes across different customer sizes ($/agent/month)
- **Proof of Value:** Directly ties to ROI conversations during renewals

#### Decision 5: Daily Action Tracking for CSMs
**Context:** CSMs needed to log and track customer interactions, but the existing Salesforce process was heavyweight.

**Alternatives Considered:**
- Force all logging in Salesforce
- Freeform notes field
- No tracking (honor system)

**Chosen Solution:** Lightweight daily action dashboard with structured categories (Call, Email, Onsite, Escalation) and one-click logging.

**Rationale:**
- **Reduced Friction:** 10 seconds to log vs. 2 minutes in Salesforce
- **Accountability:** Leaders can see activity patterns across the team
- **Correlation Analysis:** Actions can be correlated with outcomes (maturity progression, NPS changes)
- **Gamification Potential:** Action counts visible on leaderboards (future enhancement)

### Technical Approach

**Data Architecture:**
```
Source Systems                    Transformation Layer           Presentation Layer
─────────────────────────────────────────────────────────────────────────────────
Salesforce (CRM)          ──┐
Intradiem Platform        ──┼──►  Snowflake DW  ──►  dbt Models  ──►  Zuar Portal
  - Agent Metrics              (Raw → Staging → Mart)              (32 Dashboards)
  - Action Data           ──┤
Medallia (NPS)            ──┤
Gainsight (CS Platform)   ──┘
```

**Key Technical Decisions:**
- **Snowflake:** Chosen for scalability and separation of storage/compute (cost efficiency)
- **dbt:** Enabled version-controlled, tested transformations with clear lineage
- **Zuar Portal:** Selected for Tableau-like visualization with embedded analytics capabilities
- **Daily Refresh:** Balanced timeliness with cost (real-time unnecessary for strategic decisions)

---

## Gap Area 4: Impact Metrics

### Quantified Outcomes

#### Efficiency Gains

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Weekly reporting time per CSM | 6-8 hours | 1.5 hours | **75% reduction** |
| QBR prep time | 2-3 days | 4 hours | **80% reduction** |
| Time to identify at-risk accounts | 2-4 weeks | Real-time | **95% faster** |
| Whitespace analysis cycle | 3 weeks | Daily refresh | **15x faster** |
| Executive report compilation | 8 hours/month | 15 minutes | **97% reduction** |

#### Business Impact

| Metric | Result | Context |
|--------|--------|---------|
| Portal-sourced pipeline | **$4.8M** | Whitespace deals identified through portal in first 6 months |
| Upsell conversion rate | **2.3x higher** | Deals with portal data vs. without |
| Net Revenue Retention | **118%** | Up from 109% pre-portal (9 percentage point improvement) |
| Churn prediction accuracy | **87%** | Accounts flagged "at-risk" that actually churned |
| Customer ROI report delivery | **Same-day** | Previously 5-7 business days |

#### Adoption Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Weekly active users | 80% of licensed users | **94%** |
| Daily logins (CSM team) | 10/12 CSMs | **12/12 (100%)** |
| Pages per session | 3+ | **4.7** |
| User satisfaction (survey) | 4.0/5.0 | **4.6/5.0** |
| Feature adoption (advanced filters) | 50% | **67%** |

### User Feedback & Testimonials

> **VP of Customer Success:**
> "This portal transformed how we operate. Our CSMs went from reactive firefighting to proactive value delivery. We can now prove ROI to any customer in 60 seconds."

> **Senior CSM (8-year tenure):**
> "I used to dread Mondays because of all the data pulling. Now I actually look forward to my account reviews because everything is right there. I've gotten 10 hours of my life back every month."

> **Director of Sales Operations:**
> "The whitespace heatmap alone has generated more pipeline than our last three marketing campaigns combined. Sales finally has visibility into where the real opportunities are."

> **CFO:**
> "For the first time, Finance and Customer Success are speaking the same language. Our board reporting went from a nightmare to a non-event."

### Business Value Calculation

**Direct Cost Savings:**
- CSM time saved: 12 CSMs × 5 hrs/week × $75/hr × 52 weeks = **$234,000/year**
- QBR prep reduction: 150 QBRs × 16 hrs saved × $75/hr = **$180,000/year**
- Executive reporting: $50,000/year equivalent

**Revenue Impact:**
- Incremental upsell pipeline: $4.8M × 30% win rate = **$1.44M closed**
- Churn prevention: 5 saved accounts × $180K average ARR = **$900K protected**
- Faster sales cycles: 15% reduction in enterprise deal time

**Total First-Year Value: ~$2.8M** against ~$400K total project investment = **7x ROI**

---

## Gap Area 5: Technical Details

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Data Warehouse** | Snowflake | Cloud-native storage and compute |
| **Transformation** | dbt (data build tool) | SQL-based transformation, testing, documentation |
| **Orchestration** | Zuar Runner | ETL pipeline scheduling and monitoring |
| **Visualization** | Zuar Portal | Embedded analytics and dashboard delivery |
| **Semantic Layer** | dbt Metrics + Custom SQL | Consistent metric definitions |
| **Authentication** | SSO (Okta) | Enterprise identity management |
| **Source Systems** | Salesforce, Intradiem Platform, Medallia, Gainsight | Operational data |

### Data Model Architecture

**Star Schema Design:**
```
                    ┌─────────────────┐
                    │  dim_customer   │
                    │  (850 rows)     │
                    └────────┬────────┘
                             │
┌─────────────┐    ┌────────┴────────┐    ┌─────────────┐
│ dim_product │────│  fct_savings    │────│  dim_date   │
│ (24 rows)   │    │  (2.4M rows)    │    │ (3,650 rows)│
└─────────────┘    └────────┬────────┘    └─────────────┘
                             │
                    ┌────────┴────────┐
                    │   dim_agent     │
                    │  (45,000 rows)  │
                    └─────────────────┘
```

**Key Fact Tables:**
- `fct_daily_savings` — Agent-day grain cost savings calculations
- `fct_nps_responses` — Survey response records with scores
- `fct_customer_actions` — CSM activity log
- `fct_usage_events` — Platform adoption telemetry

**Key Dimension Tables:**
- `dim_customer` — Customer master with segmentation attributes
- `dim_product` — Product/feature hierarchy for whitespace
- `dim_maturity_score` — Historical maturity snapshots
- `dim_csm` — CSM territory assignments

### Complex Calculations

**Cost-to-Operate (CTO) Savings Formula:**
```sql
CTO_Savings = 
  (Idle_Time_Recovered_Hours × Hourly_Cost) +
  (AHT_Reduction_Seconds / 3600 × Call_Volume × Hourly_Cost) +
  (Shrinkage_Reduction_Pct × FTE_Count × Annual_Cost / 12) +
  (Attrition_Reduction × Replacement_Cost / 12)
```

**Maturity Score Algorithm:**
```
Platform_Maturity (0-100) =
  (0.30 × Feature_Adoption_Pct) +
  (0.25 × Integration_Completeness) +
  (0.20 × Data_Quality_Score) +
  (0.15 × User_Engagement_Score) +
  (0.10 × API_Utilization)

Operational_Maturity (0-100) =
  (0.35 × Process_Adherence) +
  (0.25 × Training_Completion) +
  (0.20 × Executive_Engagement) +
  (0.20 × Best_Practice_Adoption)
```

### Performance Optimizations

**Challenge:** Initial dashboard load times were 12-15 seconds due to complex joins across 50M+ rows.

**Solutions Implemented:**
1. **Pre-aggregated marts:** Created daily/weekly/monthly rollup tables reducing row counts by 95%
2. **Incremental models:** dbt incremental strategy for append-only fact tables
3. **Materialized views:** Critical metrics pre-computed in Snowflake
4. **Query result caching:** Zuar Portal cache for frequently-accessed dashboards
5. **Partition pruning:** Date-partitioned facts with query hints

**Results:**
- Average dashboard load time: **2.1 seconds** (from 12 seconds)
- 95th percentile response time: **4.8 seconds**
- Concurrent user capacity: **75+ simultaneous users**

### Security & Governance

- **Row-Level Security:** CSMs see only their assigned accounts; Sales sees their territory
- **Column-Level Security:** Sensitive financial data restricted to leadership
- **Audit Logging:** All data access logged for compliance
- **PII Handling:** Agent names hashed, customer contact info excluded
- **SOC 2 Compliance:** Portal infrastructure met SOC 2 Type II requirements

---

## Gap Area 6: User Experience

### User Personas & Needs

#### Persona 1: Sarah, Customer Success Manager
**Demographics:** 4 years at Intradiem, manages 12-15 enterprise accounts

**Goals:**
- Start each day knowing which accounts need attention
- Quickly generate ROI proof for customer meetings
- Track customer progress toward maturity milestones

**Frustrations:**
- "I hate switching between 5 systems to get a full picture"
- "Customers always ask for data I don't have at my fingertips"

**Portal Solution:**
- Daily action dashboard shows priority accounts
- One-click cost savings export for any customer
- Maturity trend visualization with milestone markers

#### Persona 2: Marcus, Sales Account Executive
**Demographics:** 2 years at Intradiem, $2M annual quota, manages 40 accounts

**Goals:**
- Identify which accounts have expansion budget
- Prioritize outreach based on opportunity size
- Understand customer health before sales conversations

**Frustrations:**
- "I find out about opportunities after they've gone cold"
- "CSMs know things I don't—we're not aligned"

**Portal Solution:**
- Whitespace heatmap sorted by opportunity value
- Real-time NPS visibility before customer calls
- Shared view with CSM ensures alignment

#### Persona 3: Jennifer, VP of Customer Success
**Demographics:** 15 years in SaaS, 3 years at Intradiem, manages 12-person team

**Goals:**
- Portfolio-level health visibility
- Forecast retention and expansion
- Demonstrate team value to executive peers

**Frustrations:**
- "I spend too much time aggregating data from my team"
- "I can't tell the board our NRR story without a week of prep"

**Portal Solution:**
- Executive summary with portfolio KPIs
- Maturity distribution showing health trends
- Board-ready exports with consistent formatting

### UX Design Principles Applied

1. **Progressive Disclosure:** Home → Landing → Detail → Deep Dive
2. **Recognition over Recall:** Consistent color coding (green=good, red=attention)
3. **Context Preservation:** Filters persist across page navigation
4. **Glanceable Insights:** KPI cards show trend direction, not just values
5. **Mobile-Conscious:** Key views optimized for tablet use in customer meetings

### Iteration History

**Version 1 (Prototype):**
- 45 pages with flat navigation
- User feedback: "Overwhelming—I don't know where to start"
- Action: Consolidated to 32 pages with hierarchical navigation

**Version 2 (Beta):**
- Maturity Model as data table
- User feedback: "I can't see patterns—takes too long to scan"
- Action: Converted to four-quadrant bubble chart

**Version 3 (Launch):**
- All cost savings shown in percentages
- User feedback: "My CFO doesn't care about percentages—show dollars"
- Action: Added dollar values as primary, percentages as secondary

**Version 4 (Current):**
- Refinements based on 3 months of production usage
- Added: Trend sparklines, comparative filters, mobile view

---

## Gap Area 7: Challenges & Solutions

### Challenge 1: Data Quality Inconsistency
**Problem:** Cost savings calculations from different source systems used different formulas. Finance reported $32M in customer savings; CS reported $28M.

**Root Cause:** Three different teams had built savings calculations independently over 4 years. No single source of truth existed.

**Solution:**
- Convened working group with Finance, CS, and Product
- Documented all existing formulas and identified discrepancies
- Established canonical formula validated by CFO
- Implemented in dbt with automated testing (variance alerts if sources drift)

**Outcome:** Single source of truth. Finance and CS now report identical numbers. Eliminated quarterly reconciliation exercises.

---

### Challenge 2: Stakeholder Alignment
**Problem:** CS wanted deep operational metrics; Sales wanted simple lead scoring. Executives wanted high-level KPIs. Conflicting priorities threatened scope creep.

**Solution:**
- Facilitated joint prioritization session with all stakeholders
- Used "trade-off matrix" to force explicit decisions
- Established phased roadmap: Core KPIs (Phase 1) → Role-specific views (Phase 2) → Advanced analytics (Phase 3)
- Created shared Slack channel for ongoing requirement discussions

**Outcome:** All stakeholders felt heard. Phase 1 delivered on time. Backlog managed transparently.

---

### Challenge 3: User Adoption Resistance
**Problem:** Several senior CSMs were comfortable with their spreadsheet workflows. Initial adoption was only 60% after launch.

**Solution:**
- Identified adoption champions within each team
- Created "Dashboard of the Week" highlight in team meetings
- Built custom views that replicated their exact spreadsheet workflows
- Offered 1:1 training sessions for resistors
- Showed time-savings data: "Sarah saved 6 hours last week"

**Outcome:** Adoption reached 94% within 8 weeks. Resistors became advocates after seeing peers' efficiency gains.

---

### Challenge 4: Performance at Scale
**Problem:** Initial dashboards timed out when querying full historical data (3 years, 50M+ rows).

**Solution:**
- Implemented pre-aggregated mart layer in dbt
- Added intelligent date range defaults (last 90 days)
- Created "summary" and "detail" versions of heavy dashboards
- Worked with Snowflake to optimize warehouse sizing (auto-scaling)

**Outcome:** Load times reduced from 12 seconds to 2.1 seconds average. Zero timeouts in production.

---

### Challenge 5: NPS Data Gaps
**Problem:** Only 70% of customers had NPS data due to survey integration lag. Dashboards showed misleading blanks.

**Solution:**
- Added "Data Confidence" indicator showing data completeness per account
- Created fallback scoring using support ticket sentiment analysis
- Implemented customer nudge campaign to improve survey response rates
- Designed visualizations to clearly distinguish "no data" from "low score"

**Outcome:** Users understood data limitations. Survey response rate improved 15% through visibility. No incorrect conclusions drawn from missing data.

---

## Gap Area 8: Your Role & Contributions

### Role Definition

**Title:** Lead BI Developer / Analytics Consultant

**Reporting:** Dotted line to VP of Customer Success (executive sponsor), collaboration with Director of Data Engineering

**Team Structure:**
- 1 Data Engineer (partner) — Owned Snowflake infrastructure and source integrations
- 1 UX Designer (part-time) — Contributed to visual design system and color palette
- 1 Project Manager — Coordinated stakeholder communication and timeline

### Specific Contributions

#### Requirements & Discovery (Weeks 1-4)
- **Led 14 stakeholder interviews** across CS, Sales, CX, and Executive teams
- **Shadowed 3 CSMs** during live customer interactions to understand workflow
- **Documented 47 unique data requirements** and prioritized using MoSCoW framework
- **Designed information architecture** for 32-page portal structure
- **Created wireframes** for 8 key dashboard pages

#### Data Modeling & Logic (Weeks 5-10)
- **Defined business logic** for all core metrics (CTO Savings, Maturity Score, Whitespace)
- **Authored 15 dbt models** in collaboration with data engineer
- **Established data quality tests** (100+ test cases) ensuring formula accuracy
- **Resolved Finance/CS data discrepancy** through formula standardization initiative

#### Dashboard Development (Weeks 7-16)
- **Designed and built all 32 dashboard pages** in Zuar Portal
- **Created custom visualizations** including four-quadrant maturity model and whitespace heatmap
- **Implemented row-level security** for 4 distinct user roles
- **Optimized query performance** achieving 2.1-second average load time

#### Change Management & Adoption (Weeks 14-24)
- **Conducted 6 training sessions** for different user groups
- **Created user documentation** (quick-start guide, metric glossary)
- **Established feedback loop** via Slack channel with 200+ suggestions captured
- **Delivered weekly office hours** during first month post-launch

### Skills Demonstrated

**Technical Skills:**
- Zuar Portal development and customization
- SQL (advanced: window functions, CTEs, recursive queries)
- dbt for transformation and testing
- Snowflake data warehouse design
- Dashboard performance optimization
- Data modeling (dimensional, star schema)

**Analytical Skills:**
- Requirements gathering and synthesis
- Metric definition and standardization
- User research and persona development
- Information architecture design

**Soft Skills:**
- Stakeholder management across multiple teams
- Executive communication and presentation
- Change management and adoption driving
- Cross-functional collaboration
- Conflict resolution (data definition disputes)

### Decision Authority

**Decisions I Made:**
- Visualization type selection for all dashboards
- Information architecture and navigation structure
- Metric display format (primary/secondary values)
- Color palette and visual hierarchy
- Performance optimization approach

**Decisions Made Collaboratively:**
- Core metric definitions (with Finance and CS)
- Data refresh frequency (with Data Engineering)
- Security model (with IT and Compliance)
- Phased roadmap prioritization (with all stakeholders)

**Decisions Made by Others:**
- Technology stack selection (pre-existing)
- Budget and timeline constraints (executive)
- Source system integrations (Data Engineering)

---

## Project Timeline

```
Week 1-2:   Discovery & Interviews
Week 3-4:   Requirements Synthesis & IA Design
Week 5-6:   Data Model Design & Logic Definition
Week 7-10:  Core Dashboard Development (Phase 1)
Week 11-12: User Testing & Iteration
Week 13-14: Phase 1 Launch (Core Dashboards)
Week 15-18: Phase 2 Development (Role-Specific Views)
Week 19-20: Phase 2 Launch
Week 21-24: Optimization, Training, Adoption Driving
```

---

## Lessons Learned & Reflections

### What Worked Well
1. **Early stakeholder alignment** prevented scope creep and rework
2. **Persona-based design** drove high adoption rates
3. **Iterative approach** allowed course-correction based on feedback
4. **Performance focus** from day one avoided post-launch crises

### What I'd Do Differently
1. **Involve Finance earlier** — Data discrepancy could have been caught in Week 2
2. **Build adoption metrics into portal** — Had to add usage tracking retroactively
3. **Create video tutorials** — Written docs weren't consumed as hoped
4. **Prototype earlier with real data** — Wireframes didn't reveal performance issues

### Career Growth from This Project
- First time owning **end-to-end BI delivery** at enterprise scale
- Developed **executive communication skills** through board-level presentations
- Learned **change management** is as important as technical delivery
- Built expertise in **contact center domain** — valuable specialization

---

## Appendix: Metric Definitions

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **CTO Savings** | Monthly cost reduction delivered by Intradiem platform | Sum of idle time recovery + AHT reduction + shrinkage reduction + attrition impact, in dollars |
| **Maturity Score** | Composite measure of platform and operational adoption | Weighted average of 10 sub-metrics, 0-100 scale |
| **Net Promoter Score** | Customer loyalty indicator | % Promoters (9-10) − % Detractors (0-6) |
| **Whitespace Value** | Estimated expansion opportunity | Unadopted products × average deal size × win probability |
| **Health Score** | Account risk indicator | Combination of usage, engagement, NPS, and support trends |
| **Active Work Time** | Percentage of paid time agents are productive | (Total Paid Hours − Idle − Break − Aux) / Total Paid Hours |

---

*This document provides comprehensive context for portfolio presentation. All assumptions are realistic based on Intradiem's public information, industry benchmarks, and common B2B SaaS analytics patterns.*
