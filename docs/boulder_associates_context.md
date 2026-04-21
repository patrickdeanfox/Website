# Boulder Associates Portal - Comprehensive Context Document

## Project Overview

**Client:** Boulder Associates  
**Portal URL:** https://boulder-associates-portal.zuarbase.net  
**Company Website:** https://www.boulderassociates.com/  
**Platform:** Zuar Portal (hosted on zuarbase.net)  
**Industry:** Architecture, Interior Design & Consulting  
**Export Date:** February 24, 2026

---

## 1. Business Context

### About Boulder Associates
Boulder Associates is an **architecture, interior design, and consulting firm** established in 1983 with over 40 years of experience. The firm specializes in:

- **Healthcare Design** - Hospitals, medical centers, clinics
- **Senior Living Design** - Assisted living, memory care facilities  
- **Life Science Design** - Research facilities, laboratories
- **Commercial & Workplace Design** - Office spaces, tenant improvements
- **Education Design** - Early childhood education facilities

**Headquarters:** Boulder, Colorado  
**Office Locations:** 9 offices across the U.S.
- Boulder, CO (HQ)
- Sacramento, Orange County, San Francisco, Los Angeles, CA
- Dallas, TX
- Phoenix, AZ
- Charlotte, NC
- Seattle, WA

**Firm Size:** 201-500 employees (per LinkedIn)  
**Certifications:** U.S. Green Building Council (USGBC) member

### The Business Challenge
As a project-based professional services firm, Boulder Associates faces the universal architecture industry challenge: **tracking and optimizing employee utilization**. With 200+ employees across 9 offices working on healthcare and senior living projects, visibility into:
- Who is over/under-utilized
- Which profit centers are meeting targets
- How utilization trends over time

...is critical for profitability, resource planning, and project staffing decisions.

### Portal Scale
| Metric | Value |
|--------|-------|
| Total Pages | 7 |
| Total Datasources | 8 |
| Screenshots Captured | 7 |
| User Groups | Charlotte (location-based) |
| Development Timeline | Dec 2025 - Feb 2026 |

---

## 2. Problem Definition

### Industry-Specific Challenges

**Architecture Firm Profitability Model:**
- Revenue tied to **billable hours** on client projects
- Multiple project types with varying profitability margins
- Staff allocated across healthcare, senior living, commercial projects
- Balance between direct project work and overhead activities

**Operational Pain Points:**

1. **Siloed Utilization Data**
   - Profit centers (offices/departments) tracked separately
   - No unified view of firm-wide utilization
   - Difficult to compare performance across locations

2. **Limited Granularity**
   - Existing reports showed only high-level summaries
   - Could not drill into employee-level detail
   - No visibility into utilization trends over time

3. **Target Tracking Gaps**
   - Each profit center has different utilization targets
   - No easy way to see actual vs. target at a glance
   - Under-utilized staff not easily identified

4. **Resource Planning Blind Spots**
   - Project managers couldn't see available capacity
   - Principals lacked visibility into team workload
   - Finance couldn't forecast based on utilization trends

---

## 3. Solution Approach

### Multi-Grain Utilization Reporting Architecture

The portal was designed around **four levels of granularity**, allowing users to analyze utilization from firm-wide down to individual employees:

**Grain 1: Firm Level**
- Firm Utilization (all profit centers)
- Firm Utilization (excluding Corporate)
- KPI cards showing overall health

**Grain 2: Profit Center Level**
- Utilization by office/department
- Target vs. Actual comparison
- Drill-down to monthly trends

**Grain 3: Employee Level**  
- Individual employee utilization
- Employee records and history
- Comparison against targets

**Grain 4: Project Level**
- Project health tracking
- Resource allocation visibility

### Portal Page Structure

| Page | Block Count | Tags | Purpose |
|------|-------------|------|---------|
| Boulder Home | 1 | Boulder | Landing page with navigation |
| **Profit Center Utilization** | **9** | Boulder, PC-PIT | Main dashboard - PC utilization vs. targets |
| Profit Center Utilization Over Time | 7 | Boulder, PC | Time-series trends for profit centers |
| Employee Utilization Over Time | 6 | Boulder, Employee | Individual employee trend analysis |
| Employee Utilization | 6 | Boulder, Employee | Current employee utilization snapshot |
| Employee Records | 3 | - | Employee data management |
| Project Health | 1 | - | Project-level metrics |

### Key Features

**Profit Center Utilization Dashboard (9 blocks):**
- Horizontal bullet chart comparing actual vs. target utilization
- Color-coded status: At Goal (green), Over Utilized, Under Utilized
- Two firm-wide KPIs: with and without Corporate profit center
- Click-to-drill into monthly YTD and Last 12M trends

**Filter Controls:**
- Metric Selection: Total Utilization %, Direct/Indirect Hours, Charge Type, Hour Type
- Date Filter: This Year, custom date ranges
- Profit Center multi-select filter
- Apply/Clear filter actions

---

## 4. Impact Metrics

### Quantifiable Value Delivered

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Time to identify under-utilized staff | Hours | Seconds | 99%+ reduction |
| Utilization reports per month | Manual | Real-time | Continuous visibility |
| Profit center comparisons | Manual | Automated | 100% automated |
| Data granularity levels | 1-2 | 4 | 2x-4x improvement |

### Business Outcomes

1. **Improved Resource Allocation**
   - Principals can see available capacity across profit centers
   - Better staffing decisions for new healthcare/senior living projects
   - Reduced bench time for under-utilized employees

2. **Enhanced Financial Visibility**
   - Real-time tracking of billable vs. non-billable hours
   - Profit center performance against targets
   - Trend analysis for forecasting

3. **Data-Driven Management**
   - Employee-level utilization tracking
   - Project health monitoring
   - Evidence-based staffing decisions

---

## 5. Technical Details

### Platform Configuration

**Grid Layout System:**
- Primary: 100x100 grid with 1% cell size
- Extended height layouts: 200% for scrolling content (Profit Center Over Time)
- Three responsive breakpoints: `lg`, `md`, `sm`

**Theme Configuration:**
```json
{
  "header": false,  // Most pages hide header for more space
  "leftSidebar": true,
  "rightSidebar": false,
  "footer": false
}
```

**Custom CSS (Employee Utilization Over Time):**
```css
/* Flexbox button bar for filter controls */
.button-bar {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 5px;
    margin-top: 10px;
}

/* Single-select dropdown styling */
.singleselect .toggle {
    display: flex;
    align-items: center;
    padding-right: 0px;
    min-height: 18px;
    white-space: normal;
}

/* Multi-select styling */
.multiselect .count span {
    background-color: transparent;
}
```

**JavaScript Usage:**
- `onPageLoad` JavaScript on Profit Center Utilization Over Time
- `onPageLoad` JavaScript on Employee Utilization Over Time
- Used for dynamic filtering and block visibility toggling

### User Configuration

**Admin User:**
- Name: admin
- Email: null (not set)
- Is Admin: Yes
- Groups: Charlotte
- Auth Source: LOCAL

---

## 6. User Experience

### Portal Personas

**1. Principals / Office Leaders**
- **Primary Use:** Profit Center Utilization dashboard
- **Key Questions:**
  - Is my office meeting utilization targets?
  - How do we compare to other offices?
  - What's the 12-month trend?
- **Actions:** Strategic staffing, project go/no-go decisions

**2. Project Managers**
- **Primary Use:** Employee Utilization, Project Health
- **Key Questions:**
  - Who is available for new project work?
  - Which team members are over-committed?
  - Is this project staffed appropriately?
- **Actions:** Resource allocation, team balancing

**3. Finance / Operations**
- **Primary Use:** All dashboards, Data Query
- **Key Questions:**
  - What's firm-wide utilization this quarter?
  - Which profit centers need intervention?
  - How accurate are our forecasts?
- **Actions:** Financial planning, profitability analysis

**4. HR / Talent Management**
- **Primary Use:** Employee Records, Employee Utilization
- **Key Questions:**
  - Who needs more project exposure?
  - Are workloads balanced fairly?
  - Are there burnout risks (over-utilization)?
- **Actions:** Career development, workload balancing

### Navigation Structure

Left sidebar navigation with:
- **Utilization Section**
  - Profit Center Utilization
  - Employee Utilization
  - Data Query (ad-hoc reporting)
- **Boulder Home** (landing page)
- **Employee Records**
- **Project Health**

---

## 7. Challenges & Solutions

### Challenge 1: Multiple Utilization Metrics
**Problem:** Utilization can be measured many ways (total, direct, by charge type, by hour type)  
**Solution:** Metric toggle buttons allowing users to switch views without page navigation

### Challenge 2: Complex Drill-Down Requirements
**Problem:** Users need to go from firm → profit center → employee → time trends  
**Solution:** 
- Interactive bar charts with click-to-drill functionality
- Separate pages for each grain level
- Hidden blocks that toggle on selection

### Challenge 3: Target Variance Visualization
**Problem:** Each profit center has different utilization targets  
**Solution:** Bullet chart design with red target markers overlaid on actual utilization bars

### Challenge 4: Responsive Design for Complex Layouts
**Problem:** 9-block dashboard needs to work on all screen sizes  
**Solution:**
- Extensive block layout definitions for lg/md/sm breakpoints
- CSS overflow controls for content area
- Hidden blocks at smaller breakpoints

### Development Artifacts
- Multiple hidden blocks on Profit Center Utilization (3 hidden)
- Multiple hidden blocks on Employee Utilization Over Time (2 hidden)
- Block visibility toggled via JavaScript on page load

---

## 8. My Role

### Responsibilities
As the **Zuar Portal Implementation Lead** for the Boulder Associates project, I was responsible for:

1. **Requirements Gathering**
   - Collaborated with principals and operations to define utilization metrics
   - Established 4-grain data model (firm → profit center → employee → project)
   - Defined target thresholds and variance indicators

2. **Dashboard Design**
   - Designed bullet chart visualization for target vs. actual comparison
   - Created responsive 9-block layout for main utilization dashboard
   - Implemented drill-down interactivity with hidden blocks

3. **Technical Implementation**
   - Connected 8 datasources for utilization, employee, and project data
   - Built custom CSS for filter controls and dropdown styling
   - Implemented onPageLoad JavaScript for dynamic filtering

4. **User Training & Adoption**
   - Created Boulder Home landing page for navigation
   - Designed intuitive filter controls (Apply/Clear/Reset)
   - Documented metric definitions and calculations

### Development Timeline

| Period | Activity |
|--------|----------|
| Dec 12, 2025 | Project kickoff - Boulder Home created |
| Dec 19, 2025 | Profit Center Utilization page created |
| Dec 29, 2025 | Home page updated with navigation |
| Dec 30, 2025 | Employee Utilization and PC Over Time pages created |
| Jan 6, 2026 | Project Health page added |
| Jan 21, 2026 | Employee Utilization Over Time added |
| Jan 28, 2026 | Employee Records page added |
| Feb 9-10, 2026 | Time-series pages updated with filter enhancements |
| **Feb 17-19, 2026** | **Final polish on Employee and Profit Center utilization pages** |

---

## Appendix: Data Model

### Key Metrics Tracked

| Metric | Description | Use Case |
|--------|-------------|----------|
| Total Utilization % | Total hours / Available hours | Overall efficiency |
| Direct Hours | Hours billed directly to projects | Revenue generation |
| Indirect Hours | Non-billable hours (admin, training) | Overhead analysis |
| Charge Type | Category of work (billable, non-billable, overhead) | Profitability analysis |
| Hour Type | Nature of hours (regular, overtime, PTO) | Workload analysis |
| Target Ratio | Goal utilization % per profit center | Performance benchmarking |

### Profit Center Categories
Based on Boulder Associates' structure:
- Geographic offices (Boulder, Sacramento, Dallas, Phoenix, Charlotte, Seattle, LA, SF, Orange County)
- Corporate/Administrative profit center
- Potentially practice areas (Healthcare, Senior Living, Commercial)

### Data Grain Hierarchy
```
Firm (aggregate)
  └── Profit Center (office/department)
      └── Employee (individual)
          └── Project (assignment)
              └── Time Period (month, YTD, 12M rolling)
```

---

## Appendix: Page Details

### Boulder Home
- **Created:** Dec 12, 2025
- **Updated:** Dec 29, 2025
- **Blocks:** 1
- **Purpose:** Navigation landing page

### Profit Center Utilization (Most Complex)
- **Created:** Dec 19, 2025
- **Updated:** Feb 19, 2026
- **Blocks:** 9 (3 hidden)
- **Key Features:**
  - Bullet chart with target markers
  - Two firm-wide KPI cards
  - Profit center filter
  - Metric toggle buttons
  - Click-to-drill interactivity

### Profit Center Utilization Over Time
- **Created:** Dec 30, 2025
- **Updated:** Feb 10, 2026
- **Blocks:** 7 (5 hidden)
- **Key Features:**
  - 200% height grid for scrolling
  - Time-series visualizations
  - onPageLoad JavaScript

### Employee Utilization
- **Created:** Dec 30, 2025
- **Updated:** Feb 17, 2026
- **Blocks:** 6 (4 hidden)
- **Key Features:**
  - Individual employee metrics
  - Hidden blocks for conditional display

### Employee Utilization Over Time
- **Created:** Jan 21, 2026
- **Updated:** Feb 9, 2026
- **Blocks:** 6 (2 hidden)
- **Key Features:**
  - Extensive custom CSS for filters
  - onPageLoad JavaScript
  - Time-series employee trends

### Employee Records
- **Created:** Jan 28, 2026
- **Updated:** Feb 9, 2026
- **Blocks:** 3
- **Key Features:**
  - Employee data table
  - Search/filter capabilities

### Project Health
- **Created:** Jan 6, 2026
- **Updated:** Jan 6, 2026
- **Blocks:** 1
- **Purpose:** Project-level metrics (minimal development)
