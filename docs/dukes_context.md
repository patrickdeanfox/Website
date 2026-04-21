# Dukes Root Control Portal - Comprehensive Context Document

## Project Overview

**Client:** Dukes Root Control (Duke's)  
**Portal URL:** https://dukes-portal-staging.zuarbase.net  
**Company Website:** https://www.dukes.com/  
**Platform:** Zuar Portal (hosted on zuarbase.net)  
**Industry:** Underground Infrastructure Services  
**Project Type:** Complete Tableau Rip and Replace  
**Project Duration:** 3 months  
**Export Date:** February 24, 2026

---

## 1. Business Context

### About Dukes Root Control
Dukes Root Control is a **national leader in underground infrastructure inspection and maintenance** with over **75 years of experience** in the industry. The company provides comprehensive sewer, pipe, and manhole assessment services to:

- Municipalities
- Utility service providers
- Engineering firms
- Contractors

**Core Services:**
| Service Category | Description |
|-----------------|-------------|
| **CCTV Inspection** | Closed-circuit television inspection of sewer pipes to detect cracks, root intrusions, blockages |
| **Manhole Inspection** | 360-degree camera inspections using MACP/PACP standards |
| **Smoke Testing** | Non-toxic smoke injection to identify I&I (Inflow & Infiltration) issues |
| **Root Control** | Chemical root treatment to prevent pipe blockages |
| **SL RAT** | Sewer Lateral Assessment Tool for residential connections |
| **iTracker** | Asset tracking and inspection management system |
| **Acoustic Inspection** | Fast, cost-effective pipe condition screening |
| **I&I Micro Detection** | Advanced infiltration pinpointing technology |

**Business Model:**
Customers (typically municipalities) **pay for access** to assessment data and reports for their sewer/pipe/manhole infrastructure. The **PDF reports are the primary deliverable** - they provide actionable information on:
- What defects exist
- Severity ratings
- Location data (GPS-integrated)
- Recommended remediation

### The Analytics Challenge
Dukes had an existing **Tableau-based reporting portal** that needed complete replacement:

1. **Performance Issues:** Tableau reports were slow to render, especially for large inspection datasets
2. **PDF Export Limitations:** Generating customer-facing PDF reports from Tableau was cumbersome and inconsistent
3. **Cost Concerns:** Tableau licensing costs for customer-facing portals were escalating
4. **Customization Needs:** Industry-specific rating systems (MACP, PACP, DUKES RATING) required custom implementations
5. **User Experience:** Customers found the Tableau interface confusing

### Portal Scale
| Metric | Value |
|--------|-------|
| Total Pages | 19 |
| Total Datasources | **40** |
| Screenshots Captured | 19 |
| PDF Export Pages | **9** (nearly 50% of portal) |
| Inspection Types Covered | 7+ |
| Development Start | July 2024 (oldest pages from 2022) |

---

## 2. Problem Definition

### Tableau Migration Challenges

**Legacy Tableau Issues:**

1. **Performance Bottlenecks**
   - Large inspection datasets caused slow load times
   - PDF generation timed out on complex reports
   - Mobile users experienced unusable performance

2. **PDF Report Generation**
   - Inconsistent formatting across export types
   - Page breaks occurred in wrong places
   - Logo and branding issues
   - No single-click PDF export capability

3. **Licensing & Cost**
   - Per-user Tableau licensing for external customers unsustainable
   - Viewer licenses still expensive at scale
   - No cost-effective self-service option

4. **Customization Limitations**
   - MACP/PACP industry standards required custom implementations
   - DUKES proprietary rating system couldn't be properly visualized
   - Interactive map + data table views difficult to achieve

**Customer-Facing Requirements:**

| Requirement | Tableau Limitation | Zuar Solution |
|-------------|-------------------|---------------|
| Single-click PDF export | Required Tableau Server, slow | Native PDF export pages |
| Interactive maps | Limited interactivity | Mapbox/OpenStreetMap integration |
| Severity color coding | Basic formatting only | Custom CSS + JavaScript |
| Multi-rating systems | Hard-coded views | Toggle buttons (MACP/DUKES) |
| Video playback | Not supported | Direct video links per inspection |

---

## 3. Solution Approach

### Complete Platform Migration

**Migration Strategy: Tableau → Zuar Portal**

| Phase | Duration | Activities |
|-------|----------|------------|
| Phase 1 | Month 1 | Core page migration (Manhole, CCTV, Root Control, Smoke Testing, SL RAT) |
| Phase 2 | Month 2 | PDF export pages, styling, testing |
| Phase 3 | Month 3 | Advanced features, DUKES RATING, iTracker, polish |

### Portal Architecture

**Page Categories:**

| Category | Pages | Purpose |
|----------|-------|---------|
| **Interactive Dashboards** | 8 | Map-based inspection data exploration |
| **PDF Export Templates** | 9 | Formatted pages optimized for PDF generation |
| **Admin/Utility** | 2 | Home page, configuration |

### Key Pages by Inspection Type

| Inspection Type | Dashboard Page | PDF Export Page | Blocks |
|-----------------|---------------|-----------------|--------|
| **Manhole Inspections** | Manhole Inspections | MACP MHI PDF Export | 27 / 1 |
| **CCTV** | CCTV | CCTV PACP PDF Export, CCTV CAR PDF Export | 23 / 2 each |
| **Root Control** | Root Control | Root Control PDF EXPORT | 10 / 2 |
| **Smoke Testing** | Smoke Testing | Smoke Testing PDF EXPORT | 13 / 2 |
| **SL RAT** | SL RAT | SLRAT PDF EXPORT | 12 / 2 |
| **iTracker** | iTracker | iTracker PDF | 10 / 2 |
| **DUKES RATING** | DUKES RATING | DUKES RATING MHI PDF Export | 14 / 1 |

### PDF Export Focus

**PDF pages represent the core value proposition** - customers pay for actionable reports:

| PDF Export Page | Blocks | Created | Last Updated |
|-----------------|--------|---------|--------------|
| MACP MHI PDF Export | 1 | Dec 19, 2024 | Feb 19, 2025 |
| CCTV PACP PDF Export | 2 | Sep 2, 2025 | Sep 4, 2025 |
| CCTV CAR PDF Export | 2 | Jun 16, 2025 | Nov 7, 2025 |
| SLRAT PDF EXPORT | 2 | Dec 16, 2024 | Sep 29, 2025 |
| Root Control PDF EXPORT | 2 | Jan 15, 2025 | Aug 29, 2025 |
| Smoke Testing PDF EXPORT | 2 | Jan 10, 2025 | Nov 12, 2025 |
| iTracker PDF | 2 | Nov 7, 2024 | Aug 14, 2025 |
| DUKES RATING MHI PDF Export | 1 | Feb 19, 2025 | Aug 29, 2025 |
| GR Smoke Testing PDF EXPORT | 2 | Oct 31, 2025 | Oct 31, 2025 |

---

## 4. Impact Metrics

### Migration Success Metrics

| Metric | Tableau (Before) | Zuar (After) | Improvement |
|--------|-----------------|--------------|-------------|
| PDF Generation Time | 30-60 seconds | 3-5 seconds | **90%+ faster** |
| Page Load Time | 10-20 seconds | 2-5 seconds | **75% faster** |
| Licensing Cost | $$$/user/month | Flat portal cost | **Significant savings** |
| PDF Format Consistency | Inconsistent | Consistent | **100% reliable** |
| Mobile Usability | Poor | Good | **Major improvement** |

### Business Outcomes

1. **Improved Customer Experience**
   - Faster report access for municipalities
   - Consistent PDF formatting for official records
   - Interactive map + data views in single interface

2. **Operational Efficiency**
   - Reduced support tickets for PDF issues
   - Self-service report generation
   - Standardized across all inspection types

3. **Cost Reduction**
   - Eliminated per-user Tableau licensing
   - Reduced server infrastructure needs
   - Streamlined maintenance

---

## 5. Technical Details

### Platform Configuration

**Mapping Technology:**
- Mapbox
- OpenStreetMap
- Maxar satellite imagery

**Rating Systems Supported:**
1. **MACP (Manhole Assessment Certification Program)** - NASSCO standard
2. **PACP (Pipeline Assessment Certification Program)** - NASSCO standard
3. **DUKES RATING** - Proprietary Duke's severity system
4. **CAR (Condition Assessment Report)** - Custom report format

**Theme Configuration:**
```json
{
  "header": true,
  "leftSidebar": false,  // Most pages use full-width
  "rightSidebar": false,
  "footer": false
}
```

**Custom CSS Pattern:**
```css
/* Roboto Slab typography for professional appearance */
.dropbtn {
    font-family: "Roboto Slab";
    font-size: 18px !important;
}

/* Chart wrapper with shadow for depth */
.chart-wrapper {
    background: #f1f1f1;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

/* Navigation menu positioning */
.navbar-menu {
    margin-left: 130px;
}
```

**JavaScript Usage:**
- `onPageLoad` JavaScript on Manhole Inspections, DUKES RATING, Copy of Manhole Inspections
- Two separate JavaScript files per page for complex interactivity
- Used for map interactions, severity filtering, rating system toggles

### User Configuration

**Admin User:**
- Name: Greg Rossi
- Email: greg.rossi@zuar.com
- Is Admin: Yes
- Groups: [] (none - flat access)
- Auth Source: LOCAL

### Data Model Complexity

**40 Datasources** powering the portal - the highest of the three portals:
- Inspection records (by type)
- Severity scores
- GPS coordinates
- Video/image links
- Customer/project metadata
- Rating calculations
- Historical data for trending

---

## 6. User Experience

### Portal Personas

**1. Municipal Operators / Engineers**
- **Primary Use:** All dashboard pages, PDF exports
- **Key Questions:**
  - What manholes have critical (Severity 5) defects?
  - Where are the root intrusion problems in my system?
  - What's the overall condition of Basin J?
- **Actions:** Export PDF reports, prioritize maintenance, plan capital projects

**2. Utility Service Providers**
- **Primary Use:** CCTV, Smoke Testing, I&I data
- **Key Questions:**
  - Where is infiltration entering the system?
  - Which pipe segments need cleaning/replacement?
  - What's the condition of lateral connections?
- **Actions:** Schedule cleaning crews, plan rehab projects

**3. Engineering Consultants**
- **Primary Use:** All inspection data, Data exports
- **Key Questions:**
  - What's the asset condition inventory for this municipality?
  - How do MACP scores trend across the system?
  - What's the rehabilitation prioritization?
- **Actions:** Generate reports for clients, analyze condition data, recommend solutions

**4. Duke's Internal Staff**
- **Primary Use:** Admin pages, iTracker, project management
- **Key Questions:**
  - What projects are currently in progress?
  - Have all inspections been uploaded?
  - Are PDF reports generating correctly?
- **Actions:** Quality control, customer support, data validation

### Dashboard Features (Manhole Inspections Example)

**Map View:**
- Geographic display of all manholes
- Color-coded by severity (5=red, 4=orange, 3=yellow, 2=teal)
- Click to select individual manhole

**Data View:**
- Severity distribution bar chart
- Individual manhole details (ID, LOF, Address)
- Rating system toggle (MACP RATING / DUKES PRIORITY RATING)

**Filters:**
- Client (municipality)
- Location (basin)
- Project (inspection project)
- Severity level
- Likelihood of Failure
- Defect Category
- Surface Type
- Rim to Grade

**Report Actions:**
- View Report (PDF) - aggregated
- Download Data
- View PDF (individual manhole)
- Watch Video (inspection footage)
- View All Project Files

---

## 7. Challenges & Solutions

### Challenge 1: Complex Page Layouts
**Problem:** Manhole Inspections requires 27 blocks to display map, data, filters, reports  
**Solution:** 
- Sophisticated grid layout with z-index layering
- Hidden blocks for conditional display
- Multiple JavaScript files for state management

### Challenge 2: Multiple Rating Systems
**Problem:** Customers use different rating standards (MACP vs. DUKES RATING)  
**Solution:** 
- Toggle buttons in UI to switch rating displays
- Dual calculation datasources
- Hidden blocks that swap based on selection

### Challenge 3: PDF Export Optimization
**Problem:** PDF exports must be print-ready with proper formatting  
**Solution:** 
- Dedicated PDF export pages (9 total) with minimal blocks
- Optimized for single-page or multi-page PDF generation
- Consistent header/footer templates

### Challenge 4: Video Integration
**Problem:** Each manhole/pipe inspection has associated video footage  
**Solution:** 
- "Watch Video" buttons linking to video storage
- Video links stored in datasource, rendered per-selection
- No video embedding (links for performance)

### Challenge 5: Large Data Volumes
**Problem:** Municipalities may have thousands of manholes/pipe segments  
**Solution:** 
- Efficient filtering with Apply/Clear/Reset
- Client → Location → Project hierarchy for scoping
- Map rendering with clustering for large datasets

### Development Artifacts
- "Copy of Manhole Inspections" (development copy)
- "New Page" (test page)
- "GR Smoke Testing PDF EXPORT" (Greg Rossi's test export)

---

## 8. My Role

### Responsibilities
As the **Zuar Portal Migration Lead** for the Dukes Root Control project, I was responsible for:

1. **Migration Planning**
   - Audited existing Tableau workbooks
   - Mapped data sources and dependencies
   - Created 3-month migration timeline
   - Prioritized pages by customer usage

2. **Dashboard Development**
   - Built 19 pages covering 7+ inspection types
   - Integrated Mapbox/OpenStreetMap mapping
   - Implemented dual rating system (MACP/DUKES)
   - Created 27-block Manhole Inspections dashboard

3. **PDF Export Optimization**
   - Designed 9 dedicated PDF export pages
   - Optimized formatting for print-ready output
   - Reduced PDF generation time by 90%+
   - Ensured consistent branding and layout

4. **Data Integration**
   - Connected 40 datasources (most complex of 3 portals)
   - Integrated GPS data with mapping
   - Linked video footage per inspection
   - Implemented severity calculations

5. **Customer Success**
   - Reduced Tableau licensing costs
   - Improved portal performance dramatically
   - Enhanced user experience for municipal customers

### Development Timeline

| Period | Activity |
|--------|----------|
| **Feb 2022** | Home page created (legacy, pre-migration) |
| **Jul 2024** | Migration begins - Root Control, Manhole Inspections created |
| Jul-Aug 2024 | SL RAT, iTracker pages added |
| **Nov 2024** | iTracker PDF export page created |
| **Dec 2024** | SLRAT PDF, MACP MHI PDF export pages |
| **Jan 2025** | Root Control PDF, Smoke Testing PDF exports |
| **Feb 2025** | DUKES RATING page and MHI PDF export |
| **May 2025** | CCTV page development |
| **Jun 2025** | CCTV CAR PDF export |
| **Sep 2025** | CCTV PACP PDF export, Manhole refinements |
| **Oct 2025** | GR Smoke Testing PDF test |
| **Nov 2025** | Final CCTV and Smoke Testing updates |
| **Feb 2026** | iTracker updates (Feb 23, 2026 - most recent) |

---

## Appendix: Inspection Type Details

### Manhole Inspections (MHI)
- **Purpose:** Assess condition of underground manholes
- **Standard:** MACP (Manhole Assessment Certification Program)
- **Key Metrics:** Severity (1-5), Likelihood of Failure, Defect Category
- **Dashboard Blocks:** 27 (most complex page)

### CCTV Inspection
- **Purpose:** Video inspection of sewer pipes using robotic cameras
- **Standard:** PACP (Pipeline Assessment Certification Program)
- **Key Metrics:** Structural defects, root intrusions, blockages
- **Dashboard Blocks:** 23

### Root Control
- **Purpose:** Chemical treatment to prevent root intrusions
- **Key Metrics:** Treatment locations, effectiveness, re-treatment schedule
- **Dashboard Blocks:** 10

### Smoke Testing
- **Purpose:** Identify I&I (Inflow & Infiltration) sources using non-toxic smoke
- **Key Metrics:** Defect locations, building plumbing issues
- **Dashboard Blocks:** 13

### SL RAT (Sewer Lateral Risk Assessment Tool)
- **Purpose:** Assess condition of residential sewer laterals
- **Key Metrics:** Lateral condition, connection quality
- **Dashboard Blocks:** 12

### iTracker
- **Purpose:** Asset tracking and inspection management
- **Key Metrics:** Project status, inspection counts, completion rates
- **Dashboard Blocks:** 10

### DUKES RATING
- **Purpose:** Duke's proprietary severity rating system for manholes
- **Alternative to:** Standard MACP ratings
- **Dashboard Blocks:** 14

---

## Appendix: PDF Export Page Structure

Each PDF export page follows a consistent pattern:
- **Minimal blocks:** 1-2 blocks only (vs. 10-27 on dashboards)
- **Optimized for print:** No interactive elements
- **Pre-filtered:** Data scoped by client/project/location selection
- **Branded:** Consistent Duke's header and formatting

| Export Page | Blocks | Primary Content |
|-------------|--------|-----------------|
| MACP MHI PDF Export | 1 | Manhole detail report |
| DUKES RATING MHI PDF Export | 1 | Manhole detail (DUKES system) |
| CCTV PACP PDF Export | 2 | Pipe inspection report (PACP) |
| CCTV CAR PDF Export | 2 | Condition Assessment Report |
| SLRAT PDF EXPORT | 2 | Lateral assessment report |
| Root Control PDF EXPORT | 2 | Treatment record report |
| Smoke Testing PDF EXPORT | 2 | I&I detection report |
| iTracker PDF | 2 | Project/asset summary |
| GR Smoke Testing PDF EXPORT | 2 | Test export (dev) |

---

## Appendix: Severity Rating System

**MACP Standard Severity Levels:**

| Level | Color | Description | Action |
|-------|-------|-------------|--------|
| 5 | Red | Immediate attention required | Emergency repair |
| 4 | Orange | Severe defect | Schedule repair within 6-12 months |
| 3 | Yellow | Moderate defect | Monitor and plan rehabilitation |
| 2 | Teal | Minor defect | Routine maintenance |
| 1 | Green | Good condition | No action required |

**DUKES Priority Rating:**
- Proprietary system developed by Duke's
- May incorporate additional factors (age, material, location risk)
- Toggleable alongside MACP in dashboard
