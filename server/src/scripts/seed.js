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
import Service from '../models/Service.js';
import PortfolioProject from '../models/PortfolioProject.js';
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
    const settingsPayload = {
      companyName: 'Namah Siddham Corporation Private Limited',
      companyType: 'Private Limited Company',
      cin: 'U77100MP2026PTC087531',
      businessPositioning:
        'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
      logoUrl: '/assets/namah-siddham-logo.png',
      faviconUrl: '/favicon.svg',
      officialEmail: 'contact@namahsiddham.com',
      grievanceEmail: 'grievance@namahsiddham.com',
      officialPhone: '+91 755 0000000',
      registeredOffice: {
        addressLine1: 'Bhopal, Madhya Pradesh, India',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        country: 'India',
        pincode: '462001',
        fullAddress: 'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/company/namahsiddham',
        twitter: 'https://twitter.com/namahsiddham',
        facebook: 'https://facebook.com/namahsiddham',
        instagram: 'https://instagram.com/namahsiddham',
      },
      footerContent: {
        aboutText:
          'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
        copyrightText: '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.',
      },
      seoDefaults: {
        metaTitle:
          'Namah Siddham Corporation Private Limited — IT Services & Digital Products Ecosystem',
        metaDescription:
          'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
      },
      ctaSettings: {
        title: 'Have a Digital Idea? Let’s Build It Together.',
        subtitle:
          'Connect with our team to discuss software development, mobile applications, digital marketing, or opportunities across our digital platforms.',
        primaryButtonText: 'Discuss Your Project',
        primaryButtonLink: '/contact',
        secondaryButtonText: 'Contact Us',
        secondaryButtonLink: '/contact',
      },
    };

    if (!settings) {
      await CompanySettings.create(settingsPayload);
      console.log('[Seed] Company settings initialized for Bhopal, MP.');
    } else {
      Object.assign(settings, settingsPayload);
      await settings.save();
      console.log('[Seed] Company settings updated.');
    }

    // 3. Seed the 4 IT Services
    console.log('[Seed] Seeding IT Services vertical...');
    const services = [
      {
        title: 'Website Development',
        slug: 'web-development',
        icon: 'Globe',
        coverImage: '/assets/services/web-dev.jpg',
        shortDescription:
          'Business websites, corporate websites, landing pages, and dynamic web applications built with modern architectures.',
        detailedDescription:
          'We engineer high-performance, responsive corporate websites and dynamic web applications tailored to business objectives. Our development focuses on speed, accessibility, clean codebases, search engine visibility, and seamless cross-device experiences.',
        keyFeatures: [
          'Custom Responsive UI / UX Design',
          'Search Engine Optimized (SEO) Architecture',
          'Content Management Integration & Headless CMS',
          'Fast Page Load Speeds & Core Web Vitals Optimization',
          'Robust Security Headers & SSL Encryption',
        ],
        problemsSolved: [
          'Outdated legacy websites that fail to convert visitors',
          'Slow loading speeds causing high bounce rates',
          'Inconsistent mobile rendering across smartphones and tablets',
          'Difficult content updating processes without technical support',
        ],
        solutionsProvided: [
          'Modern React and Next.js single-page applications',
          'Corporate brand portals and investor relations sites',
          'High-converting landing pages for marketing campaigns',
          'Structured schema markup for search visibility',
        ],
        process: [
          { step: 1, title: 'Requirement Discovery', description: 'Understanding business scope, target audience, and site architecture.' },
          { step: 2, title: 'UI/UX Wireframing', description: 'Crafting responsive layouts, visual design tokens, and user journeys.' },
          { step: 3, title: 'Frontend & Backend Coding', description: 'Developing clean component-based React applications and REST APIs.' },
          { step: 4, title: 'Testing & Quality Assurance', description: 'Cross-browser testing, responsiveness verification, and performance audits.' },
          { step: 5, title: 'Deployment & Training', description: 'Production rollout with DNS setup, SSL, and administrative guidance.' },
        ],
        deliverables: [
          'Production-ready, responsive website source code',
          'SEO meta configuration and sitemap.xml',
          'CMS / Admin management integration',
          'Deployment documentation and operational guide',
        ],
        industriesServed: ['Corporate Enterprises', 'Healthcare', 'Real Estate', 'Education', 'Retail & E-commerce'],
        faq: [
          { question: 'Will the website be fully mobile responsive?', answer: 'Yes, every website is developed with a mobile-first approach, thoroughly tested on smartphones, tablets, and desktops.' },
          { question: 'Can we manage and update content ourselves?', answer: 'Yes, we integrate easy-to-use content management dashboards so your team can edit text, images, and announcements without writing code.' },
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 1,
        seoTitle: 'Website Development Services — Namah Siddham Corporation',
        seoDescription: 'Professional corporate website development, landing pages, and dynamic web applications by Namah Siddham Corporation.',
      },
      {
        title: 'Custom Software Development',
        slug: 'custom-software',
        icon: 'Code2',
        coverImage: '/assets/services/software-dev.jpg',
        shortDescription:
          'Business management systems, ERP, CRM, admin dashboards, workflow software, and tailored enterprise applications.',
        detailedDescription:
          'We build bespoke software systems designed around your exact business workflows. Whether you need internal operational dashboards, custom inventory tracking, or scalable multi-tenant platforms, our engineering delivers reliability, data integrity, and security.',
        keyFeatures: [
          'Role-Based Access Control (RBAC) & Multi-Tenant Support',
          'Automated Business Workflows & Data Pipelines',
          'RESTful API Architecture & Third-Party System Integrations',
          'Real-time Reporting, Analytics & CSV / PDF Exports',
          'Relational & Document Database Optimization',
        ],
        problemsSolved: [
          'Fragmented manual spreadsheets causing communication silos and errors',
          'Off-the-shelf software with expensive license fees and rigid limitations',
          'Lack of centralized business data and audit visibility',
          'Inefficient repetitive tasks slowing operational turnaround',
        ],
        solutionsProvided: [
          'Custom Enterprise Resource Planning (ERP) modules',
          'Customer Relationship Management (CRM) platforms',
          'Operational dashboards and automated approval flows',
          'Cloud-native backend services with Node.js and MongoDB',
        ],
        process: [
          { step: 1, title: 'Workflow Mapping', description: 'Analyzing existing business operations and defining digital specifications.' },
          { step: 2, title: 'Architecture & Data Schema', description: 'Designing secure database models, API contracts, and access controls.' },
          { step: 3, title: 'Agile Module Development', description: 'Sprint-based engineering with regular client review milestones.' },
          { step: 4, title: 'Data Migration & Verification', description: 'Transferring existing records securely with data validation routines.' },
          { step: 5, title: 'Production Rollout', description: 'Server configuration, user onboarding, and ongoing maintenance.' },
        ],
        deliverables: [
          'Scalable backend API service and web administration console',
          'Database schemas, migration scripts, and seed fixtures',
          'API documentation and system architecture manual',
          'User training and operational support materials',
        ],
        industriesServed: ['Manufacturing', 'Logistics & Supply Chain', 'Financial Services', 'Professional Services'],
        faq: [
          { question: 'Can the software integrate with our existing accounting or ERP tools?', answer: 'Yes, we build standard REST and webhook interfaces to communicate securely with third-party software.' },
          { question: 'How is data security handled?', answer: 'We enforce bcrypt password hashing, encrypted communications (HTTPS/TLS), role-based permissions, and strict audit logging.' },
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 2,
        seoTitle: 'Custom Software & ERP Development — Namah Siddham Corporation',
        seoDescription: 'Tailored enterprise software, ERP, CRM, and workflow automation solutions by Namah Siddham Corporation.',
      },
      {
        title: 'Mobile Application Development',
        slug: 'mobile-apps',
        icon: 'Smartphone',
        coverImage: '/assets/services/mobile-dev.jpg',
        shortDescription:
          'Android and iOS applications, customer apps, partner apps, and business mobility solutions.',
        detailedDescription:
          'We craft performant, user-centric mobile applications for Android and iOS. From consumer on-demand booking applications to field-partner utility apps, we focus on intuitive touch interactions, offline capability, and smooth API synchronizations.',
        keyFeatures: [
          'Cross-Platform Android and iOS Development',
          'Push Notifications & In-App Messaging',
          'Location Tracking, Geofencing & Map Integrations',
          'Secure Mobile Payment Gateway Integrations',
          'Offline Data Caching & Smooth Syncing',
        ],
        problemsSolved: [
          'Lack of direct mobile touchpoint with end customers',
          'Inefficient field service partner coordination',
          'Slow mobile web conversion compared to native app experiences',
          'Difficulty managing real-time notifications and alerts',
        ],
        solutionsProvided: [
          'On-demand consumer booking and ordering mobile apps',
          'Dedicated partner and vendor onboarding mobile portals',
          'Internal employee productivity and attendance tools',
          'API-driven backend synchronization engines',
        ],
        process: [
          { step: 1, title: 'Mobile UX Journey', description: 'Designing intuitive screens, tactile ergonomics, and navigation flows.' },
          { step: 2, title: 'App Development', description: 'Building modular cross-platform codebases with state management.' },
          { step: 3, title: 'API & Gateway Integration', description: 'Connecting authentication, payment gateways, and backend endpoints.' },
          { step: 4, title: 'Device Lab Testing', description: 'Testing across varied screen resolutions, OS versions, and network speeds.' },
          { step: 5, title: 'Store Release Readiness', description: 'Preparing app store assets, privacy disclosures, and signing builds.' },
        ],
        deliverables: [
          'Signed application binaries (APK/AAB for Android, IPA for iOS)',
          'Complete frontend source repository with build scripts',
          'Backend API synchronization specifications',
          'Store deployment guides and privacy compliance declarations',
        ],
        industriesServed: ['On-Demand Services', 'Transportation & Mobility', 'E-commerce & Retail', 'Consumer Community Services'],
        faq: [
          { question: 'Do you develop for both Android and iOS?', answer: 'Yes, we deliver unified, performant applications that run seamlessly on both Android and iOS platforms.' },
          { question: 'Will you help with App Store and Play Store submission?', answer: 'Yes, we assist with store listing assets, compliance checklists, and submission configuration.' },
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 3,
        seoTitle: 'Mobile App Development Services — Namah Siddham Corporation',
        seoDescription: 'High-performance Android and iOS mobile application engineering for consumer and partner platforms.',
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        icon: 'TrendingUp',
        coverImage: '/assets/services/digital-marketing.jpg',
        shortDescription:
          'SEO, digital campaigns, social media marketing, online visibility, and lead-generation solutions.',
        detailedDescription:
          'We implement data-driven digital marketing and search visibility strategies that help businesses attract targeted audiences, build reputable brand equity, and generate measurable inquiries. Our methodologies emphasize search engine hygiene, localized presence, and transparent performance metrics.',
        keyFeatures: [
          'On-Page & Technical Search Engine Optimization (SEO)',
          'Local Business Profile & Google Map Pack Optimization',
          'Data-Driven Content Strategy & Keyword Targeting',
          'Paid Search & Social Media Campaign Structuring',
          'Conversion Rate Optimization (CRO) & Funnel Analysis',
        ],
        problemsSolved: [
          'Low search visibility on critical commercial keywords',
          'Ineffective marketing spend without clear inquiry tracking',
          'Inconsistent brand voice across digital touchpoints',
          'Weak local market presence against established competitors',
        ],
        solutionsProvided: [
          'Comprehensive technical SEO audits and code fixes',
          'Targeted lead generation funnels and landing page optimization',
          'B2B LinkedIn outreach and organic brand positioning',
          'Performance analytics dashboards with conversion tracking',
        ],
        process: [
          { step: 1, title: 'Market & Competitor Audit', description: 'Analyzing search landscape, audience keywords, and competitor gaps.' },
          { step: 2, title: 'Technical SEO Baseline', description: 'Fixing site structure, metadata, crawl errors, and speed bottlenecks.' },
          { step: 3, title: 'Content & Campaign Setup', description: 'Publishing keyword-aligned content and configuring campaign targeting.' },
          { step: 4, title: 'Monitoring & Optimization', description: 'Refining bid strategies, keyword rankings, and user click paths.' },
          { step: 5, title: 'Transparent Reporting', description: 'Delivering straightforward monthly performance and ROI reviews.' },
        ],
        deliverables: [
          'Detailed SEO audit report and technical remediation plan',
          'Configured Google Analytics 4, Tag Manager, and Search Console',
          'Targeted ad campaigns with conversion tracking pixels',
          'Transparent monthly growth and inquiry summary reports',
        ],
        industriesServed: ['B2B Services', 'Local Service Businesses', 'E-commerce Brands', 'Technology Startups'],
        faq: [
          { question: 'Do you guarantee specific top rankings on Google?', answer: 'We follow ethical, white-hat industry best practices. While no agency can ethically guarantee a #1 rank, our structured SEO methodology consistently improves search visibility and inquiry volume over time.' },
          { question: 'How do you measure marketing results?', answer: 'We focus on concrete business outcomes — organic search impressions, qualified contact inquiries, and conversion rates, rather than vanity metrics.' },
        ],
        status: 'Published',
        isFeatured: true,
        displayOrder: 4,
        seoTitle: 'Digital Marketing & SEO Services — Namah Siddham Corporation',
        seoDescription: 'Results-oriented search engine optimization, digital campaigns, and online visibility solutions.',
      },
    ];

    for (const s of services) {
      await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
      console.log(`[Seed] Service seeded: ${s.title}`);
    }

    // 4. Seed the 4 Platforms with Verified Ownership Information
    console.log('[Seed] Seeding the 4 initial digital products...');
    const platforms = [
      {
        name: 'HomeServixo',
        slug: 'homeservixo',
        category: 'Home Services and Appliance Repair',
        websiteUrl: 'https://homeservixo.in',
        logoUrl: '/assets/platforms/homeservixo-logo.png',
        coverImage: '/assets/platforms/homeservixo-cover.jpg',
        shortDescription:
          'A specialized digital platform connecting consumers with verified local technicians for doorstep appliance repair and maintenance services.',
        detailedDescription:
          'HomeServixo is being developed as a streamlined home service aggregator designed to simplify finding trustworthy technicians for essential appliance repairs, HVAC servicing, plumbing, and electrical maintenance. The platform focuses on upfront transparent pricing estimates, verified professional profiles, and structured booking workflows.',
        problemSolved:
          'Homeowners and tenants often face unverified technicians, unpredictable repair billing, delays, and a lack of post-service accountability. HomeServixo creates a dependable platform framework to resolve these pain points.',
        targetAudience:
          'Urban homeowners, apartment residents, property managers, and independent service technicians seeking reliable job bookings.',
        keyFeatures: [
          'Vetted & Identity-Verified Service Technicians',
          'Transparent Upfront Diagnostics & Rate Estimates',
          'Doorstep Booking for Major Domestic Appliances',
          'Scheduled Time Slots & Customer Support Assistance',
        ],
        useCases: [
          'Air conditioner servicing, repair, and gas refilling',
          'Refrigerator, washing machine, and microwave diagnostics',
          'Emergency residential plumbing and electrical repair',
          'Routine home maintenance inspections',
        ],
        howItWorks: [
          'Customer selects their required repair or service category',
          'Platform identifies available qualified technicians in the operating area',
          'Customer schedules an inspection slot with clear preliminary guidance',
          'Service is performed according to verified partner standards',
        ],
        partnerOpportunities:
          'Independent appliance mechanics, certified electricians, and regional repair workshops looking to expand their customer base.',
        status: 'Under Development',
        isFeatured: true,
        displayOrder: 1,
        seoTitle: 'HomeServixo — Home Services & Appliance Repair Platform',
        seoDescription:
          'HomeServixo is a digital platform connecting users with verified technicians for appliance repairs and home services.',
      },
      {
        name: 'Carrento',
        slug: 'carrento',
        category: 'Mobility and Car Rental',
        websiteUrl: 'https://carrento.in',
        logoUrl: '/assets/platforms/carrento-logo.png',
        coverImage: '/assets/platforms/carrento-cover.jpg',
        shortDescription:
          'An aggregator platform engineered to facilitate flexible vehicle rentals, self-drive bookings, and on-demand mobility solutions.',
        detailedDescription:
          'Carrento is designed as a mobility booking platform that bridges independent car owners, licensed fleet operators, and commercial rental agencies with travelers and businesses seeking dependable vehicles. It provides intuitive search, clear rental terms, and straightforward digital verification.',
        problemSolved:
          'Traditional car rentals often involve opaque security deposit terms, unclear vehicle conditions, and complicated booking processes. Carrento standardizes the booking flow with transparent agreements.',
        targetAudience:
          'Commuters, outstation travelers, vacationing families, corporate professionals, and independent vehicle hosts.',
        keyFeatures: [
          'Search Across Diverse Vehicle Categories (Hatchbacks, Sedans, SUVs)',
          'Transparent Booking Terms & Security Deposit Clarity',
          'Digital Host Verification & Vehicle Listing Management',
          'Options for Self-Drive and Commercial Mobility Bookings',
        ],
        useCases: [
          'Outstation weekend road trips with family and friends',
          'Corporate executive transportation and airport transfers',
          'Temporary replacement vehicle during personal car repairs',
          'Longer-term monthly vehicle rentals for project assignments',
        ],
        howItWorks: [
          'User chooses city, rental dates, and preferred vehicle class',
          'Available partner listings are displayed with transparent rate structures',
          'User completes document verification and booking confirmation',
          'Vehicle handoff is arranged via partner location or coordinated pickup',
        ],
        partnerOpportunities:
          'Commercial car rental agencies, tour and travel fleet operators, and individual vehicle hosts seeking booking demand.',
        status: 'Under Development',
        isFeatured: true,
        displayOrder: 2,
        seoTitle: 'Carrento — Mobility & Vehicle Rental Platform',
        seoDescription:
          'Carrento is a digital platform designed for booking verified rental vehicles and flexible mobility solutions.',
      },
      {
        name: 'Jainamshree',
        slug: 'jainamshree',
        category: 'Jain Community E-commerce',
        websiteUrl: 'https://jainamshree.online',
        logoUrl: '/assets/platforms/jainamshree-logo.png',
        coverImage: '/assets/platforms/jainamshree-cover.jpg',
        shortDescription:
          'A specialized community-focused e-commerce marketplace for authentic satvik products, religious ceremony essentials, and cultural goods.',
        detailedDescription:
          'Jainamshree is an online platform curated to serve the cultural, dietary, and religious needs of the Jain community. By partnering with reputable community vendors and artisans, the platform enables convenient access to verified satvik groceries, pure puja samagri, spiritual literature, and ethical lifestyle essentials.',
        problemSolved:
          'Finding verified satvik groceries free from prohibited ingredients and sourcing authentic religious ceremony items often proves challenging in many cities. Jainamshree centralizes verified merchants on a single dedicated marketplace.',
        targetAudience:
          'Jain households, satvik dietary followers, spiritual centers, and community members seeking certified cultural goods.',
        keyFeatures: [
          'Strict Satvik Standards & Ethical Ingredient Verification',
          'Authentic Puja Samagri & Religious Ritual Collections',
          'Spiritual Literature, Shastras & Educational Materials',
          'Direct Channel for Community Artisans and Specialized Merchants',
        ],
        useCases: [
          'Ordering daily satvik spices, dry fruits, and approved staples',
          'Purchasing authentic puja packages for festivals and home rituals',
          'Sourcing traditional temple attire and handcrafted spiritual articles',
          'Accessing philosophical books and cultural publications',
        ],
        howItWorks: [
          'Browse categories tailored to ethical and religious dietary requirements',
          'Select products supplied by vetted community merchant partners',
          'Checkout through secure online payment options',
          'Merchant fulfills order with careful packaging and prompt shipping',
        ],
        partnerOpportunities:
          'Community manufacturers, verified satvik food processors, religious book publishers, and devotional item artisans.',
        status: 'Under Development',
        isFeatured: true,
        displayOrder: 3,
        seoTitle: 'Jainamshree — Satvik Goods & Community E-commerce',
        seoDescription:
          'Jainamshree is a dedicated e-commerce marketplace for authentic satvik products and puja essentials.',
      },
      {
        name: 'SuperiorMart',
        slug: 'superiormart',
        category: 'Multi-category E-commerce Marketplace',
        websiteUrl: 'https://superiormart.in',
        logoUrl: '/assets/platforms/superiormart-logo.png',
        coverImage: '/assets/platforms/superiormart-cover.jpg',
        shortDescription:
          'A multi-category digital shopping marketplace connecting everyday consumers with verified retail merchants and distributors.',
        detailedDescription:
          'SuperiorMart is designed as a broad-spectrum e-commerce platform bridging consumers with retail vendors across lifestyle, home essentials, consumer electronics, and daily utility goods. Built on robust catalog and order management architecture, it facilitates reliable online retail discovery.',
        problemSolved:
          'Independent merchants and regional retail brands need scalable digital channels without excessive onboarding friction, while consumers seek transparent pricing and reliable deliveries across everyday product categories.',
        targetAudience:
          'Value-oriented consumers, small households, and regional merchants expanding into digital commerce.',
        keyFeatures: [
          'Wide Product Catalog Across Daily High-Demand Categories',
          'Verified Third-Party Merchant Onboarding & Catalog Tools',
          'Secure Checkout with Multiple Digital Payment Gateways',
          'Structured Order Tracking & Fulfillment Support',
        ],
        useCases: [
          'Ordering everyday home, kitchen, and personal utility items',
          'Discovering consumer electronics accessories and lifestyle goods',
          'Purchasing regional goods and household necessities online',
          'Connecting regional retail shops with broader online customer bases',
        ],
        howItWorks: [
          'Consumers search and compare verified products from merchant listings',
          'Orders are placed securely through digital payment channels',
          'Merchant fulfills order through coordinated logistics partner channels',
          'Customer receives real-time dispatch and delivery updates',
        ],
        partnerOpportunities:
          'Product distributors, authorized retail merchants, brand owners, and logistics partners across India.',
        status: 'Under Development',
        isFeatured: true,
        displayOrder: 4,
        seoTitle: 'SuperiorMart — Multi-Category Online Shopping Platform',
        seoDescription:
          'SuperiorMart is a digital marketplace platform connecting verified retail merchants with consumers.',
      },
    ];

    for (const p of platforms) {
      await Platform.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
      console.log(`[Seed] Platform seeded: ${p.name}`);
    }

    // 5. Seed Representative Portfolio Projects
    console.log('[Seed] Seeding portfolio projects...');
    const portfolioProjects = [
      {
        name: 'Multi-Vendor Marketplace Architecture',
        slug: 'multi-vendor-marketplace-architecture',
        industry: 'E-commerce & Retail Tech',
        category: 'Custom Software Development',
        projectType: 'Demonstration Project',
        shortDescription:
          'A scalable multi-tenant e-commerce backend with vendor onboarding, product catalog management, and automated order routing.',
        detailedDescription:
          'Demonstration architecture designed to illustrate modern e-commerce scalability. Features role-based merchant dashboards, product variants, inventory tracking, integrated payment gateways, and trackable shipment workflows.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redis'],
        coverImage: '/assets/portfolio/marketplace.jpg',
        galleryImages: ['/assets/portfolio/marketplace.jpg'],
        projectUrl: 'https://superiormart.in',
        isFeatured: true,
        status: 'Published',
        displayOrder: 1,
        seoTitle: 'Multi-Vendor Marketplace Architecture — Portfolio',
        seoDescription: 'Case study of a scalable multi-tenant e-commerce platform architecture.',
      },
      {
        name: 'On-Demand Service Scheduling Engine',
        slug: 'on-demand-service-scheduling-engine',
        industry: 'Home Services & Field Operations',
        category: 'Custom Software Development',
        projectType: 'Internal Product',
        shortDescription:
          'Real-time technician dispatching, geographic service clustering, and automated customer appointment booking platform.',
        detailedDescription:
          'Developed as internal infrastructure for service aggregator workflows. Implements slot-based scheduling, pin-code serviceability checks, technician status monitoring, and customer SMS/WhatsApp notification triggers.',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
        coverImage: '/assets/portfolio/service-engine.jpg',
        galleryImages: ['/assets/portfolio/service-engine.jpg'],
        projectUrl: 'https://homeservixo.in',
        isFeatured: true,
        status: 'Published',
        displayOrder: 2,
        seoTitle: 'Service Scheduling Engine — Portfolio',
        seoDescription: 'Field service dispatching and appointment booking system case study.',
      },
      {
        name: 'Enterprise Corporate Brand & Portal',
        slug: 'enterprise-corporate-brand-portal',
        industry: 'Information Technology',
        category: 'Website Development',
        projectType: 'Demonstration Project',
        shortDescription:
          'High-performance corporate brand portal featuring comprehensive CMS management, dynamic service showcases, and statutory compliance registries.',
        detailedDescription:
          'Corporate website system engineered with modern React, Vite, and Node.js. Incorporates comprehensive SEO schema markup, responsive UI design tokens, role-protected administrative CMS, and inquiries management.',
        technologies: ['React.js', 'Vite', 'Node.js', 'Express', 'Tailwind CSS', 'Mongoose'],
        coverImage: '/assets/portfolio/corporate-portal.jpg',
        galleryImages: ['/assets/portfolio/corporate-portal.jpg'],
        projectUrl: '',
        isFeatured: true,
        status: 'Published',
        displayOrder: 3,
        seoTitle: 'Enterprise Corporate Brand Portal — Portfolio',
        seoDescription: 'Case study of modern corporate website with headless CMS administration.',
      },
      {
        name: 'Mobility Booking & Fleet Aggregation System',
        slug: 'mobility-booking-fleet-aggregation',
        industry: 'Transportation & Logistics',
        category: 'Mobile Application Development',
        projectType: 'Internal Product',
        shortDescription:
          'Vehicle inventory cataloging, calendar availability checks, and host management platform for mobility rentals.',
        detailedDescription:
          'Internal platform architecture engineered to power mobility bookings. Features host vehicle listing management, seasonal rate cards, digital ID verification flows, and customer booking reservation states.',
        technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        coverImage: '/assets/portfolio/mobility.jpg',
        galleryImages: ['/assets/portfolio/mobility.jpg'],
        projectUrl: 'https://carrento.in',
        isFeatured: true,
        status: 'Published',
        displayOrder: 4,
        seoTitle: 'Mobility Booking Platform — Portfolio',
        seoDescription: 'Vehicle rental and fleet aggregation platform case study.',
      },
    ];

    for (const proj of portfolioProjects) {
      await PortfolioProject.findOneAndUpdate({ slug: proj.slug }, proj, {
        upsert: true,
        new: true,
      });
      console.log(`[Seed] Portfolio project seeded: ${proj.name}`);
    }

    // 6. Seed CMS Pages
    console.log('[Seed] Seeding CMS pages content...');
    const pages = [
      {
        pageSlug: 'home',
        title: 'Home',
        heroHeadline: 'Technology That Builds Businesses and Connects Opportunities',
        heroDescription:
          'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
        status: 'Published',
      },
      {
        pageSlug: 'about',
        title: 'About Us',
        heroHeadline: 'One Company. Two Digital Growth Verticals.',
        heroDescription:
          'Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531) is an Indian enterprise operating across IT Services and Digital Solutions, and specialized Digital Products, Marketplaces, and Aggregator Platforms.',
        sections: {
          vision:
            'To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses.',
          mission:
            'To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration.',
          philosophy:
            'We believe sustainable digital commerce and technology solutions are built on transparent partner relationships, rigorous technical standards, and software that solves real operational bottlenecks.',
        },
        status: 'Published',
      },
      {
        pageSlug: 'business-model',
        title: 'Business Model',
        heroHeadline: 'How Our Business Model Works',
        heroDescription:
          'A transparent operational architecture orchestrating demand, technology solutions, partner collaboration, and fulfillment across our two business verticals.',
        status: 'Published',
      },
      {
        pageSlug: 'partner',
        title: 'Partner With Us',
        heroHeadline: 'Collaborate and Grow With Our Digital Ecosystem',
        heroDescription:
          'Inviting home service professionals, car owners and rental partners, e-commerce vendors, product sellers, technology partners, and business collaboration partners.',
        status: 'Published',
      },
      {
        pageSlug: 'contact',
        title: 'Contact Us',
        heroHeadline: 'Connect with Namah Siddham Corporation',
        heroDescription:
          'Have a digital idea or corporate requirement? Reach out to our engineering and management team in Bhopal, Madhya Pradesh, India.',
        status: 'Published',
      },
      {
        pageSlug: 'legal-privacy',
        title: 'Privacy Policy',
        heroHeadline: 'Privacy Policy & Data Protection',
        heroDescription:
          'How Namah Siddham Corporation Private Limited collects, uses, and safeguards information.',
        bodyContent: `### 1. Introduction
Namah Siddham Corporation Private Limited ("Company", "we", "us", or "our"), incorporated in India under the Companies Act, 2013 (CIN: U77100MP2026PTC087531), registered in Bhopal, Madhya Pradesh, is committed to safeguarding the privacy and personal data of our website visitors, business partners, and clients.

> **Corporate Compliance Draft**: This document provides a transparent overview of our data processing principles and is subject to periodic legal review in compliance with the Digital Personal Data Protection Act (DPDP Act) and applicable Indian statutory laws.

### 2. Information We Collect
We collect information provided directly through our website contact forms, partnership applications, and project inquiries, including:
- Contact details: Full name, official email address, mobile number, city, and state.
- Business details: Company name, business category, service requirements, and project scope.
- Professional submissions: Resumes and credentials submitted for job openings.

### 3. Purpose of Processing
Collected data is utilized strictly for legitimate business purposes:
- Assessing and replying to IT service inquiries and software development projects.
- Evaluating partner and vendor applications for our digital platforms (HomeServixo, Carrento, Jainamshree, SuperiorMart).
- Recruitment and candidate evaluation.
- Statutory record-keeping and corporate administrative compliance.

### 4. Data Security & Storage
We do not sell, rent, or trade user data to third parties. Information is stored in secure database clusters with access restricted strictly to authorized corporate personnel using encrypted connections (TLS/HTTPS).

### 5. Grievance Redressal
For privacy questions, corrections, or grievance redressal, please contact:
**Grievance Officer**, Namah Siddham Corporation Private Limited
Email: grievance@namahsiddham.com
Registered Office: Bhopal, Madhya Pradesh, India`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-terms',
        title: 'Terms of Use',
        heroHeadline: 'Terms of Use & Corporate Notices',
        heroDescription:
          'Terms and conditions governing access to our corporate website and digital properties.',
        bodyContent: `### 1. Acceptance of Terms
By accessing or using the corporate website of Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531), you agree to comply with and be bound by these Terms of Use.

### 2. Nature of Corporate Information
This website represents the corporate holding entity and its two business verticals: IT Services & Digital Solutions, and Digital Products & Aggregator Platforms. Individual platform properties (HomeServixo, Carrento, Jainamshree, SuperiorMart) maintain platform-specific customer terms, booking agreements, and merchant fulfillment rules accessible on their respective official domains.

### 3. Intellectual Property Rights
All source code, designs, brand marks, and corporate content on this portal are the intellectual property of Namah Siddham Corporation Private Limited or its respective partners. Unauthorized duplication or scraping is strictly prohibited.

### 4. Jurisdiction & Governing Law
These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Madhya Pradesh, India.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-disclaimer',
        title: 'Website Disclaimer',
        heroHeadline: 'Corporate Website Disclaimer',
        heroDescription:
          'Important legal notices regarding information accuracy, product development status, and external links.',
        bodyContent: `### 1. General Corporate Information
The content on this website is published in good faith for general corporate information, service presentation, and partnership exploration.

### 2. Platform Status & Operational Arrangements
Platforms labeled as "Under Development" or "Coming Soon" reflect active engineering projects and must not be construed as fully operational commercial services until explicitly designated as "Live" by the company. Individual operating platforms maintain independent fulfillment, merchant contracts, and payment arrangements.

### 3. External Links
This corporate portal contains links to external product websites and official platforms. While we strive to maintain verified links, we are not responsible for the continuous uptime or third-party telecommunications network availability.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-grievance',
        title: 'Grievance Contact',
        heroHeadline: 'Statutory Grievance Redressal Mechanism',
        heroDescription:
          'Statutory compliance details and designated grievance officer contact info.',
        bodyContent: `### Corporate Grievance Officer
In accordance with the Information Technology Act, 2000 and applicable consumer protection rules, the details of the Grievance Redressal mechanism are as follows:

**Entity**: Namah Siddham Corporation Private Limited  
**CIN**: U77100MP2026PTC087531  
**Registered Office**: Bhopal, Madhya Pradesh, India  
**Designated Email**: grievance@namahsiddham.com  
**Corporate Inquiries**: contact@namahsiddham.com  

Statutory grievances and notices are reviewed and acknowledged within 48 business hours.`,
        status: 'Published',
      },
      {
        pageSlug: 'legal-cookie',
        title: 'Cookie Policy',
        heroHeadline: 'Cookie & Session Policy',
        heroDescription: 'How cookies and session tokens are used on this corporate portal.',
        bodyContent: `### 1. Essential Cookies
Our website uses essential HTTP cookies and secure local session tokens strictly for user authentication within the administrative management panel and form security (CSRF protection).

### 2. Managing Cookies
You can adjust cookie settings through your browser. Please note that disabling essential cookies may impact authentication functions on the admin panel.`,
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

    // 7. Seed Initial Corporate News
    console.log('[Seed] Seeding corporate news...');
    const newsArticles = [
      {
        title: 'Namah Siddham Corporation Announces Unified Strategy Across IT Services and Digital Platforms',
        slug: 'namah-siddham-announces-unified-strategy-across-it-services-and-digital-platforms',
        category: 'Corporate News',
        summary:
          'Namah Siddham Corporation Private Limited announces its operational framework covering IT Services & Digital Solutions and a growing portfolio of specialized digital platforms.',
        content: `Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531), headquartered in Bhopal, Madhya Pradesh, has officially unveiled its structured operating model to power two core business verticals:

1. **IT Services and Digital Solutions**: Providing website development, custom business software, mobile applications, and strategic digital marketing for enterprise and growing businesses.
2. **Digital Products and Aggregator Platforms**: Engineering specialized digital platforms including HomeServixo (home services and appliance repair), Carrento (mobility and vehicle rental), Jainamshree (Jain community e-commerce), and SuperiorMart (multi-category e-commerce marketplace).

"Our approach is grounded in combining technical software engineering capability with dedicated digital aggregator platforms that solve accessibility and convenience challenges for consumers, service professionals, and merchants," stated the corporate management.`,
        author: 'Corporate Communications',
        publishedAt: new Date(),
        isPublished: true,
        seoTitle: 'Namah Siddham Announces Two Digital Growth Verticals',
        seoDescription:
          'Read about Namah Siddham Corporation Private Limited strategy across IT services and aggregator platforms.',
      },
    ];

    for (const n of newsArticles) {
      await NewsArticle.findOneAndUpdate({ slug: n.slug }, n, { upsert: true, new: true });
      console.log(`[Seed] News article seeded: ${n.title}`);
    }

    // 8. Seed Initial Careers
    console.log('[Seed] Seeding job openings...');
    const jobs = [
      {
        title: 'Full Stack React & Node.js Engineer',
        department: 'Technology & Engineering',
        jobType: 'Full-time',
        location: 'Bhopal / Hybrid, Madhya Pradesh',
        experience: '2-5 Years',
        description:
          'We are seeking an experienced Full Stack Engineer to lead web architecture and API development across our IT solutions and digital platform portfolio.',
        responsibilities: [
          'Build responsive and high-performance frontend interfaces using React.js and Tailwind CSS',
          'Design and maintain scalable Node.js/Express backend APIs and MongoDB schemas',
          'Implement secure authentication, role-based controls, and input sanitization',
          'Collaborate on platform features for HomeServixo, Carrento, Jainamshree, and SuperiorMart',
        ],
        requirements: [
          'Proficiency with JavaScript (ES6+), React.js, Node.js, and Express.js',
          'Strong practical experience with MongoDB, Mongoose, and RESTful APIs',
          'Understanding of responsive design principles, web accessibility, and performance optimization',
          'Good analytical and problem-solving skills with a team-oriented mindset',
        ],
        status: 'Published',
      },
      {
        title: 'Partner Operations & Business Development Associate',
        department: 'Partner Relations & Operations',
        jobType: 'Full-time',
        location: 'Bhopal, Madhya Pradesh',
        experience: '1-3 Years',
        description:
          'Join our partner operations team to engage with service professionals, car rental hosts, and e-commerce merchants across India.',
        responsibilities: [
          'Manage onboarding inquiries from technicians, vehicle hosts, and retail merchants',
          'Coordinate document verification and quality adherence across operating platforms',
          'Provide initial platform training and operational assistance to newly joined partners',
          'Compile partner feedback to assist technical and product improvement cycles',
        ],
        requirements: [
          'Bachelor degree in Business, Communications, Commerce, or related disciplines',
          'Strong verbal and written communication skills in Hindi and English',
          'Customer-centric demeanor with effective organizational skills',
        ],
        status: 'Published',
      },
    ];

    for (const j of jobs) {
      await JobOpening.findOneAndUpdate({ title: j.title }, j, { upsert: true, new: true });
      console.log(`[Seed] Job opening seeded: ${j.title}`);
    }

    // 9. Seed Corporate Leadership
    console.log('[Seed] Seeding corporate leadership...');
    const leadership = [
      {
        name: 'Board of Directors',
        designation: 'Corporate Management',
        biography:
          'Namah Siddham Corporation Private Limited is guided by dedicated management committed to building sustainable, ethical, and technology-driven digital platforms and client software solutions.',
        linkedinUrl: 'https://linkedin.com/company/namahsiddham',
        displayOrder: 1,
        isPublished: true,
      },
    ];

    for (const m of leadership) {
      await LeadershipMember.findOneAndUpdate({ name: m.name }, m, { upsert: true, new: true });
      console.log(`[Seed] Leadership seeded: ${m.name}`);
    }

    console.log('\n======================================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(' Company:     Namah Siddham Corporation Private Limited');
    console.log(' Location:    Bhopal, Madhya Pradesh, India');
    console.log(' CIN:         U77100MP2026PTC087531');
    console.log(' Superadmin:  ' + ENV.INITIAL_ADMIN_EMAIL);
    console.log(' Password:    ' + ENV.INITIAL_ADMIN_PASSWORD);
    console.log(' IT Services: 4 Services Seeded');
    console.log(' Products:    HomeServixo, Carrento, Jainamshree, SuperiorMart');
    console.log(' Portfolio:   4 Projects Seeded');
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
