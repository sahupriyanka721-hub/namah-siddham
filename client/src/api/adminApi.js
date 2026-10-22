import apiClient from './client';
import {
  mockPlatforms,
  mockNews,
  mockJobs,
  mockTeam,
  mockInquiries,
  mockPartnerInquiries,
  mockApplications,
} from '../data/mockData';

const withFallback = async (apiCall, getFallback) => {
  try {
    return await apiCall();
  } catch (err) {
    const fallback = typeof getFallback === 'function' ? getFallback() : getFallback;
    return { data: fallback };
  }
};

const getStoredContacts = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_contacts') || '[]');
  return [...local, ...mockInquiries];
};

const getStoredPartners = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_partners') || '[]');
  return [...local, ...mockPartnerInquiries];
};

const getStoredApplications = () => {
  const local = JSON.parse(localStorage.getItem('namah_mock_applications') || '[]');
  return [...local, ...mockApplications];
};

export const adminApi = {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () =>
    withFallback(
      () => apiClient.get('/auth/me'),
      {
        success: true,
        admin: {
          _id: 'admin_demo_superadmin',
          name: 'Super Administrator',
          email: 'admin@namahsiddham.com',
          role: 'superadmin',
        },
      }
    ),
  changePassword: (data) =>
    withFallback(
      () => apiClient.post('/auth/change-password', data),
      { success: true, message: 'Password updated successfully.' }
    ),

  // Dashboard & Settings
  getDashboardStats: () =>
    withFallback(
      () => apiClient.get('/admin/dashboard'),
      () => {
        const contacts = getStoredContacts();
        const partners = getStoredPartners();
        const applications = getStoredApplications();
        return {
          stats: {
            publishedPlatforms: mockPlatforms.length,
            totalPlatforms: mockPlatforms.length,
            totalContactInquiries: contacts.length,
            newContactInquiries: contacts.filter((c) => c.status === 'new').length,
            totalPartnerInquiries: partners.length,
            newPartnerInquiries: partners.filter((p) => p.status === 'pending').length,
            activeJobs: mockJobs.length,
            totalApplications: applications.length,
            publishedNews: mockNews.length,
          },
          system: {
            databaseStatus: 'Online',
            cin: 'U77100MP2026PTC087531',
            version: '1.0.0',
            entity: 'Private Limited Company',
          },
          recentActivity: {
            contacts: contacts.slice(0, 5),
            partners: partners.slice(0, 5),
            applications: applications.slice(0, 5),
          },
        };
      }
    ),

  getSettings: () =>
    withFallback(
      () => apiClient.get('/admin/settings'),
      {
        success: true,
        data: {
          companyName: 'Namah Siddham Corporation Private Limited',
          companyType: 'Private Limited Company',
          cin: 'U77100MP2026PTC087531',
          officialEmail: 'contact@namahsiddham.com',
          officialPhone: '+91 731 0000000',
        },
      }
    ),

  updateSettings: (data) =>
    withFallback(
      () => apiClient.put('/admin/settings', data),
      { success: true, message: 'Settings saved successfully.' }
    ),

  // Platforms CRUD
  getPlatforms: (params) =>
    withFallback(
      () => apiClient.get('/admin/platforms', { params }),
      { success: true, data: mockPlatforms }
    ),

  getPlatformById: (id) =>
    withFallback(
      () => apiClient.get(`/admin/platforms/${id}`),
      { success: true, data: mockPlatforms.find((p) => p._id === id) || mockPlatforms[0] }
    ),

  createPlatform: (data) =>
    withFallback(
      () => apiClient.post('/admin/platforms', data),
      { success: true, message: 'Platform registered successfully.', data }
    ),

  updatePlatform: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/platforms/${id}`, data),
      { success: true, message: 'Platform updated successfully.', data }
    ),

  deletePlatform: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/platforms/${id}`),
      { success: true, message: 'Platform removed.' }
    ),

  reorderPlatforms: (items) =>
    withFallback(
      () => apiClient.post('/admin/platforms/reorder', { items }),
      { success: true, message: 'Platform order updated.' }
    ),

  // CMS Pages
  getPages: () =>
    withFallback(
      () => apiClient.get('/admin/pages'),
      { success: true, data: [] }
    ),

  getPageBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/admin/pages/${slug}`),
      { success: true, data: { slug, title: slug, sections: [] } }
    ),

  updatePageContent: (slug, data) =>
    withFallback(
      () => apiClient.put(`/admin/pages/${slug}`, data),
      { success: true, message: 'Content saved successfully.' }
    ),

  // Team
  getTeam: () =>
    withFallback(
      () => apiClient.get('/admin/team'),
      { success: true, data: mockTeam }
    ),

  createTeamMember: (data) =>
    withFallback(
      () => apiClient.post('/admin/team', data),
      { success: true, message: 'Team member added.', data }
    ),

  updateTeamMember: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/team/${id}`, data),
      { success: true, message: 'Team member updated.', data }
    ),

  deleteTeamMember: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/team/${id}`),
      { success: true, message: 'Member removed.' }
    ),

  // News
  getNews: (params) =>
    withFallback(
      () => apiClient.get('/admin/news', { params }),
      { success: true, data: mockNews, total: mockNews.length }
    ),

  createNews: (data) =>
    withFallback(
      () => apiClient.post('/admin/news', data),
      { success: true, message: 'News article published.', data }
    ),

  updateNews: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/news/${id}`, data),
      { success: true, message: 'Article updated.', data }
    ),

  deleteNews: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/news/${id}`),
      { success: true, message: 'Article deleted.' }
    ),

  // Careers
  getJobs: (params) =>
    withFallback(
      () => apiClient.get('/admin/jobs', { params }),
      { success: true, data: mockJobs, total: mockJobs.length }
    ),

  createJob: (data) =>
    withFallback(
      () => apiClient.post('/admin/jobs', data),
      { success: true, message: 'Opening created.', data }
    ),

  updateJob: (id, data) =>
    withFallback(
      () => apiClient.put(`/admin/jobs/${id}`, data),
      { success: true, message: 'Opening updated.', data }
    ),

  deleteJob: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/jobs/${id}`),
      { success: true, message: 'Opening deleted.' }
    ),

  // Inquiries
  getContactInquiries: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/contact', { params }),
      () => ({
        success: true,
        data: getStoredContacts(),
        total: getStoredContacts().length,
      })
    ),

  updateContactInquiry: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/contact/${id}`, data),
      { success: true, message: 'Status updated.' }
    ),

  deleteContactInquiry: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/contact/${id}`),
      { success: true, message: 'Inquiry removed.' }
    ),

  exportContactCSV: () => {
    const csvContent =
      'Full Name,Email,Phone,Subject,Status,Created At\n' +
      getStoredContacts()
        .map((c) => `"${c.fullName || c.name}","${c.email}","${c.phone || ''}","${c.subject}","${c.status}","${c.createdAt}"`)
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return Promise.resolve({ data: blob });
  },

  getPartnerInquiries: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/partners', { params }),
      () => ({
        success: true,
        data: getStoredPartners(),
        total: getStoredPartners().length,
      })
    ),

  updatePartnerInquiry: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/partners/${id}`, data),
      { success: true, message: 'Partner status updated.' }
    ),

  deletePartnerInquiry: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/partners/${id}`),
      { success: true, message: 'Partner inquiry removed.' }
    ),

  exportPartnerCSV: () => {
    const csvContent =
      'Company Name,Contact Person,Email,Phone,Partnership Type,Status,Created At\n' +
      getStoredPartners()
        .map((p) => `"${p.companyName || p.businessName}","${p.contactPerson || p.name}","${p.email}","${p.phone || ''}","${p.partnershipType || p.category}","${p.status}","${p.createdAt}"`)
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return Promise.resolve({ data: blob });
  },

  getJobApplications: (params) =>
    withFallback(
      () => apiClient.get('/admin/inquiries/applications', { params }),
      () => ({
        success: true,
        data: getStoredApplications(),
        total: getStoredApplications().length,
      })
    ),

  updateJobApplication: (id, data) =>
    withFallback(
      () => apiClient.patch(`/admin/inquiries/applications/${id}`, data),
      { success: true, message: 'Application status updated.' }
    ),

  deleteJobApplication: (id) =>
    withFallback(
      () => apiClient.delete(`/admin/inquiries/applications/${id}`),
      { success: true, message: 'Application removed.' }
    ),
};
