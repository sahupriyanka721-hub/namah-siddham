import apiClient from './client';

// Initial fallback datasets ensuring continuous offline/preview operability
const defaultServices = [
  {
    title: 'Website Development',
    slug: 'web-development',
    icon: 'Globe',
    shortDescription: 'Business websites, corporate websites, landing pages, and dynamic websites.',
    status: 'Published',
    keyFeatures: ['Custom Responsive Design', 'SEO-Ready Architecture', 'Fast Core Web Vitals', 'Headless CMS Options'],
  },
  {
    title: 'Custom Software Development',
    slug: 'custom-software',
    icon: 'Code2',
    shortDescription: 'Business management systems, ERP, CRM, admin dashboards, workflow software, and tailored applications.',
    status: 'Published',
    keyFeatures: ['Tailored Business Logic', 'Role-Based Access Control', 'Automated Data Pipelines', 'REST APIs'],
  },
  {
    title: 'Mobile Application Development',
    slug: 'mobile-apps',
    icon: 'Smartphone',
    shortDescription: 'Android and iOS applications, customer apps, partner apps, and business mobility solutions.',
    status: 'Published',
    keyFeatures: ['Cross-Platform React Native/Flutter', 'Offline Data Syncing', 'Push Notifications', 'Payment Gateways'],
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'TrendingUp',
    shortDescription: 'SEO, digital campaigns, social media marketing, online visibility, and lead-generation solutions.',
    status: 'Published',
    keyFeatures: ['Search Engine Optimization', 'Conversion Rate Optimization', 'Targeted Ad Campaigns', 'Analytics & Reporting'],
  },
];

const defaultPlatforms = [
  {
    _id: 'plat_homeservixo',
    name: 'HomeServixo',
    slug: 'homeservixo',
    category: 'Home Services and Appliance Repair',
    websiteUrl: 'https://homeservixo.in',
    shortDescription: 'Home services and appliance repair marketplace connecting homeowners with verified technicians.',
    status: 'Under Development',
    keyFeatures: ['Verified Professionals', 'Upfront Estimates', 'Doorstep Repair', 'Warranty Assurance'],
  },
  {
    _id: 'plat_carrento',
    name: 'Carrento',
    slug: 'carrento',
    category: 'Mobility and Car Rental',
    websiteUrl: 'https://carrento.in',
    shortDescription: 'Mobility and car rental platform for self-drive, fleet rentals, and on-demand mobility.',
    status: 'Under Development',
    keyFeatures: ['Diverse Vehicle Fleet', 'Transparent Booking', 'Digital Verification', 'Host Partnerships'],
  },
  {
    _id: 'plat_jainamshree',
    name: 'Jainamshree',
    slug: 'jainamshree',
    category: 'Jain Community E-commerce',
    websiteUrl: 'https://jainamshree.online',
    shortDescription: 'Jain community-focused e-commerce marketplace for satvik goods, puja essentials, and spiritual literature.',
    status: 'Under Development',
    keyFeatures: ['Pure Satvik Verification', 'Puja & Ritual Samagri', 'Spiritual Literature', 'Community Artisans'],
  },
  {
    _id: 'plat_superiormart',
    name: 'SuperiorMart',
    slug: 'superiormart',
    category: 'Multi-category E-commerce Marketplace',
    websiteUrl: 'https://superiormart.in',
    shortDescription: 'Multi-category e-commerce marketplace connecting consumers with verified merchants across lifestyle & essentials.',
    status: 'Under Development',
    keyFeatures: ['Broad Catalog', 'Verified Sellers', 'Secure Payments', 'Prompt Logistics'],
  },
];

const withFallback = async (apiCall, getFallback) => {
  try {
    return await apiCall();
  } catch (err) {
    const fallback = typeof getFallback === 'function' ? getFallback() : getFallback;
    return { data: { success: true, data: fallback } };
  }
};

export const publicApi = {
  // Settings & Corporate Metadata
  getSettings: () =>
    withFallback(
      () => apiClient.get('/public/settings'),
      null
    ),

  // IT Services Vertical
  getServices: () =>
    withFallback(
      () => apiClient.get('/public/services'),
      defaultServices
    ),

  getServiceBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/services/${slug}`),
      () => defaultServices.find((s) => s.slug === slug) || defaultServices[0]
    ),

  // Products & Aggregator Platforms Vertical
  getPlatforms: () =>
    withFallback(
      () => apiClient.get('/public/platforms'),
      defaultPlatforms
    ),

  getPlatformBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/platforms/${slug}`),
      () => defaultPlatforms.find((p) => p.slug === slug) || defaultPlatforms[0]
    ),

  // Portfolio
  getPortfolio: (params) =>
    withFallback(
      () => apiClient.get('/public/portfolio', { params }),
      []
    ),

  getPortfolioBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/portfolio/${slug}`),
      null
    ),

  // CMS Content
  getPageBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/pages/${slug}`),
      null
    ),

  // Leadership Team
  getTeam: () =>
    withFallback(
      () => apiClient.get('/public/team'),
      []
    ),

  // News & Updates
  getNews: () =>
    withFallback(
      () => apiClient.get('/public/news'),
      []
    ),

  getNewsBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/news/${slug}`),
      null
    ),

  // Careers
  getJobs: () =>
    withFallback(
      () => apiClient.get('/public/jobs'),
      []
    ),

  // Inquiries Submissions (Persists to server, with local fallback for offline demo)
  submitContact: async (data) => {
    try {
      return await apiClient.post('/public/contact', data);
    } catch (err) {
      if (err.response?.data?.message) {
        throw err;
      }
      const existing = JSON.parse(localStorage.getItem('namah_mock_contacts') || '[]');
      const newInquiry = {
        _id: 'inq_' + Date.now(),
        referenceId: 'NS-CNT-' + Math.floor(100000 + Math.random() * 900000),
        ...data,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_contacts', JSON.stringify([newInquiry, ...existing]));
      return {
        data: {
          success: true,
          message: 'Project inquiry received and saved.',
          referenceId: newInquiry.referenceId,
        },
      };
    }
  },

  submitPartnerInquiry: async (data) => {
    try {
      return await apiClient.post('/public/partner-inquiries', data);
    } catch (err) {
      if (err.response?.data?.message) {
        throw err;
      }
      const existing = JSON.parse(localStorage.getItem('namah_mock_partners') || '[]');
      const newInquiry = {
        _id: 'part_' + Date.now(),
        referenceId: 'NS-PTR-' + Math.floor(100000 + Math.random() * 900000),
        ...data,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_partners', JSON.stringify([newInquiry, ...existing]));
      return {
        data: {
          success: true,
          message: 'Partnership application submitted successfully.',
          referenceId: newInquiry.referenceId,
        },
      };
    }
  },

  submitJobApplication: async (data) => {
    try {
      return await apiClient.post('/public/job-applications', data);
    } catch (err) {
      if (err.response?.data?.message) {
        throw err;
      }
      const existing = JSON.parse(localStorage.getItem('namah_mock_applications') || '[]');
      const newApp = {
        _id: 'app_' + Date.now(),
        referenceId: 'NS-APP-' + Math.floor(100000 + Math.random() * 900000),
        ...data,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_applications', JSON.stringify([newApp, ...existing]));
      return {
        data: {
          success: true,
          message: 'Job application registered successfully.',
          referenceId: newApp.referenceId,
        },
      };
    }
  },

  uploadDocument: (formData) =>
    apiClient.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
