# Intradiem Portal - Comprehensive Context Document

## Project Overview

**Client:** Intradiem  
**Portal URL:** https://intradiem-portal.zuarbase.net  
**Platform:** Zuar Portal (hosted on zuarbase.net)  
**Project Manager:** Greg Rossi (greg.rossi@zuar.com)  
**Export Date:** February 24, 2026

---

## 1. Business Context

### About Intradiem
Intradiem is a leading **workforce management (WFM) and contact center automation company** that provides real-time agent guidance and schedule optimization solutions. Their core product sends automated offers to contact center agents for schedule changes, training opportunities, and productivity improvements.

### The Analytics Challenge
Intradiem needed a centralized analytics portal to:
- Track **Customer Touchpoint Outcomes (CTO)** across their client base
- Monitor **cost savings** delivered to customers by industry and account
- Measure **agent engagement** with workforce automation offers
- Track **Customer Experience (CE)** metrics including NPS scores
- Provide role-based access for different internal teams (Sales, CS, HR, Leadership)

### Portal Scale
| Metric | Value |
|--------|-------|
| Total Pages | 32 |
| Total Datasources | 20 |
| Screenshots Captured | 32 |
| Tag Categories | 8 |
| Access Groups | 3 distinct patterns |

---

## 2. Problem Definition

### Business Problems Solved

1. **Scattered Analytics:** Customer success, sales, and leadership teams previously accessed data through multiple disconnected reports and Tableau workbooks.

2. **No Unified Cost Savings View:** Intradiem's value proposition centers on cost savings for customers, but there was no single source of truth for tracking savings by account, industry, or time period.

3. **Limited Customer Health Visibility:** CSMs lacked real-time visibility into customer touchpoint outcomes and maturity progression.

4. **No NPS Integration:** Customer experience tracking was handled separately with no integration into the analytics workflow.

5. **Access Control Complexity:** Different teams needed different views of the same underlying data with appropriate security restrictions.

---

## 3. Solution Approach

### Portal Architecture

**Page Taxonomy - 8 Tag Categories:**

| Tag | Pages | Purpose |
|-----|-------|---------|
| CTO | 7 | Customer Touchpoint Outcomes - daily trends, cost savings, maturity model |
| CE | 4 | Customer Experience - NPS tracking (new Feb 2026 initiative) |
| Savings | 4 | Financial savings dashboards - executive, sales leader views |
| Whitespace | 2 | Sales whitespace/opportunity analysis |
| Agent Engagement | 2 | Call center agent offer/response metrics |
| AUX | 2 | AUX state (agent idle/away time) analytics |
| hr | 1 | OKR tracking (HR-restricted) |
| admin | 1 | Subscription management |
| (untagged) | 9 | Landing pages, dev pages, utility pages |

### Key Pages by Complexity

| Page Name | Block Count | Notes |
|-----------|-------------|-------|
| Home | 13 | Primary navigation hub |
| **Whitespace Summary** | **11** | Most complex page - sales opportunity analysis, has 1 hidden block |
| Customer Actions Daily Trend - Admin | 6 | Has onPageLoad JavaScript for custom interactivity |
| Customer Actions Daily Trend - CSM | 6 | Role-specific view of same data |
| Cost Savings Trend by Account | 6 | Most recently updated (Feb 24, 2026) |
| Cost Savings Trend by Industry | 5 | Industry segmentation view |
| **Executive Summary** | **5** | Sophisticated 3-column layout with narrow right sidebar |
| NPS Overview | 4 | Most complex CE page, updated same day as export |

### Access Control Architecture

Three distinct access patterns implemented:

1. **Open Access** (22 pages) - Visible to all authenticated users
   - Groups: `[]` (empty array)
   
2. **Sales/Leadership Group** (5 pages) - Savings, AUX, Sales Leader dashboards
   - Group ID: `8e01304f-5e24-4c37-8863-ca92dbf530bf`
   - Restricted pages: Savings Overview, Sales Leader Dashboard, Executive Summary, Tier 1 Messages 13 Month, Workforce Automation
   
3. **HR Group** (1 page) - OKR tracking
   - Group ID: `1d2c32e8-308a-4b60-872b-e88acd6537cf`
   - Restricted pages: OKR

---

## 4. Impact Metrics

### Quantifiable Value Delivered

| Metric | Value | Evidence |
|--------|-------|----------|
| Pages Deployed | 32 | Full production portal |
| Datasources Integrated | 20 | Comprehensive data layer |
| User Groups Served | 4+ | Sales, CS, HR, Leadership, Portal Admins |
| Development Timeline | 7 months | Jul 2025 - Feb 2026 |
| Active Development | Ongoing | NPS pages added Feb 2026 |

### Business Impact
- **Unified Analytics:** Single portal serving multiple internal teams
- **Cost Savings Visibility:** Real-time tracking by account, industry, and trend
- **Customer Health Monitoring:** CTO and maturity model tracking
- **NPS Integration:** New Feb 2026 initiative bringing CE metrics into the same platform
- **Role-Based Access:** Appropriate data visibility for each team

---

## 5. Technical Details

### Platform Configuration

**Theme Template (consistent across all pages):**
```json
{
  "header": true,
  "leftSidebar": true,
  "rightSidebar": false,
  "footer": false
}
```

**Grid Layout System:**
- Responsive with 3 breakpoints: `lg`, `md`, `sm`
- Fluid layout with %-based sizing
- Cell sizes vary: 0.5, 1, 2 (finer cells for complex pages)

**CSS Pattern (shared across chart pages):**
```css
.chart-wrapper {
  background-color: #ffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
```

### User Configuration

**Admin User:**
- Name: admin (Greg Rossi)
- Email: greg.rossi@zuar.com
- Is Admin: Yes
- Groups: HR, Portal Admins, Zuar Team
- Auth Source: LOCAL (local account, not SSO/LDAP)

### JavaScript Usage
- Only 1 page uses `onPageLoad` JavaScript: **Customer Actions Daily Trend - Admin**
- Suggests custom interactivity or data manipulation on load

---

## 6. User Experience

### Portal Personas

1. **Customer Success Managers (CSMs)**
   - Primary pages: CTO By Customer, Customer Actions Daily Trend - CSM, Maturity Model
   - Focus: Customer health, adoption tracking, daily touchpoint analysis

2. **Sales Leadership**
   - Primary pages: Whitespace Summary, CSM/AE Dashboard, Sales Leader Dashboard
   - Focus: Expansion opportunities, account whitespace, team performance

3. **Executive Leadership**
   - Primary pages: Executive Summary, Savings Overview, Cost Savings Trends
   - Focus: High-level savings metrics, industry/account breakdowns, strategic insights

4. **HR Team**
   - Primary pages: OKR (restricted access)
   - Focus: Objective and key results tracking

5. **Customer Experience Team**
   - Primary pages: NPS Overview, Customer NPS Summary, Customer NPS Explore
   - Focus: NPS tracking, customer sentiment analysis

### Navigation Structure
- Left sidebar navigation (non-collapsible) using Font Awesome icons
- Landing pages for each major section (CE Landing, Sales Landing, CS Landing)
- Tag-based page organization visible in sidebar

---

## 7. Challenges & Solutions

### Challenge 1: Role-Based Access at Scale
**Problem:** Multiple teams need different views with appropriate security  
**Solution:** Implemented 3-tier access control using Zuar Portal's group-based permissions

### Challenge 2: Complex Data Visualization
**Problem:** Whitespace analysis requires 11 different data blocks  
**Solution:** Designed sophisticated grid layout with hidden blocks for conditional display

### Challenge 3: NPS Integration Mid-Project
**Problem:** Customer Experience tracking was added as a priority in Feb 2026  
**Solution:** Created dedicated CE section with 4 pages in under 3 weeks (Feb 3-24, 2026)

### Challenge 4: Admin vs. User Views
**Problem:** Same underlying data needs different presentation for admins vs. CSMs  
**Solution:** Dual pages (Customer Actions Daily Trend - Admin/CSM) with JavaScript customization on admin view

### Technical Artifacts
- Dev/test pages present: "New Pagesdfas" (typo slug), "DEV: Savings : By Account", "New Page"
- Block extraction errors in export (HTML content requires live session to render)

---

## 8. My Role

### Responsibilities
As the **Zuar Portal Implementation Lead** for the Intradiem project, I was responsible for:

1. **Portal Architecture Design**
   - Designed 8-category tag taxonomy for 32 pages
   - Implemented 3-tier access control model
   - Created responsive grid layouts with multiple breakpoints

2. **Data Integration**
   - Connected 20 datasources to the portal
   - Ensured data consistency across CTO, Savings, and CE sections

3. **Page Development**
   - Built complex pages including Whitespace Summary (11 blocks), Executive Summary (5 blocks)
   - Implemented custom JavaScript for admin-specific functionality

4. **Stakeholder Management**
   - Coordinated with Sales, CS, HR, and Leadership teams on requirements
   - Managed rapid NPS integration initiative (Feb 2026)

5. **Ongoing Maintenance**
   - Active development and updates through Feb 24, 2026
   - Cost Savings by Account updated same day as export

### Development Timeline

| Period | Activity |
|--------|----------|
| Jul 14, 2025 | Portal launch - oldest pages created (Savings Overview, Offers & Response Rates, Tier 1 Messages, Whitespace Summary) |
| Jul-Aug 2025 | Core pages built out (Agent Engagement, AUX, Savings) |
| Oct 2025 | CTO section built (Cost Savings by Account, CTO Last 90 Days, CTO By Customer) |
| Oct-Nov 2025 | Admin tools added (Subscription Management, OKR) |
| Dec 2025 | Cost Savings by Industry added; Executive Summary updated |
| Jan 2026 | Home page created; Workforce Automation updated |
| **Feb 2026** | **Major CE/NPS expansion - 4 new pages; Landing pages added; Release Notes added** |
| Feb 24, 2026 | Export day - NPS Overview and Cost Savings by Account updated same day |

---

## Appendix: Full Page Inventory

### CTO Group (Customer Touchpoint Outcomes) - 7 Pages
| Page | Blocks | Created | Updated |
|------|--------|---------|---------|
| CTO By Customer | 3 | Oct 7, 2025 | Feb 20, 2026 |
| Cost Savings Trend by Industry | 5 | Dec 22, 2025 | Dec 22, 2025 |
| Customer Actions Daily Trend - Admin | 6 | Oct 23, 2025 | Jan 21, 2026 |
| Maturity Model | 2 | Nov 5, 2025 | Jan 12, 2026 |
| Customer Actions Daily Trend - CSM | 6 | Oct 24, 2025 | Dec 15, 2025 |
| CTO Last 90 Days | 3 | Oct 6, 2025 | Dec 15, 2025 |
| Cost Savings Trend by Account | 6 | Oct 6, 2025 | **Feb 24, 2026** |

### CE Group (Customer Experience / NPS) - 4 Pages
| Page | Blocks | Created | Updated |
|------|--------|---------|---------|
| Customer NPS Explore | 2 | Feb 3, 2026 | Feb 13, 2026 |
| Customer NPS Summary | 2 | Feb 22, 2026 | Feb 23, 2026 |
| NPS Overview | 4 | Feb 13, 2026 | **Feb 24, 2026** |
| CE Landing | 1 | Feb 3, 2026 | Feb 3, 2026 |

### Savings Group - 4 Pages
| Page | Blocks | Created | Updated | Access |
|------|--------|---------|---------|--------|
| Savings Overview | 1 | Jul 14, 2025 | Aug 8, 2025 | Restricted |
| Sales Leader Dashboard | 3 | Jul 28, 2025 | Jul 31, 2025 | Restricted |
| Executive Summary | 5 | Jul 23, 2025 | Dec 2, 2025 | Restricted |
| Whitespace Summary | 11 | Jul 14, 2025 | Feb 18, 2026 | Open |

### Other Groups
| Tag | Page | Blocks | Access |
|-----|------|--------|--------|
| Whitespace | CSM/AE Dashboard | 2 | Open |
| Agent Engagement | Offers & Response Rates | 1 | Open |
| Agent Engagement | Late Adjustments | 1 | Open |
| AUX | Tier 1 Messages 13 Month | 2 | Restricted |
| AUX | Workforce Automation | 1 | Restricted |
| hr | OKR | 1 | HR Restricted |
| admin | Subscription Management | 1 | Open |
