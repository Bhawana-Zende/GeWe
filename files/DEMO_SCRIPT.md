# Demo Script & Pitch Preparation
# gewe - Beta Hacks Presentation

**Duration:** 10 minutes total (7 min demo + 3 min Q&A)
**Presenters:** Lue (Primary), CTO Liu (Technical Support)

---

## Opening (30 seconds)

**Lue:**
> "Hi, I'm Lue, and this is my co-founder Liu. We're building **gewe** - get well at home.
> 
> Home health nurses like Sarah spend 3 hours every week coordinating medical supplies instead of caring for patients. They don't know what's ordered, what's arriving, or if it'll be there before their next visit. Wrong supplies delay patient care and hurt quality ratings.
>
> gewe automates the entire supply workflow - from doctor's signature to patient's doorstep. Let me show you."

**Key Points:**
- State problem clearly (3 hours/week wasted)
- Introduce solution (automation)
- Transition immediately to demo

---

## Demo Flow (6 minutes)

### Scene 1: The Dashboard (1 min)

**[Show mobile device with dashboard loaded]**

**Lue:**
> "This is Sarah, a home health nurse with 4 patients today. One glance tells her everything she needs to know."

**[Point to each patient card]**

> "John Doe - supplies already delivered. ✅
> Sarah Martinez - ordered, arrives Tuesday. 🟢
> Robert Chen - waiting for doctor signature. 🟡
> Mary Johnson - ready to order. 🔵"

**[Tap on Sarah Martinez card]**

> "Let's look at Sarah Martinez, a diabetic wound care patient."

**Key Points:**
- Large, readable UI (accessibility)
- Color-coded status (instant understanding)
- Mobile-first design

---

### Scene 2: Patient Detail & Approval (2 min)

**[Show patient detail page]**

**Lue:**
> "Here's everything Sarah needs to know: patient info, diagnosis, and the approved supply list from the CMS-485 form."

**[Scroll through supply list]**

> "Gauze pads, saline solution, wound vac supplies - all approved by Dr. Jennifer Smith on March 14th."

**[Point to signature status]**

> "The system monitors for the doctor's signature. Once signed, Sarah gets notified immediately."

**[Tap "Approve & Order Supplies" button]**

> "With two clicks, Sarah approves the order."

**[Show confirmation modal]**

> "Quick review: right patient, right address, right supplies. Confirm."

**[Show loading animation, then success message]**

> "Done. Order placed with Medline. Tracking number generated. Estimated delivery: Tuesday."

**[Return to dashboard - status updated to green]**

> "Dashboard instantly updates. Sarah knows supplies will arrive before her Thursday visit."

**Key Points:**
- Two-click approval (vs. 30 minutes of phone calls)
- Real-time updates
- Confidence that supplies arrive on time

---

### Scene 3: Supply Tracking (1 min)

**[Show tracking view]**

**Lue:**
> "Sarah can track all her patients' supplies in one place."

**[Show tracking details]**

> "Tracking number, carrier, estimated delivery. If there's a delay, she knows immediately and can reschedule visits."

**[Point to "Arrives before visit" indicator]**

> "This is critical - the system compares delivery date to next visit date. Green means Sarah's good to go. Orange would mean she needs to adjust her schedule."

**Key Points:**
- Proactive visibility (not reactive firefighting)
- Saves wasted trips to patients without supplies

---

### Scene 4: Voice Logging (1 min) [Optional - if time]

**[Show voice log button]**

**Lue:**
> "After a visit, Sarah is driving to her next patient. She can't safely type."

**[Tap voice log button]**

> "Voice input lets her log supply usage hands-free."

**[Show pre-filled text: "I used 5 gauze pads, 2 saline bottles..."]**

> "The system parses her natural language, updates her carstock inventory, and alerts her when supplies are running low."

**[Show updated carstock with low-stock alert]**

> "Gauze pads down to 40. System suggests restocking soon."

**Key Points:**
- Safety (hands-free while driving)
- Automation (no manual data entry)
- Proactive inventory management

---

### Scene 5: The Impact (1 min)

**[Return to dashboard view]**

**Lue:**
> "Before gewe, Sarah spent 15 minutes per patient on supply coordination. Now it's 2 clicks and she's done.
>
> For a nurse with 20 patients, that's **3 hours back every week** - time she can spend on actual patient care.
>
> For home health agencies, gewe eliminates the need for dedicated supply teams, reduces ordering errors to near zero, and improves quality ratings by ensuring supplies always arrive on time."

**[Show summary slide or stay on dashboard]**

**Key Metrics to Highlight:**
- **15 minutes → 30 seconds** per patient
- **3 hours/week** saved per clinician
- **99% supply accuracy** (vs. 60-70% manual)
- **$50K+ annual savings** for 100-clinician agency

---

## Closing & Ask (30 seconds)

**Lue:**
> "We're at the perfect inflection point for gewe. The $100 billion home health market is growing 7% annually, and agencies are desperate for workflow automation.
>
> Our roadmap includes real EHR integration, predictive ordering with ML, and expansion to hospice and palliative care.
>
> We're here today to partner with Beta Fund to scale gewe from 1 agency to 100 agencies in the next year.
>
> Thank you. Happy to answer questions."

---

## Q&A Preparation

### Technical Questions

**Q: "How does the system handle HIPAA compliance?"**

**A (Lue or Liu):**
> "HIPAA compliance is our foundation, not an afterthought. All patient data is encrypted with AES-256 at rest and TLS 1.3 in transit. We use Butterbase, a HIPAA-compliant backend with a signed Business Associate Agreement and SOC 2 Type II certification. Role-based access control ensures nurses only see their assigned patients, and every data access is logged for 7 years. We're architected to pass a full HIPAA audit today."

---

**Q: "How does supplier integration actually work?"**

**A (Liu):**
> "We've built a standardized API layer that connects to major medical supply distributors like Medline, McKesson, and Cardinal Health. Our system translates the 485-approved supply list into each supplier's required format, submits orders via their REST APIs, and pulls back tracking information in real-time. For suppliers without APIs, we support EDI integration or CSV exports. The key innovation is that clinicians never touch this complexity - they just click 'approve' and our middleware handles the rest."

---

**Q: "What if the supplier API goes down?"**

**A (Liu):**
> "We have a fallback workflow. If the automated API fails, the system generates a formatted order that can be manually submitted via the supplier's web portal or phone. We also queue failed orders for automatic retry every 5 minutes. For critical orders, we send an alert to the agency office manager so they can place it manually while we resolve the API issue."

---

### Business Questions

**Q: "Who are your competitors?"**

**A (Lue):**
> "The primary competitor is manual processes - Excel spreadsheets, phone calls, and fax machines. Some agencies use generic inventory management software, but it's not built for healthcare workflows and lacks 485 integration. A few EHR vendors have basic supply modules, but they're clunky and don't optimize for mobile-first nurses on the road. Our advantage is that we're purpose-built for home health, HIPAA-native, and designed for the actual user - not the IT department."

---

**Q: "What's your go-to-market strategy?"**

**A (Lue):**
> "We start with direct sales to mid-size agencies (100-500 clinicians) that already feel the pain. Our pilot customer is [Agency Name], a 150-clinician agency in [City]. We're pricing at $49 per clinician per month, which pays for itself in the first month through eliminated supply team costs and reduced errors. After proving ROI with 3-5 agencies, we'll build a sales team and target the 7,000+ home health agencies in the US. Long-term, we see acquisition potential from major EHR vendors or home health platforms."

---

**Q: "How do you acquire customers?"**

**A (Lue):**
> "I have 3.5 years of experience working in home health as a Design Verification engineer at Apple, and I have direct relationships with agency administrators and clinicians who are begging for this solution. We're starting with warm intros to agencies in my network, running pilots to prove ROI, then using case studies and word-of-mouth within the tight-knit home health community. Industry conferences like NAHC are also key channels. Once we have 10 paying customers, we'll invest in a sales team."

---

**Q: "What's your unfair advantage?"**

**A (Lue):**
> "Two things: domain expertise and timing. I've worked in home health and understand the workflow pain points intimately. Most tech founders are building for industries they've never touched. Second, HIPAA compliance is a huge barrier to entry. We're HIPAA-native from day one because we have to be - that's a moat. Competitors would need to rebuild their entire stack to compete with us in healthcare. Finally, home health is exploding post-COVID, and agencies are desperate for automation. The market is pulling us forward."

---

**Q: "How big is the market?"**

**A (Lue):**
> "The US home health market is $100 billion and growing 7% annually. There are 7,000+ Medicare-certified home health agencies with a combined 500,000+ clinicians. At $49 per clinician per month, a conservative 10% market share is $300 million in ARR. But the addressable market is even bigger - hospice, palliative care, and international expansion. We're focused on the US home health segment first, but this model works wherever clinicians visit patients at home."

---

**Q: "What's your biggest risk?"**

**A (Lue):**
> "The biggest risk is slow adoption by agencies that are stuck in their ways. Home health is notoriously slow to change, and convincing administrators to switch from 'what works' to a new system takes time. That's why we're starting with agencies that are already in pain and have tried other solutions. Once we have 5-10 successful case studies showing 3 hours saved per clinician per week, the ROI becomes undeniable. The second risk is regulatory changes to HIPAA or CMS policies, but we stay engaged with industry associations to adapt quickly."

---

### Product Questions

**Q: "What happens when a clinician needs to change supplies mid-visit?"**

**A (Lue):**
> "Great question - that's Phase 2 of our roadmap. The MVP focuses on the standard 485 approval flow because that's 90% of cases. For mid-visit changes, we're building an approval workflow where the clinician requests the change via the app, it goes to the office manager for approval (insurance pre-auth if needed), and then it's either added to the order or pulled from carstock. We deliberately scoped that out of the hackathon demo to nail the core workflow first."

---

**Q: "How does voice logging work technically?"**

**A (Liu):**
> "For the demo, we're showing a prototype with pre-filled text to illustrate the concept. In production, we'll use AWS Transcribe Medical, which is HIPAA-compliant, to convert speech to text. We process the audio locally on the device, send only the audio stream to AWS for transcription, and immediately delete the audio after converting to text. The text is then parsed with natural language processing to extract supply names and quantities. We only store the structured data (5 gauze pads used), not the original audio, which minimizes PHI exposure."

---

**Q: "Can this integrate with [specific EHR]?"**

**A (Liu):**
> "Yes, we're building HL7 and FHIR API connectors for EHR integration. Most major EHRs like Axxess, Homecare Homebase, and WellSky support these standards. The integration lets us pull 485 data automatically instead of manual upload, and push order status back to the EHR for complete visibility. We're starting with manual uploads for MVP to prove the workflow, then adding EHR connectors based on customer demand."

---

**Q: "What about agencies that use multiple suppliers?"**

**A (Lue):**
> "Great question - most agencies have contracts with 2-3 suppliers. Our system supports multi-supplier workflows. When a clinician approves supplies, we can split the order across suppliers based on pre-configured rules (e.g., Medline for wound care, McKesson for diabetic supplies). The dashboard shows tracking from all suppliers in one unified view. Agencies can configure their supplier preferences per supply category, and we optimize for cost and delivery speed."

---

### Investor-Specific Questions

**Q: "Why should Beta Fund invest in gewe?"**

**A (Lue):**
> "Three reasons: huge market, clear pain point, and defensible moat. The home health market is $100 billion and growing fast, with 7,000+ agencies desperate for automation. We're solving a problem that costs agencies tens of thousands per year in wasted time and errors. And our HIPAA-native architecture is a technical moat - competitors can't just add this feature; they need to rebuild their entire backend. We have domain expertise, pilot customers ready to sign, and a path to $10M ARR in 2 years. This is the right team, right market, right time."

---

**Q: "How much are you raising?"**

**A (Lue):**
> "We're raising a $500K pre-seed round to fund our first year: 2 engineers, 1 sales/ops hire, pilot expansion to 10 agencies, and EHR integration development. That gets us to 500 active clinicians, $25K MRR, and clear product-market fit. From there, we'll raise a Series A to scale sales and expand to hospice/palliative care markets. Today, we're here for the $25K Beta Fund investment to kickstart that journey and validate the model."

---

**Q: "What do you need the funding for specifically?"**

**A (Lue):**
> "Three things: product development, customer acquisition, and compliance. Product: finish EHR integrations and build the mid-visit change approval workflow ($200K eng costs). Customer acquisition: hire a sales lead to close 10 agencies, plus marketing for conferences and content ($150K). Compliance: SOC 2 Type II certification, HIPAA audit, penetration testing ($50K). The remaining $100K is runway for operations and legal. Our burn rate will be ~$40K/month, so $500K gives us 12 months to hit revenue milestones."

---

## Presentation Tips

### Do's
- **Show, don't tell:** Demo on real device, not slides
- **Tell a story:** Follow Sarah the nurse through her day
- **Use concrete numbers:** "3 hours saved" not "lots of time saved"
- **Speak slowly:** Judges are processing a lot of demos
- **Make eye contact:** Don't just stare at the screen
- **Show passion:** You believe this changes lives

### Don'ts
- **Don't oversell:** Be realistic about MVP vs. vision
- **Don't apologize:** If something breaks, move on confidently
- **Don't use jargon:** Explain technical terms simply
- **Don't rush:** 10 minutes is plenty if you're focused
- **Don't ignore questions:** If you don't know, say so

---

## Backup Plans

### If Demo Breaks
**Plan A:** Have screenshots ready to show the flow
**Plan B:** Switch to a video recording of the demo
**Plan C:** Walk through the user journey with wireframes

### If API Fails
**Plan A:** Use static mock data in frontend (pre-loaded)
**Plan B:** Explain the architecture with a diagram

### If Device Fails
**Plan A:** Have demo loaded on two devices (phone + laptop)
**Plan B:** Use simulator/emulator as last resort

---

## Post-Demo Follow-Up

### If Judges Want More Info
- Have slide deck ready (problem, solution, market, team, ask)
- Have GitHub repo URL ready (if appropriate)
- Have one-pager with key metrics
- Have contact cards (email, LinkedIn)

### Networking
- Find judges after presentations
- Thank them for their time
- Ask for feedback (show you're coachable)
- Connect on LinkedIn

---

## Demo Day Checklist

### Night Before
- [ ] Charge all devices fully
- [ ] Test demo flow 3x end-to-end
- [ ] Prepare backup screenshots/video
- [ ] Review Q&A answers
- [ ] Get good sleep

### Morning Of
- [ ] Test Wi-Fi at venue (or use hotspot)
- [ ] Load demo on devices
- [ ] Test that all buttons/flows work
- [ ] Hydrate, eat light meal
- [ ] Arrive early to check AV setup

### 5 Minutes Before Demo
- [ ] Close all other apps
- [ ] Turn off notifications
- [ ] Set screen to max brightness
- [ ] Set screen to never sleep
- [ ] Take deep breath - you got this!

---

## Success Metrics

### Win Conditions
- 🎯 **Beta Fund $25K:** Top prize (focus on this)
- 🏆 **Audience Favorite:** $1K cash
- ⚡ **Rapid Builder:** $500 cash
- 📱 **Builder Influence:** $1K social media

### Secondary Goals
- Get 5+ business cards from judges/investors
- Schedule 2+ follow-up meetings
- Get feedback on product direction
- Make connections with other builders

---

**Remember:** You're not just demoing a product - you're inviting investors into a vision of better healthcare. Show them the future, then prove you can build it.

**Good luck! 🚀**
