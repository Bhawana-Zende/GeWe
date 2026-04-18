// mockData.js - Complete demo data for gewe MVP
// Drop this into: src/data/mockData.js

// ===================================================================
// PATIENTS - Dashboard List View
// ===================================================================

export const mockPatients = [
  {
    id: "pat_001",
    name: "Sarah Martinez",
    age: 58,
    diagnosis: "Diabetic wound care",
    supplyStatus: "ordered",
    nextVisit: "2024-03-20",
    statusBadge: {
      color: "green",
      icon: "🟢",
      text: "Ordered - Arrives Tue"
    }
  },
  {
    id: "pat_002",
    name: "Robert Chen",
    age: 64,
    diagnosis: "CHF monitoring",
    supplyStatus: "pending_signature",
    nextVisit: "2024-03-22",
    statusBadge: {
      color: "yellow",
      icon: "🟡",
      text: "Pending Signature"
    }
  },
  {
    id: "pat_003",
    name: "Mary Johnson",
    age: 71,
    diagnosis: "Post-surgical recovery",
    supplyStatus: "ready_to_order",
    nextVisit: "2024-03-25",
    statusBadge: {
      color: "blue",
      icon: "🔵",
      text: "Ready to Order"
    }
  },
  {
    id: "pat_004",
    name: "John Doe",
    age: 78,
    diagnosis: "Post-surgical wound care",
    supplyStatus: "delivered",
    nextVisit: "2024-03-18",
    statusBadge: {
      color: "green",
      icon: "✅",
      text: "Delivered"
    }
  }
];

// ===================================================================
// PATIENT DETAILS - Full patient information with 485 and orders
// ===================================================================

export const mockPatientDetails = {
  "pat_001": {
    id: "pat_001",
    name: "Sarah Martinez",
    date_of_birth: "1966-03-15",
    age: 58,
    address: {
      street: "123 Oak Street, Apt 2B",
      city: "San Jose",
      state: "CA",
      zip: "95110"
    },
    primary_diagnosis: "Diabetic wound care",
    medical_summary: "Type 2 diabetes with foot ulcer requiring daily dressing changes and monitoring. Patient compliant with insulin regimen.",
    assigned_clinician_id: "usr_12345",
    next_visit_date: "2024-03-20",
    status: "active",
    supply_status: "ordered",
    cms_485: {
      id: "cms_001",
      patient_id: "pat_001",
      physician: {
        name: "Dr. Jennifer Smith",
        npi: "1234567890",
        signature_date: "2024-03-14",
        signed: true
      },
      certification_period: {
        start_date: "2024-03-15",
        end_date: "2024-05-14"
      },
      diagnoses: [
        "E11.621 - Type 2 diabetes mellitus with foot ulcer",
        "I10 - Essential hypertension"
      ],
      supplies: [
        {
          id: "sup_001",
          name: "Sterile Gauze Pads (4x4\")",
          quantity: 50,
          unit: "pads",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_002",
          name: "Saline Solution",
          quantity: 4,
          unit: "bottles",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_003",
          name: "Medical Tape (1\" x 10 yards)",
          quantity: 2,
          unit: "rolls",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_004",
          name: "Wound Vac Supplies",
          quantity: 1,
          unit: "kit",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_005",
          name: "Antibiotic Ointment",
          quantity: 2,
          unit: "tubes",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_006",
          name: "Nitrile Gloves (Large)",
          quantity: 100,
          unit: "gloves",
          category: "wound_care",
          approved: true
        }
      ]
    },
    supply_order: {
      id: "ord_001",
      patient_id: "pat_001",
      status: "ordered",
      supplier: {
        name: "Medline",
        order_number: "ML-2847593",
        tracking_number: "1Z999AA10123456784",
        carrier: "FedEx"
      },
      estimated_delivery: "2024-03-18",
      actual_delivery: null,
      ordered_at: "2024-03-15T09:20:00Z"
    }
  },
  
  "pat_002": {
    id: "pat_002",
    name: "Robert Chen",
    date_of_birth: "1959-07-22",
    age: 64,
    address: {
      street: "456 Maple Avenue",
      city: "San Jose",
      state: "CA",
      zip: "95112"
    },
    primary_diagnosis: "CHF monitoring",
    medical_summary: "Congestive heart failure requiring daily vitals monitoring and medication management. Recent hospital discharge.",
    assigned_clinician_id: "usr_12345",
    next_visit_date: "2024-03-22",
    status: "active",
    supply_status: "pending_signature",
    cms_485: {
      id: "cms_002",
      patient_id: "pat_002",
      physician: {
        name: "Dr. Michael Wong",
        npi: "9876543210",
        signature_date: null,
        signed: false
      },
      certification_period: {
        start_date: "2024-03-22",
        end_date: "2024-05-21"
      },
      diagnoses: [
        "I50.9 - Heart failure, unspecified",
        "E78.5 - Hyperlipidemia, unspecified"
      ],
      supplies: [
        {
          id: "sup_007",
          name: "Blood Pressure Cuff (Adult)",
          quantity: 1,
          unit: "unit",
          category: "respiratory",
          approved: true
        },
        {
          id: "sup_008",
          name: "Pulse Oximeter",
          quantity: 1,
          unit: "unit",
          category: "respiratory",
          approved: true
        },
        {
          id: "sup_009",
          name: "Digital Thermometer",
          quantity: 1,
          unit: "unit",
          category: "other",
          approved: true
        },
        {
          id: "sup_010",
          name: "Medication Organizer (7-day)",
          quantity: 1,
          unit: "unit",
          category: "other",
          approved: true
        }
      ]
    },
    supply_order: null
  },
  
  "pat_003": {
    id: "pat_003",
    name: "Mary Johnson",
    date_of_birth: "1952-11-08",
    age: 71,
    address: {
      street: "789 Pine Street, Unit 5",
      city: "San Jose",
      state: "CA",
      zip: "95125"
    },
    primary_diagnosis: "Post-surgical recovery",
    medical_summary: "Post-surgical hip replacement requiring physical therapy assistance and wound monitoring. Good mobility progress.",
    assigned_clinician_id: "usr_12345",
    next_visit_date: "2024-03-25",
    status: "active",
    supply_status: "ready_to_order",
    cms_485: {
      id: "cms_003",
      patient_id: "pat_003",
      physician: {
        name: "Dr. Lisa Anderson",
        npi: "5551234567",
        signature_date: "2024-03-15",
        signed: true
      },
      certification_period: {
        start_date: "2024-03-16",
        end_date: "2024-05-15"
      },
      diagnoses: [
        "M16.11 - Unilateral primary osteoarthritis, right hip",
        "Z96.641 - Presence of right artificial hip joint"
      ],
      supplies: [
        {
          id: "sup_011",
          name: "Surgical Dressing Kits",
          quantity: 10,
          unit: "kits",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_012",
          name: "Compression Bandages (3\")",
          quantity: 6,
          unit: "rolls",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_013",
          name: "Saline Solution",
          quantity: 2,
          unit: "bottles",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_014",
          name: "Walker with Seat",
          quantity: 1,
          unit: "unit",
          category: "mobility",
          approved: true
        },
        {
          id: "sup_015",
          name: "Nitrile Gloves (Medium)",
          quantity: 50,
          unit: "gloves",
          category: "wound_care",
          approved: true
        }
      ]
    },
    supply_order: null
  },
  
  "pat_004": {
    id: "pat_004",
    name: "John Doe",
    date_of_birth: "1945-05-12",
    age: 78,
    address: {
      street: "321 Elm Drive",
      city: "San Jose",
      state: "CA",
      zip: "95118"
    },
    primary_diagnosis: "Post-surgical wound care",
    medical_summary: "Post-surgical abdominal wound care following colectomy. Healing well, no complications.",
    assigned_clinician_id: "usr_12345",
    next_visit_date: "2024-03-18",
    status: "active",
    supply_status: "delivered",
    cms_485: {
      id: "cms_004",
      patient_id: "pat_004",
      physician: {
        name: "Dr. Robert Kim",
        npi: "7778889999",
        signature_date: "2024-03-08",
        signed: true
      },
      certification_period: {
        start_date: "2024-03-10",
        end_date: "2024-05-09"
      },
      diagnoses: [
        "K50.90 - Crohn's disease, unspecified",
        "Z98.890 - Other specified postprocedural states"
      ],
      supplies: [
        {
          id: "sup_016",
          name: "Abdominal Wound Dressings",
          quantity: 20,
          unit: "dressings",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_017",
          name: "Saline Solution",
          quantity: 3,
          unit: "bottles",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_018",
          name: "Medical Tape (2\" x 10 yards)",
          quantity: 3,
          unit: "rolls",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_019",
          name: "Sterile Gauze Pads (2x2\")",
          quantity: 100,
          unit: "pads",
          category: "wound_care",
          approved: true
        },
        {
          id: "sup_020",
          name: "Nitrile Gloves (Large)",
          quantity: 100,
          unit: "gloves",
          category: "wound_care",
          approved: true
        }
      ]
    },
    supply_order: {
      id: "ord_002",
      patient_id: "pat_004",
      status: "delivered",
      supplier: {
        name: "Medline",
        order_number: "ML-2745891",
        tracking_number: "1Z999AA10987654321",
        carrier: "FedEx"
      },
      estimated_delivery: "2024-03-15",
      actual_delivery: "2024-03-15T14:34:00Z",
      ordered_at: "2024-03-09T11:15:00Z"
    }
  }
};

// ===================================================================
// TRACKING TIMELINE - For order tracking visualization
// ===================================================================

export const mockTrackingTimeline = {
  "ord_001": {
    order_id: "ord_001",
    steps: [
      {
        id: "confirmed",
        label: "Order Confirmed",
        icon: "📋",
        completed: true,
        timestamp: "2024-03-15T09:20:00Z",
        location: null
      },
      {
        id: "shipped",
        label: "Order Shipped",
        icon: "📦",
        completed: true,
        timestamp: "2024-03-15T15:00:00Z",
        location: "San Francisco, CA"
      },
      {
        id: "out_for_delivery",
        label: "Out for Delivery",
        icon: "🚚",
        completed: true,
        timestamp: "2024-03-18T08:00:00Z",
        location: "San Jose, CA"
      },
      {
        id: "delivered",
        label: "Order Delivered",
        icon: "🏠",
        completed: false,
        timestamp: null,
        location: null,
        estimated: "2024-03-18T17:00:00Z"
      }
    ],
    tracking_events: [
      {
        timestamp: "2024-03-15T10:00:00Z",
        location: "San Francisco, CA",
        description: "Package received by carrier"
      },
      {
        timestamp: "2024-03-15T18:30:00Z",
        location: "Oakland, CA",
        description: "In transit to next facility"
      },
      {
        timestamp: "2024-03-16T06:00:00Z",
        location: "San Jose Distribution Center",
        description: "Arrived at local facility"
      },
      {
        timestamp: "2024-03-18T08:00:00Z",
        location: "San Jose, CA",
        description: "Out for delivery - Scheduled by end of day"
      }
    ]
  }
};

// ===================================================================
// CARSTOCK - Clinician's trunk inventory
// ===================================================================

export const mockCarstock = [
  {
    id: "car_001",
    clinician_id: "usr_12345",
    supply: {
      id: "sup_001",
      name: "Sterile Gauze Pads (4x4\")",
      unit: "pads"
    },
    quantity_on_hand: 45,
    minimum_threshold: 20,
    last_restocked: "2024-03-10T08:00:00Z",
    low_stock: false
  },
  {
    id: "car_002",
    clinician_id: "usr_12345",
    supply: {
      id: "sup_002",
      name: "Saline Solution",
      unit: "bottles"
    },
    quantity_on_hand: 12,
    minimum_threshold: 5,
    last_restocked: "2024-03-10T08:00:00Z",
    low_stock: false
  },
  {
    id: "car_003",
    clinician_id: "usr_12345",
    supply: {
      id: "sup_003",
      name: "Medical Tape (1\" x 10 yards)",
      unit: "rolls"
    },
    quantity_on_hand: 8,
    minimum_threshold: 3,
    last_restocked: "2024-03-10T08:00:00Z",
    low_stock: false
  },
  {
    id: "car_004",
    clinician_id: "usr_12345",
    supply: {
      id: "sup_006",
      name: "Nitrile Gloves (Large)",
      unit: "gloves"
    },
    quantity_on_hand: 180,
    minimum_threshold: 50,
    last_restocked: "2024-03-10T08:00:00Z",
    low_stock: false
  }
];

// ===================================================================
// VOICE LOG EXAMPLE - For voice logging demo
// ===================================================================

export const mockVoiceLog = {
  id: "vlog_001",
  patient_id: "pat_001",
  clinician_id: "usr_12345",
  transcript: "I used 5 gauze pads, 2 saline bottles, and 1 roll of medical tape for patient Sarah Martinez during today's wound care visit.",
  parsed_items: [
    {
      supply_id: "sup_001",
      supply_name: "Sterile Gauze Pads (4x4\")",
      quantity_used: 5
    },
    {
      supply_id: "sup_002",
      supply_name: "Saline Solution",
      quantity_used: 2
    },
    {
      supply_id: "sup_003",
      supply_name: "Medical Tape (1\" x 10 yards)",
      quantity_used: 1
    }
  ],
  recorded_at: "2024-03-15T17:00:00Z",
  processed: true
};

// ===================================================================
// CURRENT USER - Logged-in clinician
// ===================================================================

export const mockCurrentUser = {
  id: "usr_12345",
  name: "Sarah Mitchell",
  role: "clinician",
  title: "Registered Nurse (RN)",
  email: "sarah.mitchell@agency.com",
  phone: "408-555-1234",
  agency_id: "agency_001",
  assigned_patients: ["pat_001", "pat_002", "pat_003", "pat_004"]
};

// ===================================================================
// HELPER FUNCTIONS - For easy data access
// ===================================================================

// Get patient detail by ID
export const getPatientDetail = (patientId) => {
  return mockPatientDetails[patientId] || null;
};

// Get tracking timeline by order ID
export const getTrackingTimeline = (orderId) => {
  return mockTrackingTimeline[orderId] || null;
};

// Simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate creating a supply order
export const createMockSupplyOrder = async (patientId) => {
  await delay(500); // Simulate API call
  
  const newOrderId = `ord_${Date.now()}`;
  const trackingNumber = `1Z999AA1${Math.floor(Math.random() * 900000000) + 100000000}`;
  
  return {
    id: newOrderId,
    patient_id: patientId,
    status: "ordered",
    supplier: {
      name: "Medline",
      order_number: `ML-${Math.floor(Math.random() * 9000000) + 1000000}`,
      tracking_number: trackingNumber,
      carrier: "FedEx"
    },
    estimated_delivery: "2024-03-18",
    actual_delivery: null,
    ordered_at: new Date().toISOString()
  };
};

// Get all patients for dashboard
export const getAllPatients = async () => {
  await delay(300); // Simulate API call
  return {
    patients: mockPatients,
    total: mockPatients.length
  };
};

// Get patient detail with all nested data
export const getPatientWithDetails = async (patientId) => {
  await delay(300); // Simulate API call
  return getPatientDetail(patientId);
};
