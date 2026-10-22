import mongoose from 'mongoose';
import dns from 'dns';
import { ENV } from '../config/env.js';

// Resolve DNS SRV query issues on Windows & ISP networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore
}
import AdminUser from '../models/AdminUser.js';
import Platform from '../models/Platform.js';
import CompanySettings from '../models/CompanySettings.js';
import PageContent from '../models/PageContent.js';
import LeadershipMember from '../models/LeadershipMember.js';
import NewsArticle from '../models/NewsArticle.js';
import JobOpening from '../models/JobOpening.js';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('[Seed] Connected.');

    // 1. Seed or Update Initial Superadmin
    console.log('[Seed] Provisioning initial administrator...');
    let existingAdmin = await AdminUser.findOne({ email: ENV.INITIAL_ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      existingAdmin = new AdminUser({
        name: ENV.INITIAL_ADMIN_NAME,
        email: ENV.INITIAL_ADMIN_EMAIL.toLowerCase(),
        password: ENV.INITIAL_ADMIN_PASSWORD,
        role: 'superadmin',
        isActive: true,
      });
      await existingAdmin.save();
      console.log(`[Seed] Superadmin created: ${ENV.INITIAL_ADMIN_EMAIL}`);
    } else {
      existingAdmin.password = ENV.INITIAL_ADMIN_PASSWORD;
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log(`[Seed] Administrator password synced/updated: ${ENV.INITIAL_ADMIN_EMAIL}`);
    }

    // 2. Seed Company Settings
    console.log('[Seed] Configuring company settings...');
    let settings = await CompanySettings.findOne();
    if (!settings) {
      settings = await CompanySettings.create({
        companyName: 'Namah Siddham Corporation Private Limited',
        companyType: 'Private Limited Company',
        cin: 'U77100MP2026PTC087531',
        businessPositioning:
          'A multi-platform digital business company building and operating specialized online marketplaces and aggregator platforms.',
        officialEmail: 'contact@namahsiddham.com',
        grievanceEmail: 'grievance@namahsiddham.com',
        officialPhone: '+91 731 0000000',
        registeredOffice: {
          addressLine1: 'Corporate Tower, Main Road',
          city: 'Indore',
          state: 'Madhya Pradesh',
          country: 'India',
          pincode: '452001',
          fullAddress: 'Registered Office: Indore, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
        },
        socialLinks: {
          linkedin: 'https://linkedin.com/company/namahsiddham',
          twitter: 'https://twitter.com/namahsiddham',
          facebook: 'https://facebook.com/namahsiddham',
          instagram: 'https://instagram.com/namahsiddham',
        },
        footerContent: {
          aboutText:
            'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
          copyrightText: '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.',
        },
        seoDefaults: {
          metaTitle: 'Namah Siddham Corporation Private Limited — Multi-Platform Digital Aggregator',
          metaDescription:
            'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
        },
      });
      console.log('[Seed] Company settings initialized.');
    } else {
      console.log('[Seed] Company settings already exist.');
    }

    // 3. Seed Initial 4 Platforms (HomeServixo, Carrento, Jainamshree, SuperiorMart)
    console.log('[Seed] Seeding initial 4 ecosystem platforms...');
    const initialPlatforms = [
      {
        name: 'HomeServixo',
        slug: 'homeservixo',
        category: 'Home Services',
        websiteUrl: 'https://homeservixo.in',
        shortDescription: 'Home services and appliance repair marketplace',
        detailedDescription:
          'HomeServixo is a specialized home services and appliance repair platform connecting homeowners and businesses with vetted local technicians and service providers. From routine appliance maintenance to urgent electrical, plumbing, and HVAC repairs, HomeServixo streamlines discovery, upfront transparent estimates, booking, and quality-assured service fulfillment.',
        keyFeatures: [
          'Vetted & Background-Checked Service Professionals',
          'Transparent Upfront Pricing & Estimates',
          'On-Demand Doorstep Appliance Repair',
          'Dedicated Customer Support & Service Warranty',
        ],
        targetAudience: 'Homeowners, apartment residents, property managers, and commercial office operators.',
        useCases: [
          'Air conditioner servicing and gas charging',
          'Refrigerator, microwave, and washing machine repair',
          'Emergency plumbing and leak rectification',
          'Residential and commercial electrical diagnostics',
        ],
        howItWorks: [
          'Customer selects needed home service or repair requirement',
          'Platform matches request with nearby qualified service partner',
          'Technician visits doorstep at scheduled slot for inspection and repair',
          'Transparent billing and service fulfillment confirmation',
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 1,
        seoTitle: 'HomeServixo — Trusted Home Services & Appliance Repair Marketplace',
        seoDescription:
          'Book verified technicians for appliance repair, plumbing, electrical, and home maintenance services with HomeServixo.',
      },
      {
        name: 'Carrento',
        slug: 'carrento',
        category: 'Mobility & Car Rental',
        websiteUrl: 'https://carrento.in',
        shortDescription: 'Car rental and mobility booking platform',
        detailedDescription:
          'Carrento is a modern mobility aggregator and vehicle booking platform designed to provide flexible, dependable, and convenient transportation solutions. By aggregating vetted fleet owners, independent vehicle hosts, and commercial mobility operators, Carrento offers seamless self-drive options, chauffeur-driven rentals, and long-term corporate mobility packages.',
        keyFeatures: [
          'Extensive Fleet: Hatchbacks, Sedans, SUVs & Luxury Cars',
          'Self-Drive & Chauffeur-Driven Rental Flexibility',
          'Transparent Booking Terms & Zero Hidden Charges',
          'Seamless Digital Verification & Contactless Pickups',
        ],
        targetAudience:
          'Urban commuters, leisure travelers, corporate executives, event planners, and outstation tourists.',
        useCases: [
          'Weekend road trips and outstation travel with family or friends',
          'Daily and monthly corporate executive mobility solutions',
          'Reliable airport pick-and-drop transfers',
          'Wedding, VIP delegation, and event fleet management',
        ],
        howItWorks: [
          'Search cars by city, duration, and vehicle category',
          'Choose self-drive or chauffeur service and complete digital verification',
          'Pick up vehicle from partner hub or choose doorstep delivery',
          'Enjoy smooth travel with 24/7 roadside assistance support',
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 2,
        seoTitle: 'Carrento — Seamless Car Rental & Mobility Booking Platform',
        seoDescription:
          'Rent self-drive and chauffeur-driven cars easily. Book verified vehicles across top cities with Carrento.',
      },
      {
        name: 'Jainamshree',
        slug: 'jainamshree',
        category: 'Community E-commerce',
        websiteUrl: 'https://jainamshree.online',
        shortDescription: 'Jain community-focused e-commerce platform',
        detailedDescription:
          'Jainamshree is a dedicated community-centric e-commerce marketplace curated specifically to serve Jain households and cultural enthusiasts. The platform provides convenient online access to authentic satvik groceries, religious ceremony essentials, puja samagri, spiritual literature, and artisanal goods sourced from trusted community merchants.',
        keyFeatures: [
          '100% Satvik & Strict Ethical Standards Verification',
          'Curated Puja Essentials & Sacred Ceremony Samagri',
          'Authentic Spiritual Literature, Shastras & Educational Material',
          'Direct Community Artisan & Merchant Empowerment',
        ],
        targetAudience:
          'Jain community members worldwide, satvik dietary followers, spiritual households, and cultural centers.',
        useCases: [
          'Sourcing authentic Jain groceries, spices, and festival foods',
          'Ordering comprehensive ritual and puja packages for home or derasar',
          'Accessing Jain philosophy books and children moral value publications',
          'Procuring traditional community handicrafts and temple attire',
        ],
        howItWorks: [
          'Browse curated categories tailored to community values and dietary guidelines',
          'Select products verified by trusted community merchant partners',
          'Place order through secure online checkout',
          'Carefully packaged and delivered directly to your doorstep',
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 3,
        seoTitle: 'Jainamshree — Pure Satvik Goods & Community E-commerce Marketplace',
        seoDescription:
          'Shop pure satvik groceries, sacred puja essentials, and spiritual literature online at Jainamshree.',
      },
      {
        name: 'SuperiorMart',
        slug: 'superiormart',
        category: 'E-commerce Marketplace',
        websiteUrl: 'https://superiormart.in',
        shortDescription: 'Multi-category e-commerce marketplace',
        detailedDescription:
          'SuperiorMart is a comprehensive multi-category digital marketplace bridging everyday consumers with reliable retail merchants, distributors, and direct-to-consumer brands. Built on robust aggregator infrastructure, SuperiorMart delivers a vast assortment of lifestyle, home, electronics, and daily essentials backed by secure payments and prompt logistics.',
        keyFeatures: [
          'Broad Product Variety Across Multiple Daily Categories',
          'Verified Third-Party Sellers & Direct Merchant Integration',
          'Secure Payment Gateways & Multiple Settlement Options',
          'Trackable Logistics & Dedicated Order Support',
        ],
        targetAudience:
          'Value-conscious online shoppers, families, student households, and regional merchants expanding digitally.',
        useCases: [
          'Ordering everyday home, kitchen, and personal care essentials',
          'Purchasing electronics, smart accessories, and digital gadgets',
          'Discovering emerging regional brands and artisan products',
          'Bulk purchasing for small offices and retail organizations',
        ],
        howItWorks: [
          'Search and compare products across hundreds of verified sellers',
          'Add items from multiple categories into a single cart',
          'Checkout securely with multiple digital payment methods',
          'Merchants fulfill orders via integrated courier network with real-time tracking',
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 4,
        seoTitle: 'SuperiorMart — Multi-Category Digital Shopping Marketplace',
        seoDescription:
          'Explore thousands of products across home, lifestyle, electronics, and daily essentials on SuperiorMart.',
      },
    ];

    for (const p of initialPlatforms) {
      await Platform.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
      console.log(`[Seed] Platform seeded/synced: ${p.name}`);
    }

    // 4. Seed Default CMS Pages
    console.log('[Seed] Seeding CMS pages content...');
    const pages = [
      {
        pageSlug: 'home',
        title: 'Home',
        heroHeadline: 'Building Digital Platforms for Everyday Needs',
        heroDescription:
          'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
        status: 'Published',
      },
      {
        pageSlug: 'about',
        title: 'About Us',
        heroHeadline: 'Empowering Digital Connectivity Across India',
        heroDescription:
          'Namah Siddham Corporation Private Limited is an Indian enterprise operating specialized online marketplaces and aggregator platforms designed to solve real-world accessibility and convenience challenges.',
        sections: {
          vision:
            'To build accessible, scalable digital platforms that simplify everyday needs and create meaningful opportunities for customers, service providers, and businesses.',
          mission:
            'To develop and operate specialized online platforms that make discovering services, booking mobility solutions, and accessing digital commerce more convenient.',
          philosophy:
            'We believe sustainable digital commerce is built on transparent partner relationships, rigorous service standards, and technology that serves real consumer convenience.',
        },
        status: 'Published',
      },
      {
        pageSlug: 'business-model',
        title: 'Business Model',
        heroHeadline: 'Our Technology Aggregator Architecture',
        heroDescription:
          'A scalable ecosystem that orchestrates demand, supply, quality control, and digital fulfillment across multiple industries.',
        status: 'Published',
      },
      {
        pageSlug: 'partner',
        title: 'Partner With Us',
        heroHeadline: 'Grow Your Business Across Our Digital Ecosystem',
        heroDescription:
          'Whether you are an independent service professional, fleet operator, product manufacturer, or corporate enterprise, our platforms offer the reach and technology you need.',
        status: 'Published',
      },
      {
        pageSlug: 'contact',
        title: 'Contact Us',
        heroHeadline: 'Connect with Namah Siddham Corporation',
        heroDescription:
          'For corporate inquiries, partnerships, media communications, or general correspondence, our team is at your disposal.',
        status: 'Published',
      },
      // Legal Pages
      {
        pageSlug: 'legal-privacy',
        title: 'Privacy Policy',
        heroHeadline: 'Privacy Policy & Data Protection',
        heroDescription: 'How Namah Siddham Corporation Private Limited collects, uses, and safeguards information.',
        bodyContent: `### 1. Introduction
Namah Siddham Corporation Private Limited ("Company", "we", "us", or "our"), incorporated under the Companies Act, 2013 (CIN: U77100MP2026PTC087531), is committed to safeguarding the privacy and personal data of visitors, partners, and users across our corporate website and digital portfolio.

> **Legal Review Notice**: This privacy policy document is a corporate draft subject to periodic legal review and statutory regulatory updates in accordance with the Digital Personal Data Protection Act (DPDP Act) and applicable Indian laws.

### 2. Information We Collect
We collect information that you voluntarily provide when submitting partnership inquiries, career applications, or corporate messages. This includes:
- Personal identifiers (Name, Email address, Telephone/Mobile number)
- Business identifiers (Company name, Operating city, Business category)
- Professional details (Resume, Work history, Portfolio links)

### 3. Purpose of Processing
Your data is processed strictly for:
- Evaluating and responding to partnership or vendor inquiries
- Processing recruitment applications
- Corporate compliance and administrative record-keeping
- Communicating important corporate updates or notices

### 4. Data Sharing & Security
We do not sell, rent, or trade your personal information to third parties for marketing purposes. Data is stored on secure cloud databases with role-based administrative access controls, encryption at rest, and TLS transmission security.

### 5. Grievance Officer
In accordance with the Information Technology Act and rules made thereunder, any privacy grievances may be addressed to:
**Grievance Officer**, Namah Siddham Corporation Private Limited
Email: grievance@namahsiddham.com
Registered Office: Madhya Pradesh, India`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-terms',
        title: 'Terms of Use',
        heroHeadline: 'Terms of Use & Service Agreement',
        heroDescription: 'Rules and terms governing access to our corporate website and platform properties.',
        bodyContent: `### 1. Acceptance of Terms
By accessing or using the corporate website of Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.

> **Draft Notice**: Specific terms, cancellation policies, vendor agreements, and customer contracts for individual ecosystem platforms (HomeServixo, Carrento, Jainamshree, SuperiorMart) are governed by their respective platform terms accessible on their official websites.

### 2. Intellectual Property
All content, brand names, logos, registered trademarks, layout designs, and source code are the intellectual property of Namah Siddham Corporation Private Limited or its respective brand affiliates.

### 3. Platform Operating Notice
Namah Siddham Corporation operates as a technology facilitator and aggregator across diverse sectors. Transactional agreements, warranties, and specific service-level commitments are fulfilled according to the platform-specific operating guidelines.

### 4. Jurisdiction & Governing Law
These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Madhya Pradesh, India.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-cookie',
        title: 'Cookie Policy',
        heroHeadline: 'Cookie & Tracking Policy',
        heroDescription: 'Information about how cookies and session tokens are utilized on this corporate website.',
        bodyContent: `### 1. What Are Cookies
Cookies and local session tokens are small data files placed on your browser or device when you navigate our websites.

### 2. How We Use Cookies
Our corporate portal utilizes essential and functional cookies primarily for:
- Maintaining secure administrative session authentication
- Remembering user interface preferences
- Ensuring robust CSRF protection and form submission integrity

### 3. Managing Cookies
You can manage or disable cookies via your browser settings. Note that disabling essential cookies may impact authentication functions for the admin portal.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-grievance',
        title: 'Grievance and Contact Information',
        heroHeadline: 'Grievance Redressal Mechanism',
        heroDescription: 'Statutory compliance details and designated grievance officer contact info.',
        bodyContent: `### Corporate Grievance Mechanism
In compliance with Indian IT and digital intermediary guidelines, Namah Siddham Corporation Private Limited provides a dedicated channel for prompt redressal of concerns or complaints.

**Company**: Namah Siddham Corporation Private Limited
**CIN**: U77100MP2026PTC087531
**Registered Office**: Indore, Madhya Pradesh, India
**Email for Grievances**: grievance@namahsiddham.com
**General Corporate Inquiries**: contact@namahsiddham.com

Our grievance officer reviews and acknowledges legitimate statutory submissions within 48 business hours.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-disclaimer',
        title: 'Website Disclaimer',
        heroHeadline: 'Corporate Disclaimer',
        heroDescription: 'Important notices regarding corporate information, platform status, and warranties.',
        bodyContent: `### 1. General Information Disclaimer
The information presented on this corporate website is published in good faith for general corporate information and partnership discovery purposes only.

### 2. Platform Autonomy & Operations
Namah Siddham Corporation Private Limited acts as the parent operating entity for multiple digital marketplaces. Each digital platform (HomeServixo, Carrento, Jainamshree, SuperiorMart) maintains independent operating terms, merchant agreements, and customer fulfillment protocols.

### 3. No Guarantee of Uninterrupted Service
While we strive for high uptime and accurate information, we make no representations or warranties of any kind regarding the continuous availability of third-party external networks or external platform links.`,
        status: 'Published',
      },
    ];

    for (const page of pages) {
      await PageContent.findOneAndUpdate({ pageSlug: page.pageSlug }, page, {
        upsert: true,
        new: true,
      });
      console.log(`[Seed] Page content seeded: ${page.pageSlug}`);
    }

    // 5. Seed Initial News / Announcement
    console.log('[Seed] Seeding initial corporate news...');
    const newsArticles = [
      {
        title: 'Namah Siddham Corporation Announces Unified Multi-Platform Digital Strategy',
        slug: 'namah-siddham-announces-unified-multi-platform-digital-strategy',
        category: 'Corporate News',
        summary:
          'Namah Siddham Corporation Private Limited announces the strategic roadmap for its multi-platform aggregator ecosystem covering home services, mobility, and community commerce.',
        content: `Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531) has officially unveiled its structured operating model to power specialized digital platforms across India.

Under the unified corporate framework, the company is advancing development and operational scaling for its core properties:
1. **HomeServixo** — Delivering dependable home services and appliance repair solutions.
2. **Carrento** — Modernizing vehicle rentals and on-demand mobility bookings.
3. **Jainamshree** — Enabling authentic community e-commerce for satvik goods and puja essentials.
4. **SuperiorMart** — Aggregating verified merchants across high-demand daily consumer categories.

"Our mission is to build digital platforms that genuinely simplify everyday experiences for consumers while creating dependable livelihoods for local service professionals, car owners, and regional merchants," stated the corporate management.`,
        author: 'Corporate Communications',
        publishedAt: new Date(),
        isPublished: true,
        seoTitle: 'Namah Siddham Announces Multi-Platform Digital Strategy',
        seoDescription:
          'Read about Namah Siddham Corporation Private Limited and its multi-platform aggregator portfolio expansion.',
      },
    ];

    for (const n of newsArticles) {
      await NewsArticle.findOneAndUpdate({ slug: n.slug }, n, { upsert: true, new: true });
      console.log(`[Seed] News article seeded: ${n.title}`);
    }

    // 6. Seed Initial Job Openings
    console.log('[Seed] Seeding initial career openings...');
    const initialJobs = [
      {
        title: 'Full Stack Software Engineer',
        department: 'Engineering & Technology',
        jobType: 'Full-time',
        location: 'Indore / Hybrid, Madhya Pradesh',
        experience: '2-4 Years',
        description:
          'We are seeking a talented Full Stack Software Engineer to build and scale web architectures and APIs across our aggregator platforms.',
        responsibilities: [
          'Develop responsive frontend interfaces using React.js and modern styling systems',
          'Design scalable backend microservices and RESTful APIs using Node.js and Express',
          'Optimize database schemas and aggregation queries in MongoDB',
          'Collaborate with product designers to implement intuitive user workflows',
        ],
        requirements: [
          'Strong proficiency in JavaScript (ES6+), React.js, and Node.js',
          'Hands-on experience with MongoDB, Mongoose, and REST API architectural patterns',
          'Familiarity with Git, modern CI/CD workflows, and responsive web design',
          'Analytical problem-solving skills and strong team communication',
        ],
        status: 'Published',
      },
      {
        title: 'Partner Onboarding & Vendor Operations Specialist',
        department: 'Business Development & Operations',
        jobType: 'Full-time',
        location: 'Indore, Madhya Pradesh',
        experience: '1-3 Years',
        description:
          'Join our partner operations team to lead vendor verification, merchant onboarding, and partner success across our service and e-commerce platforms.',
        responsibilities: [
          'Engage with prospective service professionals, car rental hosts, and e-commerce merchants',
          'Verify partner documentation and enforce platform quality standards',
          'Conduct platform training sessions for newly onboarded partners',
          'Coordinate partner feedback with technical and operations teams',
        ],
        requirements: [
          'Bachelor degree in Business, Management, Communications, or related discipline',
          'Prior experience in vendor onboarding, customer operations, or marketplace support',
          'Excellent verbal and written communication skills in Hindi and English',
          'Customer-centric attitude with strong organizational capabilities',
        ],
        status: 'Published',
      },
    ];

    for (const j of initialJobs) {
      await JobOpening.findOneAndUpdate({ title: j.title }, j, { upsert: true, new: true });
      console.log(`[Seed] Career opening seeded: ${j.title}`);
    }

    // 7. Seed Initial Leadership Profile
    console.log('[Seed] Seeding leadership profile...');
    const initialLeadership = [
      {
        name: 'Board of Directors',
        designation: 'Executive Leadership',
        biography:
          'Namah Siddham Corporation Private Limited is guided by experienced corporate leadership committed to building sustainable, ethical, and technology-driven digital platforms that create value for customers and service providers alike.',
        linkedinUrl: 'https://linkedin.com/company/namahsiddham',
        displayOrder: 1,
        isPublished: true,
      },
    ];

    for (const m of initialLeadership) {
      await LeadershipMember.findOneAndUpdate({ name: m.name }, m, { upsert: true, new: true });
      console.log(`[Seed] Leadership profile seeded: ${m.name}`);
    }

    console.log('\n=============================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(' Default Admin: admin@namahsiddham.com');
    console.log(' Default Pass:  AdminSecure2026#Namah');
    console.log(' Platforms:     HomeServixo, Carrento, Jainamshree, SuperiorMart');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
