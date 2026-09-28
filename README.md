# Village Panchayat Digital Management System 🏛️

**B.Tech CSE 4th-Year Major Academic Project**  
*A Web-Based Platform for Transparent & Efficient Village Governance, Public Grievances, and Statutory Certificate Issuance.*

---

## 📌 Project Overview
The **Village Panchayat Digital Management System** is an integrated full-stack web application designed for rural local bodies (Gram Panchayats) in India. It digitizes paper-based rural administration, enabling citizens to apply for statutory certificates (Residence, Income, Caste, Birth, Death), lodge civic grievance complaints (Water, Electricity, Roads, Sanitation), track application status, and access government welfare schemes online.

---

## 🔑 Demo Login Credentials

For testing and viva demonstration, use the following pre-seeded accounts:

| Portal Role | Registered Email | Password | Access Rights |
|---|---|---|---|
| **Admin / PDO** | `admin@panchayat.gov.in` | `password123` | Full system control, citizens, staff, schemes, notices & reports |
| **Panchayat Staff** | `staff1@panchayat.gov.in` | `password123` | Process complaints, verify certificate requests & view citizens |
| **Villager / Citizen** | `ramesh@gmail.com` | `password123` | Apply for certificates, submit complaints, view profile & track applications |

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), React Router v6, Axios, Bootstrap 5, Lucide Icons
- **Backend**: Node.js, Express.js REST API
- **Database**: MongoDB & Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & `bcryptjs` password hashing
- **UI Design System**: Clean Indian Government Portal Aesthetic (Navy Blue `#1b365d`, Muted Forest Green `#15803d`, Warning Orange `#d97706`, Slate White Cards & Tables)

---

## 📂 System Architecture & Folder Structure

```text
Village Panchayat Digital Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mongoose database connection
│   ├── controllers/              # REST API Controllers
│   │   ├── authController.js
│   │   ├── citizenController.js
│   │   ├── complaintController.js
│   │   ├── certificateController.js
│   │   ├── schemeController.js
│   │   ├── noticeController.js
│   │   ├── villageController.js
│   │   └── statsController.js
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification & role authorization
│   ├── models/                   # Mongoose Database Schemas
│   │   ├── User.js
│   │   ├── Citizen.js
│   │   ├── Staff.js
│   │   ├── Complaint.js
│   │   ├── CertificateRequest.js
│   │   ├── GovernmentScheme.js
│   │   ├── Notice.js
│   │   └── VillageInformation.js
│   ├── routes/                   # API Endpoints
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seeder.js             # Seed database script
│   ├── .env                      # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server root
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Footer, DashboardSidebar, ProtectedRoute
│   │   ├── context/              # AuthContext (JWT & state)
│   │   ├── pages/                # Home, Dashboards, Complaints, Certificates, etc.
│   │   ├── App.jsx               # React Router configuration
│   │   ├── index.css             # Government Portal CSS
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── PROJECT_DOCUMENTATION.md     # Academic Project Report Document
├── PRESENTATION_AND_VIVA_GUIDE.md # 15-Slide Presentation & Viva Q&A Guide
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start & Installation

### Prerequisites
1. **Node.js** (v18.x or later)
2. **MongoDB** (Local Community Server running on `mongodb://localhost:27017` or Atlas URI)

---

### Step 1: Backend Setup
```bash
cd backend
npm install
node utils/seeder.js     # Seeds MongoDB with sample citizens, complaints, schemes & notices
npm run dev               # Starts Express server on http://localhost:5000
```

### Step 2: Frontend Setup
Open a second terminal:
```bash
cd frontend
npm install
npm run dev               # Starts React dev server on http://localhost:3000
```

Open browser and navigate to: `http://localhost:3000`

---

## 🌐 API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new villager account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `POST` | `/api/auth/forgot-password` | Public | Generate password reset token |
| `GET` | `/api/citizens` | Protected | List citizens with ward filter & search |
| `GET` | `/api/complaints` | Protected | Fetch grievances (Citizen sees own; Admin/Staff sees all) |
| `POST` | `/api/complaints` | Citizen | Lodge new civic complaint |
| `PUT` | `/api/complaints/:id` | Staff/Admin | Update grievance status & response |
| `GET` | `/api/certificates` | Protected | Fetch certificate requests |
| `POST` | `/api/certificates` | Citizen | Apply for Residence/Income/Caste certificate |
| `PUT` | `/api/certificates/:id` | Staff/Admin | Approve/Reject certificate request |
| `GET` | `/api/schemes` | Public | List active welfare schemes |
| `GET` | `/api/notices` | Public | List public announcements |
| `GET` | `/api/stats/dashboard` | Staff/Admin | Fetch dashboard numerical metrics |

---

## 🎓 Academic Viva Questions & Documentation
See [PROJECT_DOCUMENTATION.md](file:///s:/Village%20Panchayat%20Digital%20Management%20System/PROJECT_DOCUMENTATION.md) for the complete B.Tech 4th-Year Major Project Report and [PRESENTATION_AND_VIVA_GUIDE.md](file:///s:/Village%20Panchayat%20Digital%20Management%20System/PRESENTATION_AND_VIVA_GUIDE.md) for the Presentation Outline & Viva Q&A.
