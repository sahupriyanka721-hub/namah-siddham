# Namah Siddham Corporation Private Limited
### Production Corporate Website & Administration Management Portal

**CIN**: `U77100MP2026PTC087531`  
**Company Location**: Bhopal, Madhya Pradesh, India  
**Entity Category**: Private Limited Company (Incorporated in India)  
**Business Verticals**:
1. **IT Services and Digital Solutions**
2. **Digital Products, Marketplaces and Aggregator Platforms**

---

## 1. Project Overview & Architecture

This repository contains the complete, production-grade corporate website and secure administration management portal for **Namah Siddham Corporation Private Limited**.

The platform is engineered around two distinct business growth verticals:
* **Vertical 1 — IT Services and Digital Solutions**:
  - Website Development (corporate websites, web applications, landing pages)
  - Custom Software Development (ERP, CRM, admin dashboards, tailored workflow systems)
  - Mobile Application Development (Android and iOS customer & partner applications)
  - Digital Marketing (SEO, visibility campaigns, digital strategy, lead generation)
  - Portfolio & Case Studies showcase (Client projects, Internal products, and Demonstration projects)
* **Vertical 2 — Digital Products, Marketplaces and Aggregator Platforms**:
  - **HomeServixo** (`https://homeservixo.in`): Home Services & Appliance Repair
  - **Carrento** (`https://carrento.in`): Mobility & Car Rental Platform
  - **Jainamshree** (`https://jainamshree.online`): Jain Community-focused E-commerce Marketplace
  - **SuperiorMart** (`https://superiormart.in`): Multi-category Consumer E-commerce Marketplace
  - Dynamic status controls (`Live`, `Under Development`, `Coming Soon`, `Hidden`) ensuring transparent, non-misleading communications.

---

## 2. Brand Identity & Design Tokens

Strictly derived from the primary corporate identity:
* **Royal Blue (`#0756B8`)**: Primary action, headers, main branding
* **Dark Navy (`#202B3C`)**: Solid typography, primary card headers, navigation bar
* **Golden Yellow (`#FFBE00`)**: Subtle highlights, icons, selected accents
* **Growth Orange (`#F28C00`)**: Sparingly applied for platform growth tags and accents
* **Light Gray Surface (`#F5F7FB`)**: Main crisp, professional background
* **Pure White (`#FFFFFF`)**: Card surfaces, containers, data tables

### Corporate Logo Assets
* Original vector logo: `/assets/namah-siddham-logo.svg`
* White vector emblem: `/assets/logo-white.svg`
* Vector favicon: `/favicon.svg`
* Drop-in PNG asset support: `/assets/namah-siddham-logo.png`

---

## 3. Technology Stack

* **Frontend**: React.js (Vite), Tailwind CSS, React Router v6, Lucide React icons, Axios.
* **Backend**: Node.js, Express.js (ES Modules).
* **Database**: MongoDB Atlas with Mongoose ODM (indexed schemas, validation, audit timestamps).
* **Authentication**: Server-side JWT authentication, HTTP-only cookie support, Bearer token authorization, bcrypt password hashing.
* **Security & Performance**: Helmet, CORS origin controls, Express Rate Limiting, input sanitization, centralized error handling.
* **Storage**: Multer file uploads with configurable Cloudinary/local storage support.

---

## 4. Directory Structure

```text
namah-siddham/
├── client/                     # React + Vite Frontend
│   ├── public/
│   │   ├── assets/             # Brand logos (namah-siddham-logo.svg, logo-white.svg)
│   │   ├── favicon.svg         # Corporate browser favicon
│   │   ├── robots.txt          # SEO crawler rules
│   │   └── sitemap.xml         # XML sitemap
│   ├── src/
│   │   ├── api/                # publicApi.js, adminApi.js, client.js
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, Button, Badge, Modal, Skeleton
│   │   │   ├── public/         # PlatformCard, SeoMeta
│   │   │   └── admin/          # AdminLayout, AdminSidebar, AdminHeader, StatCard
│   │   ├── context/            # AuthContext, SettingsContext
│   │   ├── pages/
│   │   │   ├── public/         # HomePage, AboutPage, ServicesPage, ServiceDetailPage,
│   │   │   │                   # EcosystemPage (Products), ProductDetailPage,
│   │   │   │                   # PortfolioPage, PortfolioDetailPage, BusinessModelPage,
│   │   │   │                   # PartnerPage, TeamPage, NewsPage, NewsDetailPage,
│   │   │   │                   # CareersPage, ContactPage, LegalPage, NotFoundPage
│   │   │   └── admin/          # AdminLogin, AdminDashboard, AdminServices, AdminPlatforms,
│   │   │                       # AdminPortfolio, AdminPages, AdminTeam, AdminNews,
│   │   │                       # AdminCareers, AdminInquiries, AdminPartnerInquiries,
│   │   │                       # AdminApplications, AdminLegal, AdminSettings, AdminProfile
│   │   ├── App.jsx             # All public and admin route declarations
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind typography & utilities
│   ├── tailwind.config.js      # Royal Blue, Navy & Gold corporate palette
│   ├── vite.config.js          # Vite reverse-proxy configuration
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # MongoDB Atlas connection (db.js) & Env validator (env.js)
│   │   ├── models/             # Service, Platform, PortfolioProject, CompanySettings,
│   │   │                       # AdminUser, PageContent, TeamMember, NewsArticle,
│   │   │                       # JobOpening, ContactInquiry, PartnerInquiry, JobApplication
│   │   ├── controllers/        # serviceController, platformController, portfolioController,
│   │   │                       # adminController, publicController, inquiryController, etc.
│   │   ├── middleware/         # auth, errorHandler, rateLimiter, upload
│   │   ├── routes/             # publicRoutes, adminRoutes, authRoutes, uploadRoutes
│   │   ├── scripts/            # Database seed script (seed.js)
│   │   └── server.js           # Server application entry
│   ├── uploads/                # File storage for uploads
│   ├── .env                    # Active environment configuration
│   ├── .env.example            # Environment configuration template
│   └── package.json
│
├── package.json                # Root concurrently script
└── README.md                   # This documentation
```

---

## 5. Getting Started & Installation

### Prerequisites
* Node.js (v18.0 or newer)
* npm (v9.0 or newer)
* MongoDB Atlas cluster or local MongoDB instance

### Step 1: Clone and Install Dependencies

```bash
# Navigate to the workspace
cd namah-siddham

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/namah_siddham?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_namah_siddham_2026_change_in_production
JWT_EXPIRES_IN=7d
COOKIE_SECRET=cookie_secret_namah_siddham_key_secure
CLIENT_URL=http://localhost:5173
INITIAL_ADMIN_EMAIL=admin@namahsiddham.com
INITIAL_ADMIN_PASSWORD=AdminSecure2026#Namah
INITIAL_ADMIN_NAME="Chief Administrator"
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
```

### Step 3: Seed the Database

Run the database seeder to initialize the superadmin credentials, Bhopal MP corporate settings, 4 IT services, 4 digital products, 4 portfolio case studies, CMS pages, and legal policies:

```bash
cd server
npm run seed
```

### Default Administrative Credentials
* **Login URL**: `http://localhost:5173/admin/login`
* **Email Identifier**: `admin@namahsiddham.com`
* **Password**: `AdminSecure2026#Namah`

---

## 6. Running the Application

### Option A: Run Both Frontend & Backend Concurrently (from root)

```bash
npm run dev
```

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000/api`
* **System Health Check**: `http://localhost:5000/api/health`

### Option B: Run Services Separately

**In Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```

**In Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```

---

## 7. Public Website Routes

| Route | Page | Description |
|---|---|---|
| `/` | `HomePage` | Full corporate homepage (Sections A through K) |
| `/about` | `AboutPage` | Company background, Bhopal MP office, 2 verticals, CIN |
| `/services` | `ServicesPage` | Overview of IT Services and Digital Solutions |
| `/services/:slug` | `ServiceDetailPage` | Dedicated service view (Web Dev, Software, Mobile Apps, Marketing) with inquiry form |
| `/products` | `EcosystemPage` | Digital products & aggregator platforms catalog |
| `/products/:slug` | `ProductDetailPage` | Granular platform view with availability status & partner modal |
| `/portfolio` | `PortfolioPage` | Filterable case studies (Client Projects, Internal, Demos) |
| `/portfolio/:slug` | `PortfolioDetailPage` | Comprehensive architectural case study breakdown |
| `/business-model` | `BusinessModelPage` | 5-step operational visual flow & payment structure disclosure |
| `/partners` | `PartnerPage` | 6 partnership categories & functional registration form |
| `/team` | `TeamPage` | Leadership and technical advisory team |
| `/news` | `NewsPage` | Corporate announcements & platform update feed |
| `/news/:slug` | `NewsDetailPage` | Article details & release notes |
| `/careers` | `CareersPage` | Job openings & direct CV application form |
| `/contact` | `ContactPage` | Project brief submission form & Bhopal MP office info |
| `/privacy-policy` | `LegalPage` | Indian DPDP Act compliant privacy policy |
| `/terms-of-use` | `LegalPage` | Platform terms of use & disclaimer |
| `/cookie-policy` | `LegalPage` | Cookie policy and tracking disclosure |
| `/grievance` | `LegalPage` | Grievance redressal officer details (Bhopal, MP) |
| `/disclaimer` | `LegalPage` | Operational & commercial liability disclaimers |

---

## 8. Protected Admin Workspace Routes (`/admin/*`)

| Admin Route | Component | Capabilities |
|---|---|---|
| `/admin/login` | `AdminLogin` | Authenticated session sign-in with show/hide password toggle |
| `/admin/dashboard` | `AdminDashboard` | Real-time database metrics (8 counts) & recent inquiries |
| `/admin/services` | `AdminServices` | Full CRUD for IT Services, features, process & FAQs |
| `/admin/portfolio` | `AdminPortfolio` | Full CRUD for Portfolio projects, case studies & demo labels |
| `/admin/platforms` | `AdminPlatforms` | CRUD for Digital Platforms with status (`Live`, `Under Development`, `Coming Soon`, `Hidden`) |
| `/admin/pages` | `AdminPages` | CMS for About, Business Model, Vision & Mission |
| `/admin/team` | `AdminTeam` | Add, update, reorder corporate leadership |
| `/admin/news` | `AdminNews` | Publish corporate announcements & platform releases |
| `/admin/careers` | `AdminCareers` | Manage job postings & application criteria |
| `/admin/inquiries` | `AdminInquiries` | Manage contact/project inquiries, notes, CSV export |
| `/admin/partner-inquiries` | `AdminPartnerInquiries` | Manage platform partnership requests, notes, CSV export |
| `/admin/applications` | `AdminApplications` | Review job candidate submissions & applicant resumes |
| `/admin/legal` | `AdminLegal` | Update compliance policies & grievance details |
| `/admin/settings` | `AdminSettings` | Configure registered office, CIN, emails, CTA copy |
| `/admin/profile` | `AdminProfile` | Change password and manage authenticated session |

---

## 9. Production Build & Deployment

### Build Client for Production:
```bash
cd client
npm run build
```
The optimized static bundle will be generated in `client/dist/`.

### Production Server Startup:
```bash
cd server
NODE_ENV=production npm start
```

---

## 10. Compliance & Governance Verification

- **CIN**: `U77100MP2026PTC087531` prominently displayed across footer, hero banner, legal disclosures, and contact sections.
- **Location**: Registered Office in Bhopal, Madhya Pradesh, India.
- **No Fictitious Claims**: Platforms under development (`HomeServixo`, `Carrento`, `Jainamshree`, `SuperiorMart`) are labeled accurately with `Under Development` badges and partner onboarding invites.
- **Two Distinct Verticals**: Explicitly and cleanly separates client IT services from internal consumer aggregators.
