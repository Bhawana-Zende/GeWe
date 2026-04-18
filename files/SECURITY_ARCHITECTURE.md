# Security Architecture
# gewe - Home Health Supply Automation Platform

**Priority:** HIPAA Compliance & Data Security
**Audience:** Investors, Compliance Officers, Technical Teams

---

## Executive Summary

gewe handles Protected Health Information (PHI) and must comply with HIPAA regulations. Our security architecture is built on three pillars:

1. **Encryption Everywhere:** AES-256 at rest, TLS 1.3 in transit
2. **Access Control:** Role-based permissions, MFA, audit logging
3. **Vendor Compliance:** All third-party services are HIPAA-compliant with signed BAAs

**Compliance Status:**
- ✅ HIPAA Security Rule compliance architecture
- ✅ HIPAA Privacy Rule data minimization
- ✅ Business Associate Agreements (BAA) with all vendors
- 🔄 SOC 2 Type II certification (planned post-MVP)

---

## Regulatory Framework

### HIPAA Requirements

**HIPAA Security Rule - Three Safeguards:**

**1. Administrative Safeguards**
- Security Management Process
- Workforce Security (training, access management)
- Information Access Management (RBAC)
- Security Awareness and Training
- Security Incident Procedures
- Contingency Plan (backup, disaster recovery)
- Business Associate Contracts

**2. Physical Safeguards**
- Facility Access Controls (cloud provider responsibility)
- Workstation Use and Security
- Device and Media Controls

**3. Technical Safeguards**
- Access Control (unique user IDs, emergency access)
- Audit Controls (logs of all PHI access)
- Integrity Controls (data tampering protection)
- Transmission Security (encryption in transit)

**HIPAA Privacy Rule:**
- Minimum Necessary Standard (only access needed PHI)
- Individual Rights (patients can request access/correction)
- Notice of Privacy Practices
- Breach Notification (< 60 days)

---

## Data Classification

### PHI (Protected Health Information) - HIPAA Regulated

**What We Store:**
- Patient Name
- Date of Birth
- Home Address (delivery location)
- Medical Diagnoses (from 485)
- Physician Information
- Visit Schedules
- Supply Orders (linked to medical conditions)

**What We DON'T Store:**
- Social Security Numbers
- Financial Information (credit cards, bank accounts)
- Genetic Information
- Full Medical Records (only relevant 485 data)

### Non-PHI Data

**Operational Data (Not HIPAA Regulated):**
- Clinician names and contact info
- Agency business information
- Supplier API credentials
- System logs (anonymized)
- Analytics (aggregated, de-identified)

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Internet (TLS 1.3)                  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              CDN / Load Balancer (Cloudflare)           │
│              ├─ DDoS Protection                         │
│              ├─ WAF (Web Application Firewall)          │
│              └─ Rate Limiting                           │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  gewe Frontend (React)                  │
│                  ├─ SPA (Single Page App)               │
│                  ├─ Session Management                  │
│                  └─ No PHI in Local Storage             │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Butterbase Backend (HIPAA Tier)            │
│  ┌──────────────┬──────────────┬──────────────────────┐ │
│  │ API Gateway  │ Auth Service │ Database (PostgreSQL)│ │
│  │ ├─ JWT Auth  │ ├─ MFA       │ ├─ AES-256 Encrypted │ │
│  │ ├─ Rate      │ ├─ RBAC      │ ├─ Row-Level Security│ │
│  │ └─ Logging   │ └─ Sessions  │ └─ Automated Backups │ │
│  └──────────────┴──────────────┴──────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐│
│  │         File Storage (S3-compatible)                ││
│  │         ├─ Encrypted at Rest (AES-256)             ││
│  │         ├─ Versioning Enabled                      ││
│  │         └─ Access Logging                          ││
│  └─────────────────────────────────────────────────────┘│
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
┌─────────────────┐           ┌──────────────────┐
│  EHR Systems    │           │  Supplier APIs   │
│  (Future)       │           │  (Medline, etc.) │
│  HL7/FHIR       │           │  No PHI Transfer │
│  BAA Required   │           │  Order Data Only │
└─────────────────┘           └──────────────────┘
```

---

## Encryption Standards

### Data at Rest

**Database Encryption:**
- **Method:** AES-256-GCM (Galois/Counter Mode)
- **Key Management:** Butterbase managed keys, rotated quarterly
- **Scope:** All tables containing PHI
- **Column-Level Encryption:** Patient names, DOB, addresses, diagnoses

**File Storage Encryption:**
- **Method:** AES-256 (AWS S3 Server-Side Encryption)
- **Scope:** All uploaded 485 documents, attachments
- **Access Control:** Pre-signed URLs with 5-minute expiration
- **Versioning:** Enabled (allows recovery from accidental deletion)

**Backup Encryption:**
- **Method:** AES-256
- **Frequency:** Daily incremental, weekly full backup
- **Retention:** 7 years (HIPAA requirement)
- **Storage:** Geographically distributed (multi-region)

### Data in Transit

**TLS Configuration:**
```
Protocol: TLS 1.3 (minimum TLS 1.2)
Cipher Suites:
  - TLS_AES_128_GCM_SHA256
  - TLS_AES_256_GCM_SHA384
  - TLS_CHACHA20_POLY1305_SHA256
Certificate: Let's Encrypt (auto-renewed)
HSTS: Enabled (max-age=31536000)
```

**API Security:**
- All API calls over HTTPS only
- No mixed content (no HTTP resources)
- Certificate pinning on mobile apps (future)

**Internal Communication:**
- All service-to-service calls encrypted (within Butterbase VPC)
- No plaintext PHI in logs or error messages

---

## Access Control

### Role-Based Access Control (RBAC)

**User Roles:**

**1. Clinician (Nurse/Therapist)**
- **Permissions:**
  - View assigned patients only
  - Approve supply orders for assigned patients
  - Log carstock usage
  - View tracking information
- **Restrictions:**
  - Cannot see other clinicians' patients
  - Cannot modify 485 documents
  - Cannot access admin functions

**2. Office Manager**
- **Permissions:**
  - View all patients in their agency
  - Approve/reject supply change requests
  - Manage clinician assignments
  - View analytics and reports
- **Restrictions:**
  - Cannot access other agencies' data
  - Cannot modify PHI directly
  - Cannot export raw PHI data

**3. System Administrator**
- **Permissions:**
  - Manage users and roles
  - Configure system settings
  - Access audit logs
- **Restrictions:**
  - NO access to PHI (unless absolutely required for support)
  - All actions logged and reviewed

**4. Support Staff (Future)**
- **Permissions:**
  - Read-only access for troubleshooting
  - Time-limited access (1-hour sessions)
  - Must provide justification for each access
- **Restrictions:**
  - Cannot modify any data
  - Access automatically logged and alerted

### Authentication

**Multi-Factor Authentication (MFA):**
- **Required for:** All users accessing PHI
- **Methods:**
  - SMS OTP (One-Time Password)
  - Authenticator app (TOTP: Google Authenticator, Authy)
  - Biometric (Face ID, Touch ID on mobile)
- **Backup Codes:** Provided during MFA setup

**Session Management:**
- **Session Duration:** 8 hours (workday length)
- **Inactivity Timeout:** 15 minutes
- **Concurrent Sessions:** Limit 2 per user
- **Logout:** Automatic on browser close

**Password Policy:**
- **Minimum Length:** 12 characters
- **Complexity:** Must include uppercase, lowercase, number, special character
- **Expiration:** 90 days
- **History:** Cannot reuse last 5 passwords
- **Lockout:** 5 failed attempts = 30-minute lockout

### Authorization

**Principle of Least Privilege:**
- Users granted minimum access needed for their role
- Temporary elevated access requires approval + audit
- Access reviewed quarterly

**API Authorization:**
```
Authorization: Bearer <JWT_TOKEN>

JWT Claims:
{
  "sub": "user_id_12345",
  "role": "clinician",
  "agency_id": "agency_789",
  "assigned_patients": ["patient_001", "patient_002"],
  "exp": 1678901234
}
```

**Row-Level Security (RLS):**
- Database enforces access control at query level
- Example: `WHERE agency_id = current_user.agency_id`
- Prevents accidental data leakage in application bugs

---

## Audit Logging

### What We Log

**All PHI Access:**
- Who: User ID + Name
- What: Action (view, modify, export)
- When: Timestamp (UTC)
- Where: IP address, device type
- Why: Context (e.g., "Viewed patient detail during visit")

**Log Entry Example:**
```json
{
  "event_id": "evt_a1b2c3",
  "timestamp": "2024-03-15T14:30:00Z",
  "user_id": "usr_12345",
  "user_name": "Sarah Mitchell, RN",
  "user_role": "clinician",
  "action": "VIEW_PATIENT",
  "resource": "patient_001",
  "resource_type": "patient_record",
  "ip_address": "192.168.1.100",
  "device": "iPhone 13, iOS 17.2",
  "result": "success",
  "context": "Viewed patient detail before visit"
}
```

**Security Events:**
- Failed login attempts
- MFA failures
- Permission denials
- Suspicious access patterns (e.g., bulk exports)
- System configuration changes

### Log Management

**Storage:**
- **Retention:** 7 years (HIPAA requirement)
- **Location:** Separate audit log database (immutable)
- **Encryption:** AES-256 at rest
- **Access:** Limited to security team + compliance officer

**Monitoring:**
- **Real-Time Alerts:**
  - Multiple failed logins (potential brute force)
  - Access from new location/device
  - Bulk PHI exports (> 10 patients)
  - Admin role changes
- **Weekly Reviews:** Compliance team reviews access patterns
- **Quarterly Audits:** External auditor reviews logs

**Tamper Protection:**
- Append-only logs (no deletion/modification)
- Cryptographic hashing (detect tampering)
- Replicated to secondary location (backup)

---

## Network Security

### Firewall & WAF

**Cloudflare WAF Rules:**
- Block common attack vectors (SQL injection, XSS)
- Rate limiting: 100 requests/minute per IP
- DDoS protection (automatic mitigation)
- Country-based restrictions (if needed)

**API Rate Limiting:**
- **Unauthenticated:** 10 requests/minute
- **Authenticated:** 100 requests/minute
- **Burst:** Allow 200% for short periods

### DDoS Protection

**Cloudflare Enterprise:**
- Automatic DDoS mitigation
- 100+ Tbps capacity
- Always-on protection

### Intrusion Detection

**Future Implementation (Post-MVP):**
- IDS/IPS monitoring
- Anomaly detection (ML-based)
- Honeypot deployment

---

## Data Breach Response

### Detection

**Automated Alerts for:**
- Unauthorized access attempts
- Large data exports
- Database query anomalies
- Encryption key access

**Manual Monitoring:**
- Weekly security log reviews
- Quarterly penetration testing
- Annual third-party security audit

### Incident Response Plan

**Phase 1: Detection & Containment (0-1 hour)**
1. Automated alert triggered
2. Security team notified
3. Affected systems isolated
4. Access logs frozen (prevent tampering)

**Phase 2: Investigation (1-6 hours)**
1. Determine scope of breach
2. Identify affected patients
3. Root cause analysis
4. Document timeline

**Phase 3: Notification (< 60 days per HIPAA)**
1. Notify affected patients (if PHI compromised)
2. Notify HHS Office for Civil Rights (if > 500 patients)
3. Notify media (if > 500 patients)
4. Notify Business Associates (if their data affected)

**Phase 4: Remediation (Ongoing)**
1. Fix vulnerabilities
2. Improve security controls
3. Update incident response plan
4. Staff training

### Breach Notification Templates

**Patient Notification (Sample):**
```
Subject: Important Security Notice from gewe

Dear [Patient Name],

We are writing to inform you of a data security incident that may 
have affected your personal health information.

What Happened:
On [Date], we discovered that [Brief description of incident].

What Information Was Involved:
The following information may have been accessed: [List PHI types].

What We Are Doing:
We have [Actions taken to investigate and remediate].

What You Can Do:
[Recommendations for patient, if any].

For More Information:
Contact our Privacy Officer at privacy@gewe.com or 1-800-XXX-XXXX.

Sincerely,
gewe Privacy Team
```

---

## Vendor Security & BAAs

### Business Associate Agreements (BAAs)

All vendors handling PHI must sign HIPAA BAA.

**Current Vendors (MVP):**

**Butterbase (Backend Infrastructure):**
- **Status:** ✅ BAA Signed
- **Compliance:** SOC 2 Type II, HIPAA
- **Scope:** Database, auth, file storage
- **Encryption:** AES-256 at rest, TLS 1.3 in transit
- **Backups:** Daily, encrypted, multi-region

**AWS (Underlying Infrastructure for Butterbase):**
- **Status:** ✅ BAA Available
- **Compliance:** HIPAA Eligible Services
- **Services Used:** RDS (PostgreSQL), S3, Lambda
- **Encryption:** All services configured for HIPAA compliance

**Future Vendors:**

**EHR Systems (HL7/FHIR Integration):**
- **Status:** 🔄 Planned
- **Requirement:** Must provide BAA
- **Data Flow:** Bi-directional (485 import, order status export)

**Supplier APIs (Medline, McKesson, etc.):**
- **Status:** 🔄 Planned
- **Requirement:** BAA required (PHI in order context)
- **Data Minimization:** Only send necessary data (no full 485)

**Voice Transcription (AWS Transcribe Medical):**
- **Status:** 🔄 Future
- **Requirement:** BAA required
- **Compliance:** HIPAA-eligible service
- **Data Handling:** Audio deleted after transcription

### Vendor Risk Assessment

**Evaluation Criteria:**
1. HIPAA compliance certification
2. SOC 2 Type II report
3. Incident response plan
4. Encryption standards
5. Data residency (US-based preferred)
6. Subprocessor list (who they use)

**Ongoing Monitoring:**
- Annual SOC 2 report review
- Quarterly security questionnaires
- Incident notification SLA (< 24 hours)

---

## Data Retention & Disposal

### Retention Periods

**PHI Data:**
- **Active Patients:** Retain while under care + 7 years
- **Inactive Patients:** 7 years from last visit (HIPAA minimum)
- **Audit Logs:** 7 years

**Non-PHI Data:**
- **Analytics (Anonymized):** Indefinite
- **System Logs (No PHI):** 1 year

### Secure Deletion

**When PHI Retention Period Expires:**
1. Automated purge process runs monthly
2. Hard delete from database (not soft delete)
3. Overwrite with random data (prevent recovery)
4. Delete all backups containing expired data
5. Log deletion event (who, what, when)

**Media Disposal:**
- Physical drives: Degaussing + physical destruction
- Cloud storage: Crypto-shredding (delete encryption keys)

---

## Employee Security

### Training

**Required Training:**
- HIPAA compliance training (onboarding + annual)
- Security awareness (phishing, social engineering)
- Incident response procedures
- Data handling best practices

**Role-Specific Training:**
- Developers: Secure coding practices
- Support: Limited PHI access protocols
- Management: Compliance oversight

### Access Termination

**Offboarding Process:**
1. Disable all system access immediately
2. Revoke API keys and credentials
3. Wipe company devices
4. Collect physical security tokens
5. Audit all access during employment
6. Retain logs for 7 years

### Non-Disclosure Agreements

- All employees sign HIPAA-specific NDAs
- Contractors sign Business Associate Agreements
- Penalties for unauthorized PHI disclosure

---

## Physical Security (Cloud Provider)

**Butterbase/AWS Data Centers:**
- Physical access controls (biometric, badge)
- 24/7 security monitoring
- Environmental controls (fire suppression, HVAC)
- Redundant power and network
- SOC 1/2/3 compliance

**Client Devices (Clinician Phones/Laptops):**
- No PHI stored locally (all cloud-based)
- Mandatory device encryption (FileVault, BitLocker)
- Remote wipe capability (MDM)
- Lost device protocol (report immediately)

---

## Compliance Testing

### Regular Assessments

**Quarterly:**
- Vulnerability scans (automated)
- Access control review
- Audit log review

**Annually:**
- Penetration testing (third-party)
- HIPAA risk assessment
- Security policy review

**Continuous:**
- Automated security scanning (SAST, DAST)
- Dependency vulnerability scanning
- Infrastructure security scanning

### Documentation

**Required Documentation:**
- Security policies and procedures
- Risk assessment reports
- Incident response logs
- Training completion records
- BAA contracts
- Audit logs (7 years)

---

## Disaster Recovery & Business Continuity

### Backup Strategy

**Database Backups:**
- **Frequency:** Continuous (point-in-time recovery)
- **Full Backups:** Daily at 2 AM UTC
- **Retention:** Daily (30 days), Weekly (1 year), Yearly (7 years)
- **Testing:** Quarterly restore tests

**File Storage Backups:**
- **Method:** Versioning enabled (S3)
- **Retention:** All versions for 7 years
- **Geo-Replication:** 3 regions (US-East, US-West, EU)

### Recovery Objectives

**RTO (Recovery Time Objective):** 4 hours
- Maximum acceptable downtime

**RPO (Recovery Point Objective):** 5 minutes
- Maximum acceptable data loss

### Disaster Scenarios

**Scenario 1: Database Failure**
- **Action:** Failover to standby replica (automatic)
- **RTO:** < 15 minutes

**Scenario 2: Region Outage (AWS US-East)**
- **Action:** DNS failover to US-West region
- **RTO:** < 1 hour

**Scenario 3: Ransomware Attack**
- **Action:** Restore from immutable backups
- **RTO:** < 4 hours

---

## Future Security Enhancements

### Planned (Post-MVP)

**Enhanced Authentication:**
- Hardware security keys (YubiKey)
- Passwordless authentication (WebAuthn)
- Risk-based authentication (unusual location = extra verification)

**Advanced Monitoring:**
- SIEM (Security Information and Event Management)
- ML-based anomaly detection
- Real-time threat intelligence

**Data Protection:**
- Tokenization of PHI (replace with tokens, store separately)
- End-to-end encryption (client-side encryption)
- Zero-knowledge architecture (gewe never sees plaintext PHI)

**Compliance:**
- SOC 2 Type II certification
- HITRUST certification
- FedRAMP (for government contracts)

---

## Security Checklist for MVP Demo

### Pre-Launch
- [ ] All API endpoints require authentication
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Session timeout configured (15 min)
- [ ] Rate limiting enabled
- [ ] Input validation on all forms (prevent XSS, SQL injection)
- [ ] Error messages don't leak sensitive info
- [ ] CORS configured (allow only gewe.com)

### Demo Environment
- [ ] Use mock/synthetic data (no real PHI)
- [ ] Test accounts use strong passwords
- [ ] Demo database isolated from production (when applicable)
- [ ] No API keys in source code (use environment variables)

### Post-Hackathon
- [ ] Security audit before real patient data
- [ ] Penetration testing
- [ ] BAA signed with Butterbase
- [ ] Privacy policy published
- [ ] HIPAA compliance documentation complete

---

## Investor Talking Points

**"How do you ensure HIPAA compliance?"**
> "We've architected gewe with HIPAA compliance as a foundation, not an afterthought. All PHI is encrypted with AES-256 at rest and TLS 1.3 in transit. We use Butterbase, a HIPAA-compliant backend provider with a signed Business Associate Agreement and SOC 2 Type II certification. Our role-based access control ensures clinicians only see their assigned patients, and every PHI access is logged for 7 years. We're ready for SOC 2 certification as we scale."

**"What happens if there's a data breach?"**
> "We have a comprehensive incident response plan. Automated alerts detect suspicious activity immediately. Within 1 hour, we contain the breach and begin investigation. We notify affected patients within the HIPAA-required 60 days, and we've designed our system to minimize blast radius - encrypted data, row-level security, and immutable audit logs ensure we can quickly understand scope and prevent future incidents."

**"How do you handle third-party vendors?"**
> "All vendors handling PHI must sign Business Associate Agreements. We conduct vendor risk assessments annually, require SOC 2 reports, and monitor for security incidents. Our architecture minimizes PHI sharing - for example, supplier APIs only receive order data, not patient medical information."

---

*Security is not a feature - it's the foundation of gewe.*
