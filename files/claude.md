# gewe - Home Health Supply Automation Platform

**Tagline:** Simplifying supply management for home health clinicians

**Pronunciation:** "gee-wee" (from "get well")

---

## Project Context

### The Problem We're Solving

Home health clinicians face significant supply management chaos:

**Current State Pain Points:**
- **Time waste:** Clinicians or dedicated supply teams spend 3+ hours/week on supply paperwork
- **Visibility gap:** Clinicians don't know what supplies were ordered until they arrive at patient's home
- **Communication breakdown:** Multiple handoffs between doctor → supply team → clinician → patient
- **Care delays:** Wrong/missing supplies delay patient care and impact quality ratings
- **Cost inefficiency:** Agencies hire entire supply teams to manage this manually
- **Tracking complexity:** Managing supplies for 20+ patients across different stages is overwhelming

**Real-World Impact:**
- Poor care delivery when supplies don't arrive on time
- Clinician frustration and burnout
- Agency costs for supply coordination teams
- Lower quality ratings affecting agency reputation
- Wasted time that should be spent on patient care

### Our Solution

**gewe** automates the entire supply workflow from CMS-485 certification through delivery:

1. **Intelligent 485 Processing:** Extract supply orders from physician-certified care plans
2. **Smart Approval Flow:** Doctor signs → Clinician confirms with 2 clicks → Auto-order placed
3. **Real-Time Tracking:** Unified dashboard showing all patients, supply status, delivery ETAs
4. **Voice Logging:** Post-visit voice input for carstock usage (hands-free while driving)
5. **Full Visibility:** Everyone sees the same data - no information silos

**Value Proposition:**
- **15 minutes saved per patient** on supply coordination
- **Eliminate supply teams** or free them for higher-value work
- **Zero supply errors** through automated ordering
- **Better patient outcomes** with reliable supply delivery
- **Clinician focus** on care instead of paperwork

---

## Team Structure

**Lue (Research/Strategy/Design Lead)**
- Home health domain expertise
- Product requirements & user flows
- Design system & UX specifications
- Security/compliance strategy
- Investor pitch preparation

**CTO Liu (Technical Lead)**
- Full-stack implementation
- Backend architecture (REST API, database, auth)
- Frontend development (React + Tailwind)
- Butterbase integration
- Demo deployment

---

## Product Overview

### Core User Journey

**Phase 1: Patient Assignment (24-48 hours before visit)**
1. Home health agency accepts patient
2. Clinician receives assignment
3. 485 form appears in gewe dashboard with "Pending Doctor Signature" status

**Phase 2: First Visit & Care Plan Confirmation**
1. Clinician visits patient within 24-48 hours
2. Reviews/adjusts care plan based on in-person assessment
3. Care plan (485) sent to physician for signature

**Phase 3: Supply Approval (gewe automation starts here)**
1. System monitors for doctor signature on 485
2. Once signed, clinician gets notification
3. Clinician reviews supply list in gewe
4. **2-click approval:** "Yes, order these supplies to patient home"
5. gewe connects to supplier API (Medline/McKesson)
6. Order placed automatically with patient's home address

**Phase 4: Tracking & Visibility**
1. Dashboard shows all patients with color-coded supply status:
   - 🟡 Pending Doctor Signature
   - 🔵 Ready to Order
   - 🟢 Ordered - Arrives Tuesday
   - ✅ Delivered
2. Tracking updates pulled from supplier APIs
3. Patient receives SMS/email with delivery estimate
4. Clinician sees at-a-glance: "Will supplies arrive before my next visit?"

**Phase 5: Post-Visit Logging (Future/Prototype)**
1. After patient visit, clinician uses voice while driving
2. "I used 5 gauze pads, 2 saline bottles, 1 wound vac"
3. System logs carstock usage automatically
4. Inventory depletes, triggers restock alert when low

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      gewe Platform                          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐     ┌──────────────┐
│  EHR System  │      │   Clinician  │     │   Supplier   │
│  (Future)    │      │   Mobile/Web │     │     APIs     │
│              │      │     App      │     │  (Medline/   │
│ HL7/FHIR API │      │              │     │  McKesson)   │
└──────────────┘      └──────────────┘     └──────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Butterbase Backend (HIPAA-Compliant)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Auth &  │  │ Database │  │   File   │  │   API    │  │
│  │   RBAC   │  │ (Patient,│  │  Storage │  │ Gateway  │  │
│  │          │  │ Supplies)│  │  (485s)  │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**485 Document Processing Flow:**
```
EHR System → 485 PDF Export → gewe Upload Interface 
→ Document Storage (encrypted) → Metadata Extraction 
→ Patient Record Creation → Supply List Population
```

**Supply Ordering Flow:**
```
Doctor Signature Detected → Clinician Notification 
→ Clinician Reviews/Approves → API Call to Supplier 
→ Order Placement → Tracking Number Retrieved 
→ Status Updates (Polling/Webhook) → Dashboard Display
```

**Security/Encryption Layer:**
```
All PHI Data → AES-256 Encryption at Rest
All API Calls → TLS 1.3 in Transit
User Actions → Audit Log (Who/What/When)
Access → RBAC (Clinicians see only their patients)
```

---

## MVP Scope (Hackathon Demo)

### ✅ MUST-HAVE (Core Demo)

**Dashboard View:**
- Patient list (4 mock patients)
- Color-coded status indicators
- Large, readable text (accessibility for older clinicians)
- Mobile-responsive design

**Patient Detail View:**
- 485 information display (name, diagnosis, supplies, doctor signature status)
- Supply list with quantities
- "Approve & Order" button (primary CTA)
- Tracking information panel

**Supply Approval Flow:**
- Doctor signature status check
- One-click approval interaction
- Smooth state transition animation
- Confirmation feedback

**Tracking Status:**
- Multi-patient overview
- Status badges (Pending/Ordered/Delivered)
- Estimated delivery dates
- Visual progress indicators

### 🔄 BUILD IF TIME

**Voice Logging Prototype:**
- "Voice Log" button
- Pre-filled demo showing voice-to-text
- Carstock deduction interface

**Enhanced UX:**
- Loading states and animations
- Empty states
- Error handling UI

### 📋 SHOW AS ROADMAP (Slides/Pitch)

**Phase 2 Features:**
- Real EHR integration (HL7/FHIR)
- Live supplier API connections
- Mid-visit change approval workflow
- Advanced carstock inventory management

**Phase 3 Features:**
- Multi-agency support (white-label)
- Analytics dashboard for agency administrators
- Predictive supply ordering (ML-based)
- Insurance pre-authorization automation

---

## Design Philosophy

### Apple-Inspired Minimalism

**Core Principles:**
1. **Less is More:** Remove all non-essential UI elements
2. **Clarity First:** Large text, high contrast, obvious actions
3. **Whitespace Breathing Room:** Don't crowd information
4. **Immediate Feedback:** Every action has clear visual response
5. **Accessibility:** Designed for older users, works for everyone

**Visual Language:**
- Clean sans-serif typography (system fonts)
- Ample padding and spacing
- Subtle shadows, no heavy borders
- Color used sparingly for status/hierarchy
- Mobile-first, touch-friendly targets (48px min)

**Color Strategy:**
- Neutral grays for structure
- Blue for primary actions (trust, medical)
- Green for success/delivered
- Yellow for pending/warning
- Red used only for critical errors

---

## Security & HIPAA Compliance

### Regulatory Framework

**HIPAA Requirements:**
- Business Associate Agreement (BAA) with all vendors
- Encryption at rest and in transit
- Access controls and audit trails
- Data minimization (only necessary PHI)
- Breach notification procedures

**Our Implementation:**

**1. Data Encryption**
- At Rest: AES-256 (Butterbase managed)
- In Transit: TLS 1.3 for all API calls
- Database: Encrypted columns for all PHI fields

**2. Access Controls**
- Role-Based Access Control (RBAC):
  - Clinicians: See only assigned patients
  - Office Managers: See all patients for their agency
  - Admin: System management, no PHI access
- Multi-Factor Authentication (MFA) required
- Session timeout after 15 minutes of inactivity
- Device-level biometric auth on mobile

**3. Audit Logging**
- Every PHI access logged: Who, What, When, Where (IP)
- Immutable audit trail (append-only)
- Automated alerts for suspicious access patterns
- Quarterly audit reviews

**4. Data Minimization**
- Store only PHI required for supply management
- No unnecessary personal information
- Anonymized data for analytics/reporting
- Automatic data purge after retention period (7 years per HIPAA)

**5. Vendor Compliance**
- **Butterbase:** Provides BAA, SOC 2 Type II certified
- **Supplier APIs:** BAA required, no PHI transmitted (only order data)
- **Voice Processing:** AWS Transcribe Medical (HIPAA-compliant, BAA signed)

**6. Physical Security**
- No local storage of PHI on devices
- Remote wipe capability for lost devices
- Encrypted backups

### Voice Agent Security

**Special Considerations:**
- Voice recordings contain PHI (patient names, conditions)
- **Solution:** Process voice locally on device
- Speech-to-text via AWS Transcribe Medical (HIPAA-compliant)
- Audio deleted immediately after transcription
- Only structured data stored (supply names, quantities - no patient identifiers in voice logs)

---

## Supplier Integration Strategy

### API Integration Architecture

**Standardized Middleware Layer:**
```
gewe Order Format (Normalized)
        ↓
┌───────────────────────────┐
│   Supplier API Gateway    │
│  (Translation Layer)      │
└───────────────────────────┘
        ↓
   ┌────┴────┬────────┬──────────┐
   ▼         ▼        ▼          ▼
Medline  McKesson  Cardinal   Custom
  API      API     Health     EDI/CSV
```

**Integration Approach:**

**Tier 1 Suppliers (Full API):**
- Medline, McKesson, Cardinal Health
- Real-time order submission via REST APIs
- Automated tracking number retrieval
- Webhook-based status updates

**Tier 2 Suppliers (EDI):**
- Standard EDI 850 (Purchase Order) format
- Batch processing
- Email-based tracking updates

**Tier 3 Suppliers (Manual/CSV):**
- CSV export generation
- Manual upload to supplier portal
- Email tracking confirmations

**For Hackathon Demo:**
- Mock Medline API responses
- Simulated tracking updates
- Realistic status progression

**Investor Pitch Answer:**
> "We've built a standardized API layer that translates 485-approved supply lists into each supplier's required format. For major distributors like Medline and McKesson, we integrate via their REST APIs for real-time ordering and tracking. For suppliers without APIs, we support EDI integration or generate CSV exports. The key innovation: clinicians never touch this complexity - they just click 'approve' and our system handles all supplier communication automatically."

---

## Hackathon Strategy

### Beta Hacks Judging Criteria (100 points total)

**1. Real-World Potential & GTM (10 points)**
- ✅ **Vertical Viability:** Healthcare is high-value, regulated, proven market
- ✅ **Scalability:** Every home health agency needs this (7,000+ agencies in US)
- ✅ **Demo Quality:** Clear value prop - "Save 3 hours/week, eliminate supply errors"
- ✅ **Contextual Logic:** Solves actual pain point with measurable ROI

**Our Pitch:**
- $100B+ home health market, growing 7% annually
- 7,000+ home health agencies in US
- Average agency has 50-200 clinicians
- Our TAM: $500M+ (conservative estimate)
- Go-to-market: Direct sales to agencies, pilot with 2-3 agencies in Q1

**2. Ecosystem & Tooling Mastery (10 points)**
- ✅ **Butterbase:** Backend, auth, HIPAA-compliant data storage
- 🔄 **Photon:** (Nice-to-have) Voice interface integration
- ⚠️ **Cumulus Labs:** (Skip for now) Vision models for 485 OCR - mention as future

**Strategy:** Deep integration with Butterbase (actually use it), mention others as roadmap

**3. Technical Execution & Innovation (10 points)**
- ✅ **Shipping Velocity:** Functional prototype in 3 hours
- ✅ **Technical Depth:** Real backend, proper data models, security architecture
- ✅ **Innovation:** Not just a UI wrapper - solving real integration problem (EHR → Supplier APIs)

**Demo Highlights:**
- Live mobile demo (real device, not simulator)
- Smooth user flow, no broken features
- Show security architecture diagram in pitch

**4. Continuity Post-Hackathon (10 points)**
- ✅ **User Engagement:** Lue has home health network for validation
- ✅ **Real Market:** Already talking to potential pilot agencies
- ✅ **Commitment:** This is our startup, not just a weekend project

**Post-Hackathon Plan:**
- Week 1: User interviews with 10 clinicians
- Week 2-3: Refine based on feedback
- Month 1: Pilot with 1 agency (20 clinicians)
- Month 2-3: Prove ROI, expand to 3 agencies
- Month 4: Raise seed round

---

## Sponsor Tool Integration

### Butterbase (Primary Integration)

**Why Butterbase:**
- HIPAA-compliant backend (critical for healthcare)
- Rapid setup (perfect for hackathon timeline)
- Production-ready (can use after demo)
- Automatic backend generation (database, auth, APIs)

**What We Use:**
- Database: Patient records, supply data, tracking info
- Authentication: Clinician login, role-based access
- File Storage: 485 documents (encrypted)
- API Gateway: RESTful endpoints for frontend

**Implementation:**
- Set up during Phase 1 (2:00-3:00 PM)
- Use for all data persistence
- Mention BAA and SOC 2 compliance in pitch

### Photon (Voice Interface - Optional)

**Why Photon:**
- iMessage integration = familiar interface for clinicians
- Voice agent for post-visit logging
- Differentiator from competitors

**Implementation Strategy:**
- **If time permits:** Basic integration showing voice → iMessage → gewe
- **If no time:** Show mockup, mention as next sprint feature
- **Pitch angle:** "Voice interface via Photon for hands-free logging while driving"

### Cumulus Labs (Future Roadmap)

**Why Mention:**
- Vision models perfect for 485 OCR automation
- Strong technical story for investors

**Pitch Integration:**
> "Currently, clinicians manually input 485 data. Our roadmap includes Cumulus Labs vision models for automatic OCR - upload the 485 PDF, AI extracts all supply data automatically. This reduces clinician time from 10 minutes to 10 seconds."

---

## Go-To-Market Strategy

### Target Customer

**Primary:** Home Health Agencies (100-500 clinicians)
- Established agencies with manual supply processes
- Already using EHR systems (integration path)
- Cost-conscious, looking for efficiency gains

**Secondary:** Large Health Systems with Home Health divisions
- 1000+ clinician organizations
- Higher compliance requirements (good fit for our security focus)
- Longer sales cycles but bigger contracts

### Pricing Model (Preliminary)

**Per-Clinician SaaS:**
- $49/clinician/month
- Annual contracts preferred
- Includes: Platform access, supplier integrations, basic support

**Enterprise (500+ clinicians):**
- Custom pricing
- White-label options
- Dedicated support, custom integrations

**Revenue Example:**
- Agency with 100 clinicians: $4,900/month = $58,800/year
- 10 agencies: $588,000 ARR
- 100 agencies: $5.88M ARR

### Competitive Landscape

**Current Solutions:**
- Manual processes (paper, Excel, phone calls)
- Generic inventory management software (not healthcare-specific)
- EHR built-in supply modules (clunky, not workflow-optimized)

**Our Advantages:**
- **Healthcare-native:** Built for home health workflow
- **HIPAA-first:** Security is core, not bolted on
- **Clinician UX:** Designed for users on the go, older demographics
- **Full automation:** 485 → ordering → tracking in one system

---

## Success Metrics

### Demo Day Success:
- ✅ Functional prototype (core flow working)
- ✅ Clear 10-minute pitch
- ✅ Answer all judge questions confidently
- 🎯 Win Beta Fund $25K investment
- 🎯 Top 3 finish overall

### Post-Hackathon Metrics:
- Week 1: 10 clinician interviews completed
- Month 1: 1 pilot agency signed (LOI)
- Month 3: 20 active clinicians using platform
- Month 3: 90% reduction in supply coordination time (measured)
- Month 6: 3 paying agencies, $15K MRR

---

## Future Roadmap

### Phase 1 (Months 1-3): MVP Validation
- Live pilot with 1-2 agencies
- Real EHR integration (HL7/FHIR)
- 2-3 major supplier API integrations
- Basic analytics dashboard

### Phase 2 (Months 4-6): Product-Market Fit
- Expand to 10 agencies
- Advanced carstock management
- Predictive ordering (ML)
- Mobile app (iOS/Android native)

### Phase 3 (Months 7-12): Scale
- 50+ agencies, 5,000+ clinicians
- White-label options
- Insurance pre-authorization automation
- API marketplace for third-party integrations

### Phase 4 (Year 2+): Platform
- Multi-specialty support (hospice, palliative, pediatric)
- International expansion
- Acquisition target for major EHR vendors or home health platforms

---

## Risk Mitigation

### Technical Risks:
- **EHR Integration Complexity:** Start with CSV import, API integrations later
- **Supplier API Availability:** Build abstraction layer, manual fallback
- **HIPAA Compliance:** Use certified vendors (Butterbase), regular audits

### Market Risks:
- **Slow Adoption:** Focus on agencies with existing pain, show clear ROI
- **Competitive Response:** Build deep workflow moat, not just feature parity
- **Regulatory Changes:** Stay engaged with CMS policy, adapt quickly

### Execution Risks:
- **Scope Creep:** Ruthlessly prioritize MVP features
- **Team Capacity:** Focus on core competencies (Lue: domain/design, Liu: technical)
- **Funding:** Bootstrap through pilots, raise seed after PMF proven

---

## Key Decision Log

**Decision:** Focus on mobile-first web app (not native mobile)
**Rationale:** Faster to build, works across platforms, easier to demo
**Trade-off:** Slightly worse UX than native, but acceptable for MVP

**Decision:** Mock supplier API for hackathon
**Rationale:** Real integration takes too long, mock shows concept equally well
**Trade-off:** Can't show live tracking, but simulated flow is convincing

**Decision:** Fake voice logging (button shows pre-filled form)
**Rationale:** Real voice integration risky for demo, takes 30+ minutes
**Trade-off:** Less impressive technically, but safer demo experience

**Decision:** Use Butterbase for backend
**Rationale:** HIPAA-compliant, fast setup, production-ready
**Trade-off:** Vendor lock-in, but acceptable for early stage

**Decision:** Large text, high contrast UI
**Rationale:** Target users (older clinicians) need accessibility
**Trade-off:** Less "sleek" looking, but better usability

---

## Resources & References

**Home Health Industry:**
- CMS Home Health Regulations: https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/HomeHealthPPS
- National Association for Home Care & Hospice: https://www.nahc.org/

**Technical:**
- Butterbase Documentation: https://butterbase.ai/docs
- HIPAA Compliance Guide: https://www.hhs.gov/hipaa/for-professionals/index.html
- HL7 FHIR Standard: https://www.hl7.org/fhir/

**Design:**
- Apple Human Interface Guidelines: https://developer.apple.com/design/
- Accessibility Guidelines (WCAG): https://www.w3.org/WAI/WCAG21/quickref/

---

## Contact & Team

**Lue** - Research/Strategy/Design Lead
- Home health domain expertise
- Product & UX strategy

**CTO Liu** - Technical Lead  
- Full-stack development
- System architecture

**gewe** - Get well at home
*Simplifying supply management for home health clinicians*

---

*Last Updated: [Hackathon Date]*
*Version: 1.0 (MVP Demo)*
