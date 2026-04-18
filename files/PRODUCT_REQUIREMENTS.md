# Product Requirements Document (PRD)
# gewe - Home Health Supply Automation Platform

**Version:** 1.0 MVP
**Owner:** Lue (Product Lead)
**Technical Lead:** CTO Liu
**Last Updated:** Hackathon Demo Day

---

## Product Vision

**Mission Statement:**
Enable home health clinicians to focus on patient care by automating the entire supply management workflow from physician certification to patient delivery.

**Success Criteria:**
- Reduce clinician supply coordination time from 3 hours/week to 15 minutes/week
- Eliminate supply ordering errors (target: 99%+ accuracy)
- Provide real-time visibility into supply status for all stakeholders
- Maintain HIPAA compliance and data security throughout

---

## User Personas

### Primary Persona: Sarah the Home Health Nurse

**Demographics:**
- Age: 52
- Role: Registered Nurse, Home Health
- Experience: 15 years in home health
- Tech Comfort: Moderate (uses iPhone, basic apps)
- Patients: 15-20 active patients

**Pain Points:**
- "I spend more time on paperwork than patient care"
- "I never know if supplies will arrive before my next visit"
- "The supply team orders the wrong items and I find out too late"
- "Tracking 20 patients' supply status is impossible with spreadsheets"
- "After visits, I'm driving and can't log supplies safely"

**Goals:**
- Spend maximum time on patient care
- Ensure patients always have needed supplies
- Reduce administrative burden
- Work efficiently while on the road

**User Journey with gewe:**
1. Gets new patient assignment → sees it in dashboard
2. After first visit → care plan sent to doctor
3. Gets notification when doctor signs → approves supplies with 2 clicks
4. Checks dashboard → knows exactly when supplies arrive
5. After visit → uses voice to log carstock usage while driving

### Secondary Persona: Mike the Office Manager

**Demographics:**
- Age: 38
- Role: Operations Manager, Home Health Agency
- Experience: 8 years in healthcare administration
- Tech Comfort: High
- Team: Manages 3 supply coordinators, 80 clinicians

**Pain Points:**
- "My supply team is constantly firefighting"
- "Clinicians call me asking 'where are the supplies?'"
- "We have no visibility into what's ordered, what's in transit"
- "Supply errors hurt our quality ratings"
- "Managing 80 clinicians' supply needs is chaos"

**Goals:**
- Eliminate supply coordination team overhead
- Improve clinician satisfaction
- Reduce supply-related quality issues
- Scale operations without adding headcount

---

## MVP Feature Set (Hackathon Demo)

### Feature 1: Patient Dashboard

**User Story:**
> As a clinician, I want to see all my assigned patients in one view so I can quickly understand their supply status without checking multiple systems.

**Acceptance Criteria:**
- [ ] Display list of 4 patients (mock data)
- [ ] Show patient name, primary diagnosis
- [ ] Display color-coded supply status badge:
  - 🟡 Yellow: "Pending Doctor Signature"
  - 🔵 Blue: "Ready to Order"
  - 🟢 Green: "Ordered - Arrives [Date]"
  - ✅ Green Check: "Delivered"
- [ ] Large, readable text (minimum 16px body, 24px headings)
- [ ] Touch-friendly tap targets (48px minimum)
- [ ] Mobile responsive (works on phone, tablet, desktop)
- [ ] Load time < 2 seconds

**UI Specifications:**
- Card-based layout with ample whitespace
- Patient cards show: Name, Diagnosis, Status, Next Visit Date
- Tapping card navigates to patient detail
- No scrolling needed for 4 patients (demo scope)

**Technical Requirements:**
- Frontend: React component with state management
- Data: Mock JSON structure (see SYNTHETIC_DATA.md)
- Routing: React Router for navigation

---

### Feature 2: Patient Detail View

**User Story:**
> As a clinician, I want to see a patient's 485 information and supply list in one place so I can review everything before approving the order.

**Acceptance Criteria:**
- [ ] Display patient demographics (name, DOB, address)
- [ ] Show primary diagnosis and relevant medical history (1 sentence)
- [ ] List all approved supplies with quantities
- [ ] Display doctor signature status clearly
- [ ] Show next scheduled visit date
- [ ] Highlight if supplies will arrive before next visit

**UI Sections:**

**Patient Info Panel:**
- Name (28px bold)
- Age, DOB
- Home address (for delivery verification)
- Primary diagnosis (16px, gray text)

**Care Plan Summary:**
- Brief 1-sentence patient context
- Example: "Post-surgical wound care for diabetic patient requiring daily dressing changes"

**Supply List:**
- Table format: Item Name | Quantity | Unit
- Large text, high contrast
- Example:
  ```
  Sterile Gauze Pads (4x4")     50 pads
  Saline Solution               4 bottles
  Medical Tape                  2 rolls
  Wound Vac Supplies            1 kit
  ```

**Doctor Signature Status:**
- If unsigned: 🟡 "Waiting for Dr. Smith's signature"
- If signed: ✅ "Dr. Smith signed on March 15, 2024"

**Primary Action:**
- Large blue button: "Approve & Order Supplies"
- Only enabled when doctor has signed
- Disabled state shows: "Waiting for physician approval"

**Technical Requirements:**
- Component receives patient ID via route params
- Fetch patient data from mock API/state
- Button click triggers supply approval flow
- Loading states for async operations

---

### Feature 3: Supply Approval Flow

**User Story:**
> As a clinician, I want to approve supply orders with minimal clicks so I can quickly process multiple patients without wasting time.

**Acceptance Criteria:**
- [ ] Single-button approval ("Approve & Order Supplies")
- [ ] Confirmation modal with summary
- [ ] Clear visual feedback on submission
- [ ] Smooth state transition animation
- [ ] Update dashboard status immediately
- [ ] Success confirmation message

**Flow Steps:**

**Step 1: Click "Approve & Order Supplies"**
- Button shows loading spinner
- Modal appears

**Step 2: Confirmation Modal**
```
┌─────────────────────────────────────┐
│  Confirm Supply Order               │
│                                     │
│  Patient: John Doe                  │
│  Delivery: 123 Main St, Apt 4B     │
│  Items: 6 supply types              │
│  Estimated Delivery: March 18       │
│                                     │
│  [Cancel]  [Confirm Order]         │
└─────────────────────────────────────┘
```

**Step 3: Processing**
- Show loading state
- Simulate API call to supplier (500ms delay)
- Update patient status in state

**Step 4: Success Confirmation**
```
✅ Order Placed Successfully!

Tracking: #ML-2847593
Estimated Delivery: Tuesday, March 18
Patient will receive SMS notification.

[View Tracking] [Back to Dashboard]
```

**Technical Requirements:**
- Modal component with overlay
- State machine for approval states (idle → confirming → processing → success)
- Optimistic UI updates
- Error handling (show retry if "API call" fails)

---

### Feature 4: Supply Tracking Status

**User Story:**
> As a clinician, I want to see real-time tracking information for all my patients' supply orders so I know if they'll arrive on time.

**Acceptance Criteria:**
- [ ] Display tracking number
- [ ] Show delivery estimate
- [ ] Indicate if delivery is before next scheduled visit
- [ ] Color-coded status indicators
- [ ] Link to carrier tracking (if available)

**Tracking States:**

**Ordered:**
- Status: "Order Placed"
- Color: Blue
- Info: "Estimated delivery: Tuesday, March 18"

**In Transit:**
- Status: "Shipped"
- Color: Green
- Info: "Out for delivery - Arrives today by 5 PM"

**Delivered:**
- Status: "Delivered"
- Color: Green with checkmark
- Info: "Delivered March 18 at 2:34 PM"

**Delayed:**
- Status: "Delayed"
- Color: Orange
- Info: "New estimated delivery: March 20"
- Alert: ⚠️ "May arrive after next visit (March 19)"

**UI Component:**
```
┌─────────────────────────────────────┐
│  Supply Tracking                    │
│                                     │
│  🟢 Shipped                         │
│  Tracking: #ML-2847593              │
│  Carrier: FedEx                     │
│                                     │
│  Expected: Tuesday, March 18        │
│  Next Visit: Thursday, March 20     │
│  ✅ Supplies arrive before visit    │
│                                     │
│  [View Full Tracking →]            │
└─────────────────────────────────────┘
```

**Technical Requirements:**
- Mock tracking data with realistic progression
- Date comparison logic (delivery vs. next visit)
- Visual indicators for on-time vs. late

---

### Feature 5: Voice Logging (Prototype)

**User Story:**
> As a clinician, I want to log carstock usage via voice while driving so I don't have to pull over and type.

**Acceptance Criteria (MVP/Demo):**
- [ ] "Voice Log" button visible on patient detail page
- [ ] Click button shows pre-filled form (simulated voice input)
- [ ] Form displays: "I used 5 gauze pads, 2 saline bottles"
- [ ] Submit button updates carstock inventory
- [ ] Success message confirms logging

**Demo Flow:**

**Step 1: Trigger**
- After visit, clinician clicks "Voice Log" button
- UI shows microphone icon (non-functional in demo)

**Step 2: Simulated Voice Recognition**
- Show pre-filled text area:
  ```
  "I used 5 gauze pads, 2 saline bottles, 
   and 1 roll of medical tape for patient John Doe"
  ```
- Include edit capability

**Step 3: Confirmation**
- "Submit Voice Log" button
- Parse quantities and items
- Update carstock numbers

**Step 4: Success**
```
✅ Carstock Updated

Gauze Pads: 45 → 40 remaining
Saline Bottles: 12 → 10 remaining
Medical Tape: 8 → 7 remaining

Low Stock Alert: Gauze pads running low (40 left)
```

**Future Implementation Notes:**
- Real voice: Web Speech API or Photon integration
- NLP to parse supply names and quantities
- Background processing while driving
- Offline capability with sync when connected

**Technical Requirements (Demo):**
- Button component
- Modal with text display
- Simple string parsing (extract numbers)
- State update for inventory

---

## Non-Functional Requirements

### Performance
- Page load: < 2 seconds on 4G mobile
- API response: < 500ms for all operations
- UI interactions: < 100ms feedback

### Accessibility
- WCAG 2.1 AA compliance
- Large text minimum: 16px body, 24px headings
- High contrast ratios (4.5:1 minimum)
- Touch targets: 48px minimum
- Screen reader compatible

### Security
- All data encrypted at rest (AES-256)
- All data encrypted in transit (TLS 1.3)
- HIPAA compliant (see SECURITY_ARCHITECTURE.md)
- Session timeout: 15 minutes inactivity
- MFA required for login (future)

### Browser/Platform Support
- **Mobile:** iOS Safari 14+, Chrome 90+
- **Desktop:** Chrome 90+, Safari 14+, Firefox 88+
- **Responsive:** 320px (mobile) to 1920px (desktop)

### Usability
- Zero training required for basic flow
- Average time to approve supplies: < 30 seconds
- Error messages in plain language (no technical jargon)
- Undo capability for accidental actions

---

## Future Features (Post-MVP)

### Phase 2: Enhanced Automation
- [ ] Real EHR integration (HL7/FHIR)
- [ ] OCR for automatic 485 data extraction (Cumulus Labs)
- [ ] Predictive ordering based on visit patterns
- [ ] Bulk approval (approve supplies for multiple patients at once)

### Phase 3: Advanced Tracking
- [ ] Push notifications for delivery updates
- [ ] SMS alerts to patients
- [ ] Integration with more suppliers (10+ APIs)
- [ ] Real-time inventory forecasting

### Phase 4: Agency Management
- [ ] Admin dashboard for office managers
- [ ] Analytics: supply costs, usage patterns, efficiency metrics
- [ ] Team performance tracking
- [ ] Budget management and approval workflows

### Phase 5: Intelligence Layer
- [ ] ML-based supply recommendations
- [ ] Anomaly detection (unusual ordering patterns)
- [ ] Cost optimization suggestions
- [ ] Compliance monitoring and alerts

---

## Success Metrics & KPIs

### User Adoption
- **Target:** 80% of clinicians actively using gewe within 30 days of rollout
- **Measurement:** Weekly active users / Total clinicians

### Time Savings
- **Target:** 2.5 hours saved per clinician per week (from 3 hours to 30 min)
- **Measurement:** Time-tracking surveys, before/after comparison

### Supply Accuracy
- **Target:** 99% order accuracy (correct items, quantities, delivery address)
- **Measurement:** Error reports / Total orders

### Delivery On-Time Rate
- **Target:** 95% of supplies arrive before scheduled visit
- **Measurement:** Delivery date vs. visit date comparison

### Clinician Satisfaction
- **Target:** NPS score > 50
- **Measurement:** Monthly surveys

### Cost Savings for Agency
- **Target:** $50K+ annual savings for 100-clinician agency
- **Measurement:** Supply team reduction + error reduction + efficiency gains

---

## Out of Scope (MVP)

The following are explicitly **NOT** included in the hackathon demo:

- ❌ Real EHR integration
- ❌ Live supplier API connections
- ❌ Real voice recognition
- ❌ User authentication (show logged-in state only)
- ❌ Multi-agency support
- ❌ Admin/office manager views
- ❌ Mid-visit change approvals
- ❌ Analytics dashboards
- ❌ Email/SMS notifications
- ❌ iOS/Android native apps
- ❌ Offline mode
- ❌ Data export features

These will be addressed in future phases but are not critical for demonstrating the core value proposition.

---

## Open Questions & Dependencies

**Questions for Validation:**
1. What is acceptable delivery timeframe? (48 hours? 72 hours?)
2. How often do supply needs change mid-care period?
3. What percentage of orders currently have errors?
4. Average cost per supply coordination FTE at agencies?

**Dependencies:**
- Butterbase account setup (CTO Liu)
- Mock data generation (both)
- Design asset creation (Lue)
- Demo environment deployment (CTO Liu)

**Risks:**
- Voice demo might fail under demo conditions → have backup (show pre-filled form)
- Butterbase integration might take longer than expected → fallback to local state
- Mobile responsiveness issues → test on real device early

---

## Appendix: User Story Mapping

### Epic 1: Patient Management
- As a clinician, I see all my patients in one dashboard
- As a clinician, I view detailed patient info and care plan
- As a clinician, I know when my next visit is scheduled

### Epic 2: Supply Workflow
- As a clinician, I see when doctor has signed 485
- As a clinician, I approve supply orders with minimal clicks
- As a clinician, I track supply delivery status
- As a clinician, I know if supplies will arrive on time

### Epic 3: Carstock Management  
- As a clinician, I log supplies used after each visit
- As a clinician, I see my current carstock inventory
- As a clinician, I get alerts when carstock is running low

### Epic 4: Communication
- As a patient, I receive delivery notifications
- As a clinician, I see supplier tracking information
- As an office manager, I have visibility into all orders

---

*This PRD is a living document and will be updated as we learn from user feedback and technical implementation.*
