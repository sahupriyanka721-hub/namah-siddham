# Namah Siddham Corporation Private Limited
### Enterprise Corporate Website & Multi-Platform Aggregator Management Portal

**CIN**: U77100MP2026PTC087531  
**Entity Type**: Private Limited Company (Incorporated in India)  
**Business Domain**: Multi-platform digital business holding & operating specialized online marketplaces and aggregator networks.

---

## 1. Project Overview & Architecture

This repository contains the complete, production-ready corporate website and administration management portal for **Namah Siddham Corporation Private Limited**. It powers the digital presence and operational administration for the company's portfolio of four core aggregator platforms:

1. **HomeServixo** (`https://homeservixo.in`): Home services and appliance repair marketplace.
2. **Carrento** (`https://carrento.in`): Car rental and on-demand mobility booking platform.
3. **Jainamshree** (`https://jainamshree.online`): Jain community-focused e-commerce marketplace for satvik goods & puja essentials.
4. **SuperiorMart** (`https://superiormart.in`): Multi-category consumer e-commerce marketplace.

### Technology Stack
* **Frontend**: React.js with Vite, Tailwind CSS, React Router v6, Lucide React icons, Axios.
* **Backend**: Node.js, Express.js (ES Modules).
* **Database**: MongoDB Atlas using Mongoose ODM with indexed schemas and validation.
* **Authentication**: JWT authentication with HTTP-only cookie support and Bearer header fallback, bcrypt password hashing.
* **Security**: Helmet, CORS origin whitelisting, Express Rate Limiting on authentication & inquiry submissions, input sanitization.
* **File Uploads**: Multer with MIME-type and size limits (with optional Cloudinary configuration).

---

## 2. Directory Structure

```text
namah-siddham/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── api/                # Axios client, publicApi, adminApi
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, Button, Badge, Skeleton, Modal
│   │   │   ├── public/         # PlatformCard, AggregatorFlow, SeoMeta
│   │   │   └── admin/          # AdminLayout, AdminSidebar, AdminHeader, StatCard
│   │   ├── context/            # AuthContext, SettingsContext
│   │   ├── pages/
│   │   │   ├── public/         # Home, About, Ecosystem, Detail, Model, Partner, Team, News, Careers, Contact, Legal, 404
│   │   │   └── admin/          # Dashboard, Platforms, Pages, Team, News, Careers, Inquiries, Partners, Applications, Legal, Settings, Profile
│   │   ├── App.jsx             # React Router routing
│   │   ├── main.jsx            # Application entry
│   │   └── index.css           # Tailwind CSS directives
│   ├── tailwind.config.js      # Forest green, muted gold & sage design system tokens
│   ├── vite.config.js          # Vite config with API reverse proxy
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # MongoDB connection (db.js) & Env validator (env.js)
│   │   ├── models/             # Mongoose Models (AdminUser, Platform, PageContent, Settings, etc.)
│   │   ├── middleware/         # Auth, ErrorHandler, RateLimiter, Upload
│   │   ├── controllers/        # Business logic controllers
│   │   ├── routes/             # Auth, Public, Admin, Upload routes
│   │   ├── scripts/            # Database seed script (seed.js)
│   │   ├── utils/              # Reference ID generator, CSV export helpers
│   │   └── server.js           # Server bootstrap
│   ├── uploads/                # Local uploaded assets (images, documents)
│   └── package.json
│
├── .env.example                # Root environment template
├── README.md                   # This documentation
└── package.json                # Root package for running client + server concurrently
```

---

## 3. Environment Variables Configuration

Copy `.env.example` to `server/.env` and update with your credentials:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/namah_siddham?retryWrites=true&w=majority

# Security & Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key_namah_siddham_2026_change_in_production
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_secret_key_secure

# Allowed Client Origin (for CORS)
CLIENT_URL=http://localhost:5173

# Initial Superadmin Credentials (used during 'npm run seed')
INITIAL_ADMIN_EMAIL=admin@namahsiddham.com
INITIAL_ADMIN_PASSWORD=AdminSecure2026#Namah
INITIAL_ADMIN_NAME="Namah Siddham Chief Administrator"

# Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
```

For client (`client/.env`):
```bash
VITE_API_URL=/api
```

---

## 4. Local Installation & Development

### Step 1: Install Dependencies
From the repository root directory:
```bash
# Install root, client, and server dependencies
npm run install:all
```
Or manually:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### Step 2: Seed the Database
Ensure your MongoDB server or MongoDB Atlas cluster is reachable, then run the seed script:
```bash
cd server
npm run seed
```
This idempotent script provisions:
* The initial administrator account: `admin@namahsiddham.com` / `AdminSecure2026#Namah`
* Initial corporate settings (CIN: `U77100MP2026PTC087531`, registered office, emails, phone)
* The four ecosystem platforms: `HomeServixo`, `Carrento`, `Jainamshree`, `SuperiorMart`
* Default CMS copy for Home, About Us, Business Model, Partner, and Contact
* Legal compliance drafts for Privacy Policy, Terms of Use, Cookie Policy, Grievance Officer, and Disclaimer.

### Step 3: Run the Application
Run both backend API and frontend Vite dev server concurrently:
```bash
# From repository root:
npm run dev
```

Or run in separate terminal tabs:
* **Server**: `cd server && npm run dev` (Runs at `http://localhost:5000`)
* **Client**: `cd client && npm run dev` (Runs at `http://localhost:5173`)

---

## 5. Portal Access & Routes

### Public Pages
* **Home Page**: `http://localhost:5173/`
* **About Us**: `http://localhost:5173/about`
* **Our Ecosystem**: `http://localhost:5173/ecosystem`
* **Dynamic Product Details**:
  * `http://localhost:5173/ecosystem/homeservixo`
  * `http://localhost:5173/ecosystem/carrento`
  * `http://localhost:5173/ecosystem/jainamshree`
  * `http://localhost:5173/ecosystem/superiormart`
* **Business Model**: `http://localhost:5173/business-model`
* **Partner With Us**: `http://localhost:5173/partners`
* **Leadership & Team**: `http://localhost:5173/team`
* **News & Announcements**: `http://localhost:5173/news`
* **Careers**: `http://localhost:5173/careers`
* **Contact Us**: `http://localhost:5173/contact`
* **Legal Compliance**:
  * Privacy Policy: `/privacy-policy`
  * Terms of Use: `/terms-of-use`
  * Cookie Policy: `/cookie-policy`
  * Grievance Officer: `/grievance`
  * Disclaimer: `/disclaimer`

### Administrative Management Portal
* **Login Screen**: `http://localhost:5173/admin/login`
  * Default Email: `admin@namahsiddham.com`
  * Default Password: `AdminSecure2026#Namah`
* **Dashboard Overview**: `/admin/dashboard`
* **Platforms CRUD**: `/admin/platforms`
* **Page Content CMS**: `/admin/pages`
* **Leadership Management**: `/admin/team`
* **News & Announcements**: `/admin/news`
* **Job Openings**: `/admin/careers`
* **Contact Inquiries**: `/admin/inquiries` (with CSV export)
* **Partner Inquiries**: `/admin/partner-inquiries` (7 categories, status workflows & CSV export)
* **Recruitment Applications**: `/admin/applications` (CV viewing & evaluation)
* **Legal Policy CMS**: `/admin/legal`
* **Company Settings**: `/admin/settings` (CIN, address, email, phone, social, logo)
* **Admin Profile & Password**: `/admin/profile`

---

## 6. Security Features Implemented

1. **Authentication & Password Security**:
   * Admin passwords securely hashed using `bcryptjs` with salt factor 10.
   * Authentication secrets and MongoDB connection strings never exposed to frontend bundles.
   * HTTP-only cookie configuration with `SameSite: lax` and `secure: true` in production.
   * Authorization token verification on every administrative API endpoint.
2. **Brute-Force & Spam Prevention**:
   * `express-rate-limit` enforces strict limits on `/api/auth/login` (10 attempts per 15 min per IP).
   * Rate limiting on public inquiry forms (15 requests per 10 min) to mitigate spam and bot submissions.
3. **CORS & Headers**:
   * `helmet` configured with cross-origin resource policy.
   * Strict domain whitelist for incoming cross-origin requests.
4. **Data Isolation**:
   * Public APIs return only published, non-sensitive items (`select('-internalNotes')`).
   * Internal notes and candidate resumes are restricted to authenticated administrators.

---

## 7. Production Deployment Instructions

### A. Deploy Frontend on Vercel
1. Push the project repository to GitHub / GitLab.
2. Log into [Vercel](https://vercel.com) and import the repository.
3. Set the **Root Directory** to `client`.
4. Configure Build Command: `npm run build` and Output Directory: `dist`.
5. Set Environment Variable:
   * `VITE_API_URL`: `https://your-backend-api.onrender.com/api` (URL of your deployed backend).
6. Click **Deploy**.

### B. Deploy Backend on Render / Railway / DigitalOcean
1. In [Render](https://render.com), create a new **Web Service** pointing to the repository.
2. Set the **Root Directory** to `server`.
3. Set Build Command: `npm install`.
4. Set Start Command: `node src/server.js`.
5. Configure Environment Variables in the service settings:
   * `NODE_ENV`: `production`
   * `PORT`: `5000` (or leave default assigned by platform)
   * `MONGODB_URI`: Your MongoDB Atlas production connection string
   * `JWT_SECRET`: A secure 64-character random string
   * `COOKIE_SECRET`: A secure random string
   * `CLIENT_URL`: `https://your-frontend.vercel.app` (your frontend domain)
   * `INITIAL_ADMIN_EMAIL`: Your initial corporate email
   * `INITIAL_ADMIN_PASSWORD`: A secure initial password
6. Run the initial seed script via the platform shell or one-off job:
   ```bash
   node src/scripts/seed.js
   ```

### C. Database Backup & Recovery Guidance
* **Automated Atlas Backups**: Enable Continuous Cloud Backups in MongoDB Atlas with point-in-time recovery.
* **Manual Snapshot**:
  ```bash
  mongodump --uri="<MONGODB_URI>" --out=./backups/$(date +%Y-%m-%d)
  ```
* **Restore**:
  ```bash
  mongorestore --uri="<MONGODB_URI>" ./backups/<backup-folder>
  ```

---

## 8. Statutory Corporate Compliance Note

* **Entity**: Namah Siddham Corporation Private Limited
* **CIN**: U77100MP2026PTC087531
* **Jurisdiction**: Ministry of Corporate Affairs, Registrar of Companies, Madhya Pradesh, India.
* **Intellectual Property**: HomeServixo, Carrento, Jainamshree, and SuperiorMart are operating portfolio platform brands of Namah Siddham Corporation Private Limited.
