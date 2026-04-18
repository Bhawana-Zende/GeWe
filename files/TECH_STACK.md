# Technical Stack & Implementation Guide
# gewe - Development Setup for CTO Liu

**Target:** Functional MVP demo in 3 hours
**Priority:** Core workflow working reliably

---

## Technology Stack

### Frontend
- **Framework:** React 18.2+
- **Styling:** Tailwind CSS 3.3+
- **Routing:** React Router 6+
- **State Management:** React Context API (or Zustand for simplicity)
- **Build Tool:** Vite (fast dev server, instant HMR)
- **HTTP Client:** fetch API (native, no dependencies)

### Backend
- **Platform:** Butterbase (HIPAA-compliant, rapid setup)
- **Database:** PostgreSQL (via Butterbase)
- **Authentication:** JWT (via Butterbase auth service)
- **File Storage:** S3-compatible (via Butterbase)
- **API:** REST (JSON)

### Development Tools
- **Version Control:** Git + GitHub
- **Code Editor:** VS Code
- **API Testing:** Bruno or Postman
- **Deployment:** Butterbase auto-deploy

---

## Quick Start (30 minutes setup)

### Step 1: Frontend Setup (15 min)

```bash
# Create React app with Vite
npm create vite@latest gewe-frontend -- --template react
cd gewe-frontend

# Install dependencies
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind (tailwind.config.js)
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#86868B',
        success: '#34C759',
        warning: '#FFCC00',
        error: '#FF3B30',
      }
    },
  },
  plugins: [],
}

# Start dev server
npm run dev
```

**Directory Structure:**
```
gewe-frontend/
├── src/
│   ├── components/
│   │   ├── PatientCard.jsx
│   │   ├── PatientDetail.jsx
│   │   ├── SupplyApproval.jsx
│   │   └── StatusBadge.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── PatientView.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

---

### Step 2: Butterbase Setup (15 min)

**Option A: Quick Mock (No Backend - Recommended for Speed)**

```javascript
// src/services/api.js
import { mockPatients, mockPatientDetail } from '../data/mockData';

export const api = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  async getPatients() {
    await this.delay(300);
    return { patients: mockPatients, total: mockPatients.length };
  },
  
  async getPatientDetail(id) {
    await this.delay(300);
    return mockPatientDetail[id];
  },
  
  async createSupplyOrder(patientId, cms485Id, address) {
    await this.delay(500);
    return {
      id: `ord_${Date.now()}`,
      patient_id: patientId,
      status: 'ordered',
      supplier: {
        name: 'Medline',
        order_number: `ML-${Math.floor(Math.random() * 9000000) + 1000000}`,
        tracking_number: '1Z999AA10123456784',
        carrier: 'FedEx'
      },
      estimated_delivery: '2024-03-18',
      ordered_at: new Date().toISOString()
    };
  }
};
```

**Option B: Real Butterbase (If Time Permits)**

1. Sign up at https://dashboard.butterbase.ai
2. Create new project: "gewe"
3. Use promo code from hackathon (if available)
4. Follow setup guide: https://butterbase.ai/docs/quickstart

```javascript
// src/services/api.js
const BUTTERBASE_URL = process.env.VITE_BUTTERBASE_URL;
const API_KEY = process.env.VITE_BUTTERBASE_API_KEY;

export const api = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${BUTTERBASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getPatients() {
    return this.request('/patients');
  },
  
  async getPatientDetail(id) {
    return this.request(`/patients/${id}`);
  },
  
  async createSupplyOrder(data) {
    return this.request('/supply-orders', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
```

---

## Core Components Implementation

### 1. Dashboard Component

```jsx
// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadPatients();
  }, []);
  
  const loadPatients = async () => {
    try {
      const data = await api.getPatients();
      setPatients(data.patients);
    } catch (error) {
      console.error('Failed to load patients:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="p-8">Loading patients...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Patients</h1>
        
        <div className="space-y-4">
          {patients.map(patient => (
            <Link 
              key={patient.id} 
              to={`/patients/${patient.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-1">
                      {patient.name}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {patient.diagnosis}
                    </p>
                    <p className="text-sm text-gray-500">
                      Next Visit: {new Date(patient.nextVisit).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={patient.supplyStatus} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### 2. Patient Detail Component

```jsx
// src/pages/PatientView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import SupplyApproval from '../components/SupplyApproval';

export default function PatientView() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadPatient();
  }, [id]);
  
  const loadPatient = async () => {
    try {
      const data = await api.getPatientDetail(id);
      setPatient(data);
    } catch (error) {
      console.error('Failed to load patient:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="p-8">Loading...</div>;
  if (!patient) return <div className="p-8">Patient not found</div>;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Patient Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h1 className="text-3xl font-bold mb-4">{patient.name}</h1>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <p className="text-gray-600">Age: {patient.age}</p>
              <p className="text-gray-600">DOB: {patient.date_of_birth}</p>
            </div>
            <div>
              <p className="text-gray-600">{patient.address.street}</p>
              <p className="text-gray-600">
                {patient.address.city}, {patient.address.state} {patient.address.zip}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{patient.medical_summary}</p>
          </div>
        </div>
        
        {/* Supply List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-semibold mb-4">Approved Supplies</h2>
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-2 text-sm text-gray-600">Item</th>
                <th className="pb-2 text-sm text-gray-600">Quantity</th>
                <th className="pb-2 text-sm text-gray-600">Unit</th>
              </tr>
            </thead>
            <tbody>
              {patient.cms_485.supplies.map(supply => (
                <tr key={supply.id} className="border-b last:border-0">
                  <td className="py-3 text-lg">{supply.name}</td>
                  <td className="py-3 text-lg">{supply.quantity}</td>
                  <td className="py-3 text-lg text-gray-600">{supply.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Approval Section */}
        <SupplyApproval 
          patient={patient}
          onApprove={() => loadPatient()}
        />
      </div>
    </div>
  );
}
```

---

### 3. Supply Approval Component

```jsx
// src/components/SupplyApproval.jsx
import { useState } from 'react';
import { api } from '../services/api';

export default function SupplyApproval({ patient, onApprove }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const canApprove = patient.cms_485.physician.signed && 
                     patient.supply_status === 'ready_to_order';
  
  const handleApprove = async () => {
    setLoading(true);
    try {
      await api.createSupplyOrder(
        patient.id,
        patient.cms_485.id,
        patient.address
      );
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        onApprove();
      }, 2000);
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!canApprove) {
    return (
      <div className="bg-yellow-50 rounded-2xl p-6 text-center">
        <p className="text-lg text-gray-700">
          {patient.cms_485.physician.signed 
            ? 'Supplies already ordered' 
            : 'Waiting for physician signature'}
        </p>
      </div>
    );
  }
  
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-blue-500 text-white text-xl font-semibold py-4 rounded-2xl hover:bg-blue-600 transition-colors"
      >
        Approve & Order Supplies
      </button>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            {success ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
                <p className="text-gray-600">
                  Tracking information will be available shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Confirm Supply Order</h2>
                <div className="space-y-3 mb-6">
                  <p><strong>Patient:</strong> {patient.name}</p>
                  <p><strong>Delivery:</strong> {patient.address.street}</p>
                  <p><strong>Items:</strong> {patient.cms_485.supplies.length} supply types</p>
                  <p><strong>Estimated Delivery:</strong> Tuesday, March 18</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Confirm Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

---

### 4. Status Badge Component

```jsx
// src/components/StatusBadge.jsx
const statusConfig = {
  pending_signature: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🟡',
    text: 'Pending Signature'
  },
  ready_to_order: {
    color: 'bg-blue-100 text-blue-800',
    icon: '🔵',
    text: 'Ready to Order'
  },
  ordered: {
    color: 'bg-green-100 text-green-800',
    icon: '🟢',
    text: 'Ordered - Arrives Tue'
  },
  delivered: {
    color: 'bg-green-100 text-green-800',
    icon: '✅',
    text: 'Delivered'
  }
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status];
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </div>
  );
}
```

---

## Mock Data File

```javascript
// src/data/mockData.js
export const mockPatients = [
  {
    id: "pat_001",
    name: "Sarah Martinez",
    age: 58,
    diagnosis: "Diabetic wound care",
    supplyStatus: "ordered",
    nextVisit: "2024-03-20"
  },
  // ... see SYNTHETIC_DATA.md for full data
];

export const mockPatientDetail = {
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
    medical_summary: "Diabetic wound care requiring daily dressing changes and monitoring.",
    supply_status: "ordered",
    cms_485: {
      id: "cms_001",
      physician: {
        name: "Dr. Jennifer Smith",
        signature_date: "2024-03-14",
        signed: true
      },
      supplies: [
        {
          id: "sup_001",
          name: "Sterile Gauze Pads (4x4\")",
          quantity: 50,
          unit: "pads"
        },
        // ... more supplies
      ]
    }
  },
  // ... more patients
};
```

---

## Routing Setup

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientView from './pages/PatientView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients/:id" element={<PatientView />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Testing Checklist

### Pre-Demo Testing (15 minutes before)

```bash
# 1. Test development build
npm run dev
# Open http://localhost:5173

# 2. Test production build
npm run build
npm run preview

# 3. Test on mobile device
# Use local network IP (e.g., http://192.168.1.100:5173)

# 4. Test all workflows
# - Dashboard loads
# - Click each patient card
# - Approve supplies workflow
# - Modal interactions
# - Back navigation
```

### Critical Test Scenarios

1. **Dashboard Load**
   - [ ] All 4 patients display
   - [ ] Status badges show correct colors
   - [ ] Cards are tappable

2. **Patient Detail**
   - [ ] Patient info displays correctly
   - [ ] Supply list shows all items
   - [ ] Doctor signature status visible

3. **Supply Approval**
   - [ ] Button enabled only when doctor signed
   - [ ] Modal opens smoothly
   - [ ] Confirmation flow works
   - [ ] Success message shows
   - [ ] Returns to dashboard

4. **Mobile Responsiveness**
   - [ ] Text is large enough (16px minimum)
   - [ ] Touch targets are 48px+
   - [ ] No horizontal scrolling
   - [ ] Works in portrait and landscape

---

## Deployment Options

### Option 1: Local Demo (Simplest)
```bash
npm run dev
# Demo directly from laptop/phone on local network
```

### Option 2: Butterbase Deploy (If Using Butterbase)
```bash
# Follow Butterbase deployment guide
butterbase deploy
```

### Option 3: Vercel/Netlify (Fast Static Deploy)
```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy
```

---

## Troubleshooting

### Issue: Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind styles not working
```bash
# Ensure tailwind.config.js content paths are correct
# Restart dev server
```

### Issue: API calls failing
```bash
# Check CORS settings
# Verify API endpoint URLs
# Check network tab in browser DevTools
```

### Issue: Modal not appearing
```bash
# Check z-index in CSS
# Verify state management
```

---

## Performance Optimization

### For Demo Day
- Pre-load all images
- Minimize API calls (use static data)
- Disable animations if laggy
- Test on actual demo device

### For Production
- Code splitting with React.lazy
- Image optimization
- API response caching
- Service worker for offline

---

## Security Considerations (Production)

### Environment Variables
```bash
# .env.local (never commit)
VITE_BUTTERBASE_URL=https://api.butterbase.ai
VITE_BUTTERBASE_API_KEY=your_api_key_here
```

### API Security
- Always use HTTPS
- Implement rate limiting
- Validate all inputs
- Never expose API keys in frontend code

---

## Team Coordination

### Git Workflow
```bash
# Lue: Design/Frontend
git checkout -b feature/ui-components

# Liu: Backend/Integration
git checkout -b feature/butterbase-integration

# Merge before demo
git checkout main
git merge feature/ui-components
git merge feature/butterbase-integration
```

### Communication
- Use Slack/Discord for quick questions
- Share screen for debugging
- Test together before demo

---

## Timeline Breakdown

### Hour 1 (2:00-3:00 PM)
- [ ] Setup Vite + React project (10 min)
- [ ] Install dependencies, configure Tailwind (10 min)
- [ ] Create mock data file (10 min)
- [ ] Build Dashboard component (20 min)
- [ ] Test dashboard rendering (10 min)

### Hour 2 (3:00-4:00 PM)
- [ ] Build PatientView component (20 min)
- [ ] Build SupplyApproval component (20 min)
- [ ] Implement routing (10 min)
- [ ] Test full user flow (10 min)

### Hour 3 (4:00-4:30 PM)
- [ ] Voice logging prototype (10 min)
- [ ] UI polish and animations (10 min)
- [ ] Mobile testing (5 min)
- [ ] Final testing (5 min)

### Buffer (4:30-5:00 PM)
- Bug fixes
- Demo rehearsal
- Backup preparation

---

## Resources

### Documentation
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- Butterbase: https://butterbase.ai/docs

### Tools
- VS Code: https://code.visualstudio.com
- React DevTools: Browser extension
- Postman: https://www.postman.com

---

**Ready to build! 🚀**
