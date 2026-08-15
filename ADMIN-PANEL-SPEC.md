# Libang Libu Travel Admin Panel
## Implementation Reference for Ipoh School Outing (ISO)

**Document Type:** Admin Panel Product + Technical Specification  
**Company:** Libang Libu Travel  
**Initial Product:** Ipoh School Outing (ISO)  
**Admin Architecture:** Laravel Monolith + Inertia.js + React + TypeScript  
**Database:** PostgreSQL  
**Queue / Cache:** Redis where required  
**Public Website:** Separate Next.js frontend  
**Primary Objective:** Centralise sales, booking, itinerary, guide, supplier and trip operations into one scalable management platform.

---

# 1. Purpose of the Admin Panel

The admin panel is the central operating platform for Libang Libu Travel.

It should allow the company to manage the complete lifecycle of an educational tour:

```text
Lead
  ↓
Customer Requirements
  ↓
Programme Recommendation
  ↓
Proposal
  ↓
Quotation
  ↓
Booking
  ↓
Itinerary
  ↓
Guide Assignment
  ↓
Supplier Coordination
  ↓
Trip Operations
  ↓
Feedback
  ↓
Analytics / Repeat Business
```

The goal is to reduce dependency on manual WhatsApp, spreadsheets and ad-hoc coordination.

---

# 2. Core Business Principle

The platform should automate repetitive work while keeping humans responsible for judgement, approval and exceptions.

Use the following principle:

> **AI understands and suggests.**  
> **System rules calculate and validate.**  
> **Humans review and approve.**

Do not allow generative AI to control critical operational facts such as confirmed availability, final pricing or capacity.

---

# 3. Brand / Product Hierarchy

The platform belongs to:

# LIBANG LIBU TRAVEL

Ipoh School Outing is only one product under the company.

Recommended hierarchy:

```text
Company
└── Libang Libu Travel
    │
    └── Product
        └── Ipoh School Outing
            │
            ├── Programme
            │   ├── Ipoh Discovery Expedition
            │   ├── Amazing Limestone Expedition
            │   └── Custom Learning Expedition
            │
            └── Activities
                ├── Kek Lok Tong
                ├── Heritage Hunt
                ├── Railway Investigation
                └── Food Science Activity
```

Do not hard-code database entities around `iso_*`.

Prefer generic entities such as:

```text
products
programmes
activities
bookings
customers
guides
suppliers
```

This allows future Libang Libu Travel products to use the same management platform.

---

# 4. System Architecture

Recommended:

```text
PUBLIC CUSTOMER WEBSITE
Next.js + TypeScript
        │
        │ REST / JSON API
        ▼
┌─────────────────────────────┐
│         LARAVEL             │
│                             │
│ Business Logic              │
│ Authentication              │
│ Leads / CRM                 │
│ Recommendation Engine       │
│ Itinerary Engine            │
│ Guide Matching              │
│ Pricing                     │
│ Bookings                    │
│ AI Service                  │
│                             │
│ ADMIN PANEL                 │
│ Inertia + React + TS        │
└──────────────┬──────────────┘
               │
          PostgreSQL
               │
             Redis
```

The Laravel application should remain the source of truth.

---

# 5. Recommended Admin Stack

## Backend

- Laravel
- PHP
- PostgreSQL
- Redis
- Laravel Queue
- Laravel Events / Listeners
- Laravel Policies / Gates
- Laravel Notifications
- Object storage for documents where required

## Admin Frontend

- Inertia.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent component system
- React Hook Form or equivalent where useful

The admin frontend remains part of the Laravel monolith.

---

# 6. Admin Panel Goals

The admin panel should:

- centralise enquiries;
- reduce repetitive sales work;
- provide structured customer requirements;
- manage programmes and activities;
- generate and validate itineraries;
- match guides;
- manage suppliers;
- calculate pricing;
- generate quotations;
- manage bookings;
- coordinate trip operations;
- collect quality data;
- identify operational problems;
- provide management analytics.

---

# 7. Non-Goals for MVP

Do not attempt to build everything immediately.

The MVP does not need:

- complex marketplace features;
- fully autonomous booking;
- advanced dynamic pricing;
- real-time supplier API integrations;
- a dedicated mobile app;
- microservices;
- machine-learning models trained from scratch;
- automated payroll;
- complex accounting software replacement.

---

# 8. User Roles

Recommended initial roles:

## Super Admin

Full system access.

Can manage:

- users;
- permissions;
- products;
- financial information;
- configuration;
- audit logs.

## Management

Can access:

- dashboard;
- analytics;
- leads;
- bookings;
- operations;
- guide performance;
- revenue information.

## Sales / Customer Service

Can manage:

- enquiries;
- schools;
- contacts;
- recommendations;
- proposals;
- quotations;
- follow-ups.

## Operations

Can manage:

- bookings;
- itineraries;
- guides;
- suppliers;
- transport;
- group allocation;
- operational checklist.

## Finance

Can manage:

- quotations;
- invoices;
- deposits;
- payment records;
- outstanding balances.

## Guide Coordinator

Can manage:

- guide profiles;
- guide skills;
- availability;
- assignments;
- ratings.

Future:

## Guide User

Restricted portal for individual guides.

---

# 9. Main Navigation

Recommended sidebar:

```text
Dashboard

Sales
├── Leads
├── Schools
├── Contacts
├── Follow-ups
└── Quotations

Products
├── Products
├── Programmes
├── Activities
├── Locations
└── Learning Outcomes

Operations
├── Bookings
├── Itineraries
├── Guides
├── Suppliers
├── Group Planning
└── Operational Checklist

Finance
├── Pricing
├── Payments
└── Invoices

Quality
├── Feedback
├── Guide Performance
└── Incidents

Analytics
├── Sales
├── Operations
└── Product Insights

System
├── Users
├── Roles
├── Notifications
├── Audit Logs
└── Settings
```

Navigation should change according to role permissions.

---

# 10. Dashboard

The dashboard should provide a management overview rather than simply showing decorative charts.

## Suggested KPI Cards

```text
New Enquiries
Pending Quotations
Confirmed Trips
Trips This Month
Students This Month
Outstanding Payments
Guide Capacity
Average Teacher Rating
```

Example:

```text
NEW ENQUIRIES         18

PENDING QUOTATIONS     7

CONFIRMED TRIPS        9

STUDENTS THIS MONTH   630
```

---

# 11. Dashboard — Action Required

A key dashboard section should be:

# ACTION REQUIRED

Example:

```text
3 quotations awaiting follow-up

2 trips have no guides assigned

1 booking exceeds current supplier capacity

4 customers have outstanding deposits

1 guide has a rating below threshold
```

The dashboard should help staff decide what needs attention.

---

# 12. Dashboard — Upcoming Trips

Example:

```text
18 Aug
SMK ABC
90 Students
Ipoh Discovery Expedition
STATUS: CONFIRMED

20 Aug
SK XYZ
60 Students
Amazing Limestone
STATUS: GUIDE ASSIGNMENT PENDING
```

Display:

- date;
- school;
- programme;
- number of students;
- booking status;
- operation status.

---

# 13. Lead Management

Every website Smart Trip Planner submission should create a structured lead.

Example:

```text
LEAD #LLT-2026-00124

School:
SMK ABC

Contact:
Teacher Ahmad

Student Level:
Secondary

Group Size:
90

Duration:
2D1N

Learning Interests:
Science
History
Geography

Budget:
RM200–RM250

Customer Objective:
"We want something fun and hands-on..."
```

---

# 14. Lead Pipeline

Use a Kanban or status pipeline.

Recommended statuses:

```text
NEW
↓
CONTACTED
↓
QUALIFIED
↓
RECOMMENDATION READY
↓
PROPOSAL SENT
↓
NEGOTIATION
↓
AWAITING CONFIRMATION
↓
CONFIRMED
```

Alternative exits:

```text
LOST
CANCELLED
ARCHIVED
```

---

# 15. Lead Detail Page

Recommended sections:

## Overview

- school;
- contact;
- date created;
- assigned staff;
- lead source;
- status.

## Customer Requirements

- school level;
- group size;
- duration;
- learning interests;
- budget;
- free-text objective.

## Recommendation

- recommended programme;
- recommended activities;
- AI interpretation;
- validation status.

## Communication

- notes;
- follow-up date;
- contact history.

## Commercial

- indicative price;
- quotation;
- booking conversion.

---

# 16. Schools

Maintain a reusable school database.

Fields:

```text
School Name
School Type
Primary / Secondary / Mixed
Location
Address
Main Contact
Phone
Email
Notes
Previous Trips
Lifetime Booking Value
```

Avoid creating duplicate school records for repeat enquiries.

---

# 17. Contacts

A school may have multiple contacts.

Example:

```text
SMK ABC
│
├── Teacher Ahmad
│   └── Trip Coordinator
│
├── Puan Aisyah
│   └── Senior Assistant
│
└── Encik Rahman
    └── Finance
```

Fields:

- name;
- role;
- phone;
- email;
- notes;
- primary contact flag.

---

# 18. Products

Initial product:

```text
Ipoh School Outing
```

Fields:

```text
Name
Slug
Description
Status
Company
Product Type
Customer Segment
```

Future products should be supported without structural changes.

---

# 19. Programme Management

Example programme:

```text
IPOH DISCOVERY EXPEDITION

Product:
Ipoh School Outing

Duration:
2D1N

Suitable For:
Secondary School

Min Group:
60

Max Group:
120

Themes:
Science
History
Geography
```

Recommended fields:

- programme name;
- product;
- description;
- duration;
- school suitability;
- minimum / maximum group;
- learning themes;
- base activities;
- learning outcomes;
- indicative price range;
- status.

---

# 20. Activity Management

Activities are the core building blocks of itineraries.

Example:

```text
ACTIVITY: Kek Lok Tong Limestone Investigation

Category:
Science / Geography

Duration:
90 minutes

Capacity:
120

Age Suitability:
Primary / Secondary

Environment:
Outdoor / Cave

Learning Outcomes:
- Limestone formation
- Weathering
- Erosion
- Karst landscape
```

Fields should include:

```text
Name
Location
Categories
Learning Themes
Learning Outcomes
Suitable School Level
Min Age
Max Age
Duration
Maximum Capacity
Minimum Capacity
Indoor / Outdoor
Suggested Time
Operating Hours
Weather Sensitivity
Base Cost
Supplier
Status
Notes
```

---

# 21. Learning Outcomes

Learning outcomes should be reusable records.

Example:

```text
LO-001
Explain how tin mining influenced the growth of Ipoh.

Subject:
History

Level:
Secondary
```

Activities and programmes can have multiple learning outcomes.

---

# 22. Locations

Maintain location data separately from activities.

Example:

```text
Kek Lok Tong

Type:
Cave / Limestone

Address:
...

Opening Hours:
...

Capacity:
...

Travel Notes:
...
```

Fields:

- name;
- address;
- map coordinates if required;
- opening hours;
- contact;
- parking / bus notes;
- general capacity;
- restrictions;
- operational notes.

---

# 23. Recommendation Engine

The recommendation engine should combine:

```text
Customer Requirements
        +
Programme Data
        +
Activity Data
        +
Business Rules
        +
AI Interpretation
```

Output:

```text
Recommended Programme
Recommended Activities
Suggested Duration
Explanation
Validation Warnings
```

---

# 24. AI Responsibilities

AI may assist with:

## Preference Interpretation

Convert:

> "We want something outdoor and fun but related to Geography."

into structured tags:

```text
Geography: High
Outdoor: High
Hands-on: High
Science: Medium
Academic Intensity: Medium
```

## Recommendation Explanation

Explain why a recommended programme suits the school.

## Itinerary Drafting

Arrange approved activities into an initial draft.

---

# 25. AI Restrictions

AI must not independently invent:

- prices;
- activity availability;
- guide availability;
- supplier capacity;
- opening hours;
- confirmed booking status.

AI output should always be validated by business logic.

---

# 26. Recommendation Validation

Before a recommendation can be marked `VALID`, the system should check:

```text
Student level suitable?
Capacity sufficient?
Duration possible?
Programme active?
Activity active?
Budget broadly compatible?
Location feasible?
```

Later phases can validate:

```text
Supplier availability?
Guide availability?
Exact time slot?
Transport time?
```

---

# 27. Itinerary Builder

The admin panel should provide a visual itinerary builder.

Example:

```text
DAY 1

08:00 Arrival
09:00 Heritage Hunt
10:30 Han Chin Pet Soo
12:00 Lunch
13:30 Railway Investigation
15:00 Student Challenge
17:00 Hotel Check-in
```

---

# 28. Itinerary Builder UX

Preferred UI:

```text
ACTIVITY LIBRARY            ITINERARY

Kek Lok Tong      →         09:00 Kek Lok Tong
Heritage Hunt     →         11:00 Heritage Hunt
Coffee Science    →         14:00 Coffee Science
```

Allow:

- drag and drop;
- manual time adjustment;
- delete;
- reorder;
- duplicate;
- assign groups;
- add notes.

---

# 29. Itinerary Validation

System should warn admins about conflicts.

Examples:

```text
⚠ Activity capacity exceeded.

⚠ Travel time between activities may be insufficient.

⚠ Activity unavailable for selected school level.

⚠ Two activities overlap.

⚠ Lunch duration below recommended minimum.

⚠ Guide requirement not satisfied.
```

Warnings should distinguish:

## Critical

Cannot proceed without resolution.

## Warning

Admin may proceed with justification.

---

# 30. Guide Management

Guide profiles should contain structured information.

Example:

```text
GUIDE: Amir

Languages:
BM
English

Expertise:
History      5/5
Geology      4/5
Culture      3/5

Student Experience:
Secondary

Maximum Group:
30

Current Rating:
4.8
```

---

# 31. Guide Fields

Recommended:

```text
Name
Phone
Email
Languages
Skills
Subject Expertise
School-Level Experience
Maximum Group Size
Availability
Employment / Contractor Type
Training Status
Rating
Trips Completed
Notes
Status
```

---

# 32. Guide Availability

Admin should be able to define:

```text
Available
Unavailable
Tentative
Assigned
```

Calendar view should eventually show guide availability.

---

# 33. Guide Matching

Guide matching should initially use deterministic scoring.

Example:

```text
Availability              Required
Subject Expertise          30%
Student-Level Experience   20%
Language                   20%
Location                   10%
Previous Rating            10%
Group Experience           10%
```

Output:

```text
Amir        94%
Sarah       89%
John        72%
```

Admin should select or approve the assignment.

---

# 34. Guide Matching Rule

Never recommend a guide who fails a mandatory condition.

Example mandatory rules:

```text
Available on date
Active status
Group size within limit
Required language available
```

Weighted scoring only applies after mandatory filters.

---

# 35. Guide Capacity Planning

Example:

```text
Booking:
120 students

Maximum students per guide:
30

Minimum guide requirement:
4
```

System should automatically calculate guide requirements.

---

# 36. Supplier Management

Supplier categories:

```text
Transport
Hotels
Restaurants
Attractions
Activity Providers
Catering
Printing
```

Fields:

```text
Company Name
Category
Contact Person
Phone
Email
Pricing
Capacity
Lead Time
Deposit Requirement
Cancellation Terms
Notes
Status
```

---

# 37. Supplier Pool

Avoid dependence on one supplier.

Example:

```text
TRANSPORT

Supplier A
Supplier B
Supplier C
```

The system should eventually make capacity visible.

---

# 38. Group Planning

Large groups should be split into manageable sub-groups.

Example:

```text
120 Students

Group A — 30
Group B — 30
Group C — 30
Group D — 30
```

Fields:

- group name;
- student count;
- guide;
- teacher;
- assigned itinerary track.

---

# 39. Rotation Planning

Example:

```text
          09:00      10:30      12:00      14:00

Group A   Cave       Museum     Lunch      Coffee
Group B   Museum     Cave       Lunch      Heritage
Group C   Heritage   Coffee     Lunch      Cave
Group D   Coffee     Heritage   Lunch      Museum
```

This allows venues with smaller capacity to support large bookings.

---

# 40. Capacity Validation

For every itinerary item:

```text
Students Assigned
        ≤
Activity Capacity
```

If false:

```text
CRITICAL CONFLICT
```

System should suggest:

- split group;
- create rotation;
- select alternative activity.

---

# 41. Pricing Engine

Pricing should be calculated from actual cost components.

Example:

```text
Transport           RM3,000
Accommodation       RM6,000
Meals               RM4,500
Activities          RM3,200
Guides              RM1,500
Materials           RM1,000
──────────────────────────
Cost                RM19,200

Margin               20%
──────────────────────────
Selling Price       RM23,040

Students                 90

Price / Student      RM256
```

---

# 42. Pricing Components

Support:

```text
Fixed Cost
Per Student Cost
Per Guide Cost
Per Bus Cost
Per Room Cost
Per Group Cost
Percentage Markup
Manual Adjustment
Discount
```

---

# 43. Quotation Management

Quotation statuses:

```text
DRAFT
REVIEW
SENT
VIEWED
ACCEPTED
REJECTED
EXPIRED
```

Quotation fields:

- quotation number;
- lead;
- school;
- programme;
- student count;
- costing;
- selling price;
- validity period;
- terms;
- version.

---

# 44. Quotation Versioning

Do not overwrite previous quotations.

Example:

```text
Q-001 v1
Q-001 v2
Q-001 v3
```

This allows the team to track negotiations.

---

# 45. Booking Management

Once a quotation is accepted, convert the lead into a booking.

Booking example:

```text
BOOKING
LLT-ISO-2026-0063

School:
SMK ABC

Programme:
Ipoh Discovery Expedition

Date:
18–19 October 2026

Students:
90

Teachers:
8

Status:
CONFIRMED
```

---

# 46. Booking Statuses

Recommended:

```text
DRAFT
PENDING CONFIRMATION
CONFIRMED
DEPOSIT PENDING
OPERATIONAL PREPARATION
READY
IN PROGRESS
COMPLETED
CANCELLED
```

Avoid using one status to represent both payment and operation state.

Prefer separate status fields where necessary.

---

# 47. Booking Sub-Statuses

Consider:

```text
booking_status
payment_status
operation_status
```

Example:

```text
Booking:
CONFIRMED

Payment:
DEPOSIT PAID

Operations:
GUIDE ASSIGNMENT PENDING
```

This is clearer.

---

# 48. Payment Tracking

Recommended payment statuses:

```text
NOT REQUIRED
DEPOSIT PENDING
PARTIALLY PAID
FULLY PAID
OVERDUE
REFUNDED
```

Payment records should contain:

```text
Amount
Date
Method
Reference
Recorded By
Notes
```

---

# 49. Operational Checklist

Confirmed bookings should generate a checklist.

Example:

## 30 Days Before

- supplier reservations;
- accommodation confirmation;
- transport planning.

## 7 Days Before

- confirm student numbers;
- confirm guide assignments;
- confirm restaurants;
- prepare student materials;
- confirm emergency contacts.

## 1 Day Before

- attendance list;
- guide briefing;
- bus information;
- final meal confirmation;
- materials packed.

---

# 50. Checklist Automation

Checklist templates should depend on programme type.

Example:

```text
1-Day Programme Template
2D1N Programme Template
Large Group Template
```

When booking confirmed:

```text
BookingConfirmed Event
        ↓
GenerateOperationalChecklist Job
```

---

# 51. Trip Operations Screen

On trip day, operations should see:

```text
TODAY'S TRIPS

SMK ABC
90 students

Guide:
Amir
Sarah
John

Bus:
ABC Transport

Current Status:
Activity 2 of 5

Issues:
None
```

Future enhancements may include live status updates.

---

# 52. Incident / Issue Management

System should allow staff to record:

```text
Delay
Customer Complaint
Supplier Issue
Guide Issue
Medical Incident
Transport Issue
Activity Cancellation
Other
```

Fields:

- booking;
- time;
- type;
- severity;
- description;
- action taken;
- responsible person;
- resolved status.

---

# 53. Feedback Management

After trip completion, send teacher feedback.

Recommended questions:

```text
Overall Experience
Guide Knowledge
Student Engagement
Organisation
Time Management
Programme Relevance
Communication
```

Use rating + optional comment.

---

# 54. Guide Quality KPI

Avoid rewarding guides solely based on number of trips.

Example Guide Performance Score:

```text
Teacher Satisfaction        30%
Student Engagement          20%
Programme Completion        15%
Punctuality                 15%
Incident Record             10%
Repeat Assignment Demand    10%
```

Weights should remain configurable.

---

# 55. Quality Monitoring Dashboard

Example:

```text
AVERAGE GUIDE RATING     4.7

LOW-RATING ALERTS          2

OPEN COMPLAINTS            1

INCIDENTS THIS MONTH       3
```

Guide table:

```text
Amir      4.8   Healthy
Sarah     4.7   Healthy
John      3.4   Review Required
```

---

# 56. Monitoring Principle

Management should focus on exceptions.

Instead of manually monitoring every guide:

```text
Normal Performance
        ↓
No Action
```

If threshold crossed:

```text
Low Rating
Repeated Complaint
Incident
Poor Punctuality
        ↓
Management Alert
```

---

# 57. Notifications

Examples:

```text
New lead received
Quotation awaiting follow-up
Deposit overdue
Guide not assigned
Supplier unconfirmed
Trip starts tomorrow
Feedback not completed
Guide rating below threshold
```

Notifications may initially appear in-app.

Future:

- email;
- WhatsApp integration;
- push notification.

---

# 58. Automated Follow-Ups

Examples:

```text
Lead Created
      ↓
No contact after 24h
      ↓
Notify assigned salesperson
```

```text
Quotation Sent
      ↓
No response after 3 days
      ↓
Create follow-up task
```

---

# 59. Tasks

Allow staff to create tasks linked to:

- lead;
- booking;
- school;
- supplier;
- guide.

Fields:

```text
Title
Assigned To
Due Date
Priority
Status
Related Entity
Notes
```

---

# 60. Analytics — Sales

Track:

```text
Website Leads
Qualified Leads
Proposal Rate
Quotation Rate
Booking Conversion
Revenue
Average Booking Value
Average Students / Booking
```

---

# 61. Analytics — Product

Track:

```text
Most Requested Learning Theme
Most Selected Programme
Most Popular Activity
Most Popular Duration
Primary vs Secondary School
Group Size Distribution
```

---

# 62. Analytics — Operations

Track:

```text
Guide Utilisation
Supplier Utilisation
Average Guide Rating
Incident Rate
Trips Completed
Average Students / Trip
Late Starts
Programme Completion Rate
```

---

# 63. Scalability Dashboard

Useful future metrics:

```text
Guide Capacity Used
Transport Capacity Used
Supplier Capacity Used
Trips Per Day
Students Per Day
Operational Conflicts
```

Example:

```text
18 AUGUST

Scheduled Students: 620

Available Guide Capacity:
78% utilised

Transport:
65% utilised

Activity Slot Capacity:
92% utilised ⚠
```

---

# 64. Stress-Test Principle

The platform should help answer:

> If bookings increase 10×, which part breaks first?

Key scalability constraints:

```text
Lead handling
Itinerary planning
Quotation preparation
Guide capacity
Supplier capacity
Activity capacity
Operations coordination
Quality monitoring
```

---

# 65. Business Scalability Matrix

Example:

| Process | Manual Risk at Scale | System Response |
|---|---|---|
| Lead qualification | High | Smart Trip Planner |
| Programme recommendation | High | Recommendation Engine |
| Itinerary creation | High | Draft + validation |
| Quotation | High | Pricing Engine |
| Guide assignment | High | Guide Matching |
| Guide quality | High | KPI Monitoring |
| Venue capacity | High | Group Rotation |
| Supplier coordination | High | Supplier Management |
| Operations | High | Checklist + alerts |

---

# 66. Audit Logs

Important actions should be recorded.

Examples:

```text
Quotation price changed
Booking cancelled
Payment recorded
Guide reassigned
Supplier changed
Programme edited
User permission changed
```

Log:

```text
User
Action
Entity
Before
After
Timestamp
```

---

# 67. Search

Global admin search should eventually find:

```text
Lead ID
Booking ID
School
Contact
Quotation
Guide
Programme
Supplier
```

---

# 68. Table UX

Admin tables should provide:

- search;
- filters;
- sort;
- pagination;
- bulk selection where appropriate;
- saved filters later.

Example Lead filters:

```text
Status
Assigned Staff
School Level
Group Size
Programme
Created Date
Lead Source
```

---

# 69. Form UX

Forms should:

- group related information;
- save validation errors clearly;
- prevent accidental loss;
- use sensible defaults;
- show required fields;
- show business warnings before save.

Avoid enormous single-page forms.

Use sections or tabs.

---

# 70. Confirmation UX

Require confirmation for destructive actions:

```text
Cancel Booking
Delete Programme
Deactivate Guide
Void Quotation
```

Do not require confirmation for normal navigation.

---

# 71. Status Design

Statuses should use consistent design.

Example:

```text
NEW                 Neutral
CONFIRMED           Positive
PENDING             Warning
OVERDUE             Critical
CANCELLED           Muted
```

Do not use colour as the only indicator.

Include labels/icons.

---

# 72. Admin Page Route Map

Suggested Laravel routes:

```text
/admin
/admin/dashboard

/admin/leads
/admin/leads/{lead}

/admin/schools
/admin/schools/{school}

/admin/contacts

/admin/products
/admin/programmes
/admin/activities
/admin/locations
/admin/learning-outcomes

/admin/bookings
/admin/bookings/{booking}

/admin/itineraries/{itinerary}

/admin/guides
/admin/guides/{guide}
/admin/guides/calendar

/admin/suppliers

/admin/quotations
/admin/payments

/admin/feedback
/admin/incidents

/admin/analytics

/admin/users
/admin/roles
/admin/audit-logs
/admin/settings
```

---

# 73. Laravel Domain Structure

Suggested:

```text
app/
├── Models/
│
├── Services/
│   ├── Leads/
│   ├── Recommendations/
│   ├── Itineraries/
│   ├── Guides/
│   ├── Pricing/
│   ├── Quotations/
│   ├── Bookings/
│   ├── Operations/
│   └── AI/
│
├── Actions/
│
├── Events/
│
├── Listeners/
│
├── Jobs/
│
├── Policies/
│
├── Notifications/
│
└── Http/
```

---

# 74. Suggested Services

```text
LeadService

RecommendationService

PreferenceInterpreter

ActivityMatchingService

ItineraryService

ItineraryValidator

GuideMatchingService

GroupRotationService

PricingService

QuotationService

BookingService

OperationalChecklistService

FeedbackService

GuidePerformanceService

AIService
```

---

# 75. Events

Useful domain events:

```text
LeadCreated
LeadQualified
QuotationSent
QuotationAccepted
BookingConfirmed
DepositReceived
GuideAssigned
TripStartingSoon
TripCompleted
FeedbackReceived
IncidentReported
```

---

# 76. Jobs / Queues

Examples:

```text
GenerateQuotationPdf

GenerateOperationalChecklist

SendLeadNotification

SendQuotationEmail

SendTripReminder

SendFeedbackRequest

RecalculateGuidePerformance

GenerateRecommendationExplanation
```

Long-running AI or document tasks should preferably use queues.

---

# 77. Public API Boundary

Public Next.js website should communicate with Laravel only through explicitly exposed APIs.

Examples:

```text
POST /api/trip-planner/recommend

POST /api/leads

GET /api/programmes

GET /api/programmes/{slug}

GET /api/activities/{slug}
```

Do not expose admin-specific endpoints publicly.

---

# 78. Smart Trip Planner Input

Example payload concept:

```json
{
  "school_level": "secondary",
  "student_count": 90,
  "duration": "2d1n",
  "learning_interests": [
    "science",
    "history"
  ],
  "experience_preferences": [
    "hands_on",
    "outdoor"
  ],
  "budget_band": "200_250",
  "learning_objective": "We want something fun and related to geography."
}
```

---

# 79. Recommendation Response

Conceptually:

```json
{
  "programme": {},
  "recommended_activities": [],
  "learning_outcomes": [],
  "recommendation_reason": "",
  "warnings": [],
  "validation_status": "valid"
}
```

Never return internal sensitive costing information to the public API unless intentionally exposed.

---

# 80. Database Entity Relationships

Conceptual:

```text
Company
  hasMany Products

Product
  hasMany Programmes

Programme
  belongsToMany Activities

Activity
  belongsTo Location

Activity
  belongsToMany LearningOutcomes

School
  hasMany Contacts

School
  hasMany Leads

Lead
  belongsTo School
  hasOne Recommendation
  hasMany Quotations

Lead
  mayConvertTo Booking

Booking
  belongsTo School
  belongsTo Programme
  hasOne Itinerary
  hasMany GuideAssignments
  hasMany Payments
  hasMany OperationalTasks
  hasMany Incidents

Guide
  hasMany GuideAssignments

Supplier
  supplies Activities / Transport / Hotel / Food

Trip
  hasMany FeedbackRecords
```

---

# 81. Core Tables

Suggested initial tables:

```text
users
roles
permissions

companies
products
programmes
activities
programme_activity

locations
learning_outcomes
activity_learning_outcome

schools
contacts
leads
lead_preferences
recommendations

quotations
quotation_items

bookings
booking_groups
itineraries
itinerary_items

guides
guide_skills
guide_availability
guide_assignments

suppliers
supplier_services

payments

operational_checklists
operational_tasks

feedback
incidents

notifications
audit_logs
```

Actual schema should be normalised based on implementation needs.

---

# 82. Data Integrity Rules

Examples:

- student count must be positive;
- inactive programme cannot be newly booked;
- inactive guide cannot be assigned;
- itinerary end time must follow start time;
- quotation cannot be accepted after expiry without renewal;
- booking cannot be marked ready if required critical tasks remain incomplete;
- group totals should equal booking student totals where group planning is used.

---

# 83. Permission Rules

Examples:

Sales may:

```text
View lead
Edit lead
Create quotation
```

Sales may not:

```text
Change system roles
Delete payment records
Edit guide performance formula
```

Finance may:

```text
Record payment
View commercial information
```

Guide coordinator may:

```text
Edit guide availability
Assign guide
```

Use policies instead of scattered conditional checks.

---

# 84. MVP Scope

Phase 1 should focus on:

```text
Authentication
Roles

Dashboard

Leads
Schools
Contacts

Products
Programmes
Activities

Smart Planner lead intake

Recommendation review

Basic itinerary builder

Guide database

Basic guide matching

Pricing

Quotation

Booking conversion

Basic payment tracking
```

This is enough to demonstrate the end-to-end business flow.

---

# 85. Phase 2

Add:

```text
Supplier Management
Guide Availability Calendar
Advanced Itinerary Validation
Group Rotation
Operational Checklist
Incident Management
Feedback
Guide Performance
Notifications
PDF Documents
```

---

# 86. Phase 3

Add:

```text
Teacher Portal

Guide Portal

Supplier Portal

Live Availability

Advanced AI Recommendations

Historical Recommendation Optimisation

Dynamic Capacity Planning

Advanced Analytics

Automated Follow-Ups

Repeat School Campaigns
```

---

# 87. Recommended Build Order

Build in this order:

```text
1. Auth / roles

2. Companies / products

3. Schools / contacts

4. Leads

5. Programmes / activities

6. Recommendation structure

7. Itinerary

8. Guides

9. Pricing

10. Quotations

11. Booking

12. Operations

13. Feedback / analytics
```

Do not start with AI.

Build the structured data foundation first.

---

# 88. AI Implementation Order

Only add AI after:

```text
Activities exist
Learning tags exist
Programme data exists
Customer preferences exist
Business rules exist
```

Then AI can operate on structured company data.

Recommended order:

```text
1. Free-text preference interpretation

2. Recommendation explanation

3. Draft itinerary assistance

4. More advanced optimisation later
```

---

# 89. Admin UX Principle

The admin panel should help staff answer three questions quickly:

> **What needs my attention?**

> **What should I do next?**

> **Is this trip operationally ready?**

Every module should support these questions.

---

# 90. Lead-to-Booking Example

```text
Teacher completes Smart Trip Planner
          ↓
Lead created
          ↓
Requirements stored
          ↓
Recommendation generated
          ↓
Sales reviews
          ↓
Contact school
          ↓
Adjust programme
          ↓
Generate quotation
          ↓
Quotation sent
          ↓
School accepts
          ↓
Convert to booking
          ↓
Booking confirmed
```

---

# 91. Booking-to-Trip Example

```text
Booking confirmed
       ↓
Operational checklist generated
       ↓
Itinerary finalised
       ↓
Students split into groups
       ↓
Guides matched
       ↓
Suppliers confirmed
       ↓
Deposit tracked
       ↓
Final headcount confirmed
       ↓
Trip marked READY
       ↓
Trip conducted
       ↓
Trip completed
       ↓
Teacher feedback
       ↓
Guide KPI updated
       ↓
Analytics updated
```

---

# 92. Readiness Validation

A booking should show a clear readiness status.

Example:

```text
TRIP READINESS
────────────────────

✓ Itinerary approved
✓ Deposit received
✓ Transport confirmed
✓ Activities confirmed
✓ Hotel confirmed
✓ Guides assigned
✓ Group allocation complete

⚠ Student headcount awaiting final confirmation

STATUS:
NOT READY
```

This can become one of the most valuable operations features.

---

# 93. Admin Design Direction

The admin panel should feel:

- modern;
- operational;
- clean;
- information-dense but readable;
- fast;
- professional.

Avoid making the admin panel look like the public educational website.

The admin panel should prioritise clarity over brand storytelling.

---

# 94. Layout

Recommended:

```text
┌───────────────┬──────────────────────────────────┐
│ Sidebar       │ Header                           │
│               ├──────────────────────────────────┤
│ Dashboard     │                                  │
│ Sales         │ Main Content                     │
│ Products      │                                  │
│ Operations    │                                  │
│ Finance       │                                  │
│ Analytics     │                                  │
│               │                                  │
└───────────────┴──────────────────────────────────┘
```

---

# 95. Global Header

Include:

```text
Global Search
Notifications
Quick Create
User Menu
```

Possible Quick Create:

```text
+ Lead
+ Booking
+ School
+ Guide
```

---

# 96. Record Detail Layout

Example booking:

```text
BOOKING LLT-ISO-0063        CONFIRMED

SMK ABC
18–19 October 2026

[Overview]
[Itinerary]
[Groups]
[Guides]
[Suppliers]
[Payments]
[Checklist]
[Feedback]
[Activity Log]
```

Tabs are appropriate for complex record pages.

---

# 97. Activity Timeline

Each important record should have an activity timeline.

Example:

```text
15 Aug 10:30
Quotation v2 sent by Sarah

14 Aug 16:10
Guide Amir assigned

14 Aug 15:20
Booking confirmed

13 Aug 11:00
Customer accepted quotation
```

---

# 98. Empty State Philosophy

Do not display blank tables only.

Example:

> **No guides assigned yet.**

> Match suitable guides based on programme requirements and availability.

CTA:

**Find Guides**

---

# 99. Error Handling

Errors should explain what failed.

Bad:

```text
Validation error.
```

Better:

```text
This itinerary cannot be approved because the Coffee Science
activity supports only 30 students, while 60 students are currently
assigned to the session.
```

CTA:

```text
Create Group Rotation
```

---

# 100. Acceptance Criteria

The first usable admin version should allow staff to:

1. receive a Smart Trip Planner enquiry;
2. view structured school requirements;
3. create or review a programme recommendation;
4. manage programmes and activities;
5. create an itinerary;
6. identify itinerary capacity conflicts;
7. manage guide profiles;
8. recommend suitable guides;
9. calculate programme pricing;
10. issue a quotation;
11. convert an accepted quotation into a booking;
12. track booking status;
13. identify incomplete operational requirements.

---

# 101. Success Criteria

The system should reduce the amount of work that must be manually recreated for every booking.

Success means:

```text
Customer requirements are captured once.

Programme information is reusable.

Activity information is reusable.

Guide data is reusable.

Pricing rules are reusable.

Itinerary logic is reusable.

Operational workflows are reusable.
```

Staff should spend increasingly more time on:

```text
Review
Exceptions
Customer Relationships
Quality Control
```

and less time on:

```text
Copying Information
Rebuilding Itineraries
Manual Calculations
Searching for Guides
Remembering Follow-Ups
Managing Multiple Spreadsheets
```

---

# 102. Final Product Principle

The Libang Libu Travel admin panel should evolve into:

> **A central operating system for designing, selling and delivering travel experiences.**

Ipoh School Outing is the initial specialised product.

Its unique workflow is:

```text
School Requirements
        ↓
Educational Matching
        ↓
Feasible Itinerary
        ↓
Suitable Guides
        ↓
Commercial Proposal
        ↓
Booking
        ↓
Operational Delivery
        ↓
Quality Feedback
```

The platform should ensure that as Libang Libu Travel receives more enquiries and bookings, the company's operational workload does not increase at the same rate.

That is the core scalability objective.