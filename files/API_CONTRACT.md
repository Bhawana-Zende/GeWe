# API Contract
# gewe - Backend/Frontend Interface Specification

**Purpose:** Define the data models and API endpoints that connect the React frontend to the Butterbase backend.

**Owners:** 
- **Backend:** CTO Liu (implementation)
- **Frontend:** Lue (consumption)

---

## Base URL

**Development:** `http://localhost:3000/api`
**Demo:** `https://gewe-demo.butterbase.ai/api`

---

## Authentication

### Headers

All authenticated requests must include:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### JWT Token Structure

```json
{
  "sub": "usr_12345",
  "role": "clinician",
  "agency_id": "agency_001",
  "assigned_patients": ["pat_001", "pat_002", "pat_003", "pat_004"],
  "exp": 1710864000
}
```

---

## Data Models

### Patient

```typescript
interface Patient {
  id: string;                    // Unique identifier (e.g., "pat_001")
  name: string;                  // Full name (e.g., "Sarah Martinez")
  date_of_birth: string;         // ISO 8601 date (e.g., "1966-03-15")
  age: number;                   // Calculated age
  address: {
    street: string;              // "123 Oak Street, Apt 2B"
    city: string;                // "San Jose"
    state: string;               // "CA"
    zip: string;                 // "95110"
  };
  primary_diagnosis: string;     // "Diabetic wound care"
  medical_summary: string;       // Brief 1-sentence context
  assigned_clinician_id: string; // ID of assigned nurse
  next_visit_date: string;       // ISO 8601 date (e.g., "2024-03-20")
  status: PatientStatus;         // Overall patient status
  supply_status: SupplyStatus;   // Current supply order status
  created_at: string;            // ISO 8601 timestamp
  updated_at: string;            // ISO 8601 timestamp
}

enum PatientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DISCHARGED = "discharged"
}

enum SupplyStatus {
  PENDING_SIGNATURE = "pending_signature",   // Doctor hasn't signed yet
  READY_TO_ORDER = "ready_to_order",         // Signed, waiting for clinician approval
  ORDERED = "ordered",                        // Order placed, in transit
  DELIVERED = "delivered",                    // Supplies delivered
  DELAYED = "delayed"                         // Shipping delay
}
```

### CMS-485 Document

```typescript
interface CMS485 {
  id: string;                          // Unique identifier
  patient_id: string;                  // Reference to patient
  physician: {
    name: string;                      // "Dr. Jennifer Smith"
    npi: string;                       // National Provider Identifier
    signature_date: string | null;     // ISO 8601 date (null if unsigned)
    signed: boolean;                   // true/false
  };
  certification_period: {
    start_date: string;                // ISO 8601 date
    end_date: string;                  // ISO 8601 date (60 days from start)
  };
  diagnoses: string[];                 // Array of ICD-10 codes or descriptions
  supplies: Supply[];                  // Approved supply list
  created_at: string;
  updated_at: string;
}
```

### Supply

```typescript
interface Supply {
  id: string;                    // Unique identifier
  name: string;                  // "Sterile Gauze Pads (4x4\")"
  quantity: number;              // 50
  unit: string;                  // "pads", "bottles", "rolls", "kits"
  category: SupplyCategory;      // Classification
  approved: boolean;             // Approved by physician
}

enum SupplyCategory {
  WOUND_CARE = "wound_care",
  DIABETIC = "diabetic",
  CATHETER = "catheter",
  RESPIRATORY = "respiratory",
  MOBILITY = "mobility",
  OTHER = "other"
}
```

### Supply Order

```typescript
interface SupplyOrder {
  id: string;                         // Unique order ID
  patient_id: string;                 // Reference to patient
  cms_485_id: string;                 // Reference to 485 document
  supplies: Supply[];                 // Ordered items
  delivery_address: Address;          // Where to deliver
  status: SupplyStatus;               // Current order status
  supplier: {
    name: string;                     // "Medline"
    order_number: string;             // "ML-2847593"
    tracking_number: string | null;   // "1Z999AA10123456784" (null if not shipped)
    carrier: string | null;           // "FedEx", "UPS", etc.
  };
  estimated_delivery: string;         // ISO 8601 date
  actual_delivery: string | null;     // ISO 8601 date (null if not delivered)
  ordered_by: string;                 // Clinician user ID
  ordered_at: string;                 // ISO 8601 timestamp
  updated_at: string;
}
```

### Carstock Item

```typescript
interface CarstockItem {
  id: string;
  clinician_id: string;               // Which clinician owns this carstock
  supply: Supply;                     // Reference to supply definition
  quantity_on_hand: number;           // Current inventory
  minimum_threshold: number;          // Alert when below this
  last_restocked: string;             // ISO 8601 timestamp
  updated_at: string;
}
```

### Voice Log Entry

```typescript
interface VoiceLogEntry {
  id: string;
  patient_id: string;
  clinician_id: string;
  transcript: string;                 // "I used 5 gauze pads, 2 saline bottles..."
  parsed_items: {
    supply_id: string;
    quantity_used: number;
  }[];
  recorded_at: string;                // ISO 8601 timestamp
  processed: boolean;                 // Has this been applied to carstock?
}
```

---

## API Endpoints

### Authentication

#### POST `/auth/login`

**Request:**
```json
{
  "email": "sarah.mitchell@agency.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_12345",
    "name": "Sarah Mitchell",
    "role": "clinician",
    "agency_id": "agency_001"
  },
  "expires_in": 28800
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Invalid credentials
- `429 Too Many Requests` - Rate limit exceeded

---

### Patients

#### GET `/patients`

Get list of patients assigned to the authenticated clinician.

**Query Parameters:**
- `status` (optional): Filter by patient status (`active`, `inactive`, `discharged`)
- `supply_status` (optional): Filter by supply status

**Response:**
```json
{
  "patients": [
    {
      "id": "pat_001",
      "name": "Sarah Martinez",
      "date_of_birth": "1966-03-15",
      "age": 58,
      "address": {
        "street": "123 Oak Street, Apt 2B",
        "city": "San Jose",
        "state": "CA",
        "zip": "95110"
      },
      "primary_diagnosis": "Diabetic wound care",
      "medical_summary": "Diabetic wound care requiring daily dressing changes and monitoring.",
      "assigned_clinician_id": "usr_12345",
      "next_visit_date": "2024-03-20",
      "status": "active",
      "supply_status": "ordered",
      "created_at": "2024-03-01T10:00:00Z",
      "updated_at": "2024-03-15T14:30:00Z"
    }
    // ... more patients
  ],
  "total": 4
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized to view these patients

---

#### GET `/patients/:id`

Get detailed information about a specific patient.

**Response:**
```json
{
  "patient": {
    "id": "pat_001",
    "name": "Sarah Martinez",
    "date_of_birth": "1966-03-15",
    "age": 58,
    "address": {
      "street": "123 Oak Street, Apt 2B",
      "city": "San Jose",
      "state": "CA",
      "zip": "95110"
    },
    "primary_diagnosis": "Diabetic wound care",
    "medical_summary": "Diabetic wound care requiring daily dressing changes and monitoring.",
    "assigned_clinician_id": "usr_12345",
    "next_visit_date": "2024-03-20",
    "status": "active",
    "supply_status": "ordered",
    "created_at": "2024-03-01T10:00:00Z",
    "updated_at": "2024-03-15T14:30:00Z"
  },
  "cms_485": {
    "id": "cms_001",
    "patient_id": "pat_001",
    "physician": {
      "name": "Dr. Jennifer Smith",
      "npi": "1234567890",
      "signature_date": "2024-03-14",
      "signed": true
    },
    "certification_period": {
      "start_date": "2024-03-15",
      "end_date": "2024-05-14"
    },
    "diagnoses": ["Type 2 Diabetes with foot ulcer", "Hypertension"],
    "supplies": [
      {
        "id": "sup_001",
        "name": "Sterile Gauze Pads (4x4\")",
        "quantity": 50,
        "unit": "pads",
        "category": "wound_care",
        "approved": true
      },
      {
        "id": "sup_002",
        "name": "Saline Solution",
        "quantity": 4,
        "unit": "bottles",
        "category": "wound_care",
        "approved": true
      }
      // ... more supplies
    ],
    "created_at": "2024-03-10T08:00:00Z",
    "updated_at": "2024-03-14T16:45:00Z"
  },
  "supply_order": {
    "id": "ord_001",
    "patient_id": "pat_001",
    "cms_485_id": "cms_001",
    "supplies": [
      // Same as cms_485.supplies
    ],
    "delivery_address": {
      "street": "123 Oak Street, Apt 2B",
      "city": "San Jose",
      "state": "CA",
      "zip": "95110"
    },
    "status": "ordered",
    "supplier": {
      "name": "Medline",
      "order_number": "ML-2847593",
      "tracking_number": "1Z999AA10123456784",
      "carrier": "FedEx"
    },
    "estimated_delivery": "2024-03-18",
    "actual_delivery": null,
    "ordered_by": "usr_12345",
    "ordered_at": "2024-03-15T09:20:00Z",
    "updated_at": "2024-03-15T09:20:00Z"
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Patient doesn't exist
- `403 Forbidden` - Not authorized to view this patient

---

### Supply Orders

#### POST `/supply-orders`

Create a new supply order (clinician approves supplies).

**Request:**
```json
{
  "patient_id": "pat_001",
  "cms_485_id": "cms_001",
  "delivery_address": {
    "street": "123 Oak Street, Apt 2B",
    "city": "San Jose",
    "state": "CA",
    "zip": "95110"
  }
}
```

**Response:**
```json
{
  "order": {
    "id": "ord_001",
    "patient_id": "pat_001",
    "cms_485_id": "cms_001",
    "supplies": [
      // Array of supplies from CMS-485
    ],
    "delivery_address": {
      "street": "123 Oak Street, Apt 2B",
      "city": "San Jose",
      "state": "CA",
      "zip": "95110"
    },
    "status": "ordered",
    "supplier": {
      "name": "Medline",
      "order_number": "ML-2847593",
      "tracking_number": null,
      "carrier": null
    },
    "estimated_delivery": "2024-03-18",
    "actual_delivery": null,
    "ordered_by": "usr_12345",
    "ordered_at": "2024-03-15T14:30:00Z",
    "updated_at": "2024-03-15T14:30:00Z"
  }
}
```

**Status Codes:**
- `201 Created` - Order created successfully
- `400 Bad Request` - Invalid request (e.g., doctor hasn't signed)
- `403 Forbidden` - Not authorized to order for this patient
- `409 Conflict` - Order already exists for this patient

**Validation Rules:**
- Doctor must have signed CMS-485
- Patient must be in "ready_to_order" status
- Delivery address must be valid

---

#### GET `/supply-orders/:id/tracking`

Get tracking information for a supply order.

**Response:**
```json
{
  "order_id": "ord_001",
  "status": "in_transit",
  "carrier": "FedEx",
  "tracking_number": "1Z999AA10123456784",
  "tracking_url": "https://www.fedex.com/tracking?tracknumbers=1Z999AA10123456784",
  "estimated_delivery": "2024-03-18",
  "tracking_events": [
    {
      "timestamp": "2024-03-15T10:00:00Z",
      "location": "San Francisco, CA",
      "description": "Package received by carrier"
    },
    {
      "timestamp": "2024-03-15T18:30:00Z",
      "location": "Oakland, CA",
      "description": "In transit to next facility"
    },
    {
      "timestamp": "2024-03-16T06:00:00Z",
      "location": "San Jose, CA",
      "description": "Out for delivery"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Order doesn't exist
- `403 Forbidden` - Not authorized to view this order

---

### Carstock Management

#### GET `/carstock`

Get clinician's current carstock inventory.

**Response:**
```json
{
  "carstock": [
    {
      "id": "car_001",
      "clinician_id": "usr_12345",
      "supply": {
        "id": "sup_001",
        "name": "Sterile Gauze Pads (4x4\")",
        "quantity": 1,
        "unit": "pads",
        "category": "wound_care",
        "approved": true
      },
      "quantity_on_hand": 45,
      "minimum_threshold": 20,
      "last_restocked": "2024-03-10T08:00:00Z",
      "updated_at": "2024-03-15T16:00:00Z"
    },
    {
      "id": "car_002",
      "clinician_id": "usr_12345",
      "supply": {
        "id": "sup_002",
        "name": "Saline Solution",
        "quantity": 1,
        "unit": "bottles",
        "category": "wound_care",
        "approved": true
      },
      "quantity_on_hand": 12,
      "minimum_threshold": 5,
      "last_restocked": "2024-03-10T08:00:00Z",
      "updated_at": "2024-03-15T16:00:00Z"
    }
  ],
  "low_stock_alerts": [
    {
      "supply_id": "sup_003",
      "supply_name": "Medical Tape",
      "quantity_on_hand": 3,
      "minimum_threshold": 5,
      "alert_message": "Medical Tape running low (3 remaining)"
    }
  ]
}
```

---

#### POST `/carstock/log-usage`

Log carstock usage after a patient visit (voice or manual).

**Request:**
```json
{
  "patient_id": "pat_001",
  "items_used": [
    {
      "supply_id": "sup_001",
      "quantity_used": 5
    },
    {
      "supply_id": "sup_002",
      "quantity_used": 2
    }
  ],
  "notes": "Post-visit carstock usage for wound care"
}
```

**Response:**
```json
{
  "message": "Carstock updated successfully",
  "updated_items": [
    {
      "supply_id": "sup_001",
      "supply_name": "Sterile Gauze Pads",
      "previous_quantity": 45,
      "new_quantity": 40,
      "low_stock": true
    },
    {
      "supply_id": "sup_002",
      "supply_name": "Saline Solution",
      "previous_quantity": 12,
      "new_quantity": 10,
      "low_stock": false
    }
  ]
}
```

---

### Voice Logging (Future/Prototype)

#### POST `/voice-logs`

Submit a voice log entry (simulated for demo).

**Request:**
```json
{
  "patient_id": "pat_001",
  "transcript": "I used 5 gauze pads, 2 saline bottles, and 1 roll of medical tape for patient Sarah Martinez"
}
```

**Response:**
```json
{
  "voice_log": {
    "id": "vlog_001",
    "patient_id": "pat_001",
    "clinician_id": "usr_12345",
    "transcript": "I used 5 gauze pads, 2 saline bottles, and 1 roll of medical tape for patient Sarah Martinez",
    "parsed_items": [
      {
        "supply_id": "sup_001",
        "quantity_used": 5
      },
      {
        "supply_id": "sup_002",
        "quantity_used": 2
      },
      {
        "supply_id": "sup_003",
        "quantity_used": 1
      }
    ],
    "recorded_at": "2024-03-15T17:00:00Z",
    "processed": true
  },
  "carstock_updated": true
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` - Invalid request data
- `AUTHENTICATION_REQUIRED` - Missing or invalid token
- `PERMISSION_DENIED` - Not authorized for this action
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `CONFLICT` - Resource already exists or conflicts
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Mock Data Strategy

For the hackathon demo, use these approaches:

### Static Mock Data (Fastest)
- Hardcode patient data in frontend
- Simulate API delays with `setTimeout()`
- No backend needed for initial demo

### Mock API Server (Better Demo)
- Use JSON Server or Mock Service Worker
- Realistic HTTP responses
- Can simulate loading states

### Real Butterbase (Production-Ready)
- Actually implement with Butterbase
- Can continue building after hackathon
- More impressive to judges

**Recommended for Hackathon:** Start with static mock data (Phase 1), upgrade to Mock API if time permits (Phase 2).

---

## Frontend State Management

### React State Structure

```typescript
// Global app state (Context or Redux)
interface AppState {
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  patients: {
    list: Patient[];
    current: Patient | null;
    loading: boolean;
    error: string | null;
  };
  supplyOrders: {
    current: SupplyOrder | null;
    loading: boolean;
    error: string | null;
  };
  carstock: {
    items: CarstockItem[];
    lowStockAlerts: Alert[];
    loading: boolean;
  };
}
```

### API Call Pattern

```typescript
// Example: Fetch patients
const fetchPatients = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/patients', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    
    const data = await response.json();
    setPatients(data.patients);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Implementation Checklist

### Backend (CTO Liu)
- [ ] Set up Butterbase project
- [ ] Define database schema (patients, cms_485, supply_orders, carstock)
- [ ] Implement authentication endpoints
- [ ] Implement patient endpoints (GET list, GET detail)
- [ ] Implement supply order endpoint (POST create)
- [ ] Implement carstock endpoints (GET, POST log-usage)
- [ ] Add mock tracking data
- [ ] Test all endpoints with Postman/curl

### Frontend (Lue)
- [ ] Create API service layer (fetch wrappers)
- [ ] Set up React Context for state management
- [ ] Implement patient list fetching
- [ ] Implement patient detail fetching
- [ ] Implement supply order creation
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Test with mock data first, then integrate with backend

---

## Testing Scenarios

### Happy Path
1. Login → Success → Get patients → Display list
2. Click patient → Get detail → Display 485 and supplies
3. Click "Approve & Order" → POST order → Success → Update UI

### Error Handling
1. Login with wrong password → 401 → Show error message
2. Approve supplies without doctor signature → 400 → Show validation error
3. Network error → Timeout → Show "Please try again" message

---

## Demo Day Coordination

**Division of Labor:**

**CTO Liu (Backend Focus):**
- Ensure all API endpoints return correct data
- Handle demo environment setup
- Be ready to debug backend issues during demo

**Lue (Frontend Focus):**
- Ensure UI displays data correctly
- Handle user interactions (buttons, navigation)
- Present the demo and explain user flow

**Pre-Demo Checklist:**
- [ ] Test full user flow together (login → patients → approve → tracking)
- [ ] Prepare fallback if API fails (static data in frontend)
- [ ] Have backend logs ready for quick debugging
- [ ] Test on actual mobile device (not just browser)

---

*This contract ensures Lue and CTO Liu can work independently while maintaining compatibility.*
