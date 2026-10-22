import apiClient from './client';

export const adminApi = {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () => apiClient.get('/auth/me'),
  changePassword: (data) => apiClient.post('/auth/change-password', data),

  // Dashboard & Settings
  getDashboardStats: () => apiClient.get('/admin/dashboard'),
  getSettings: () => apiClient.get('/admin/settings'),
  updateSettings: (data) => apiClient.put('/admin/settings', data),

  // Platforms CRUD
  getPlatforms: (params) => apiClient.get('/admin/platforms', { params }),
  getPlatformById: (id) => apiClient.get(`/admin/platforms/${id}`),
  createPlatform: (data) => apiClient.post('/admin/platforms', data),
  updatePlatform: (id, data) => apiClient.put(`/admin/platforms/${id}`, data),
  deletePlatform: (id) => apiClient.delete(`/admin/platforms/${id}`),
  reorderPlatforms: (items) => apiClient.post('/admin/platforms/reorder', { items }),

  // CMS Pages
  getPages: () => apiClient.get('/admin/pages'),
  getPageBySlug: (slug) => apiClient.get(`/admin/pages/${slug}`),
  updatePageContent: (slug, data) => apiClient.put(`/admin/pages/${slug}`, data),

  // Team
  getTeam: () => apiClient.get('/admin/team'),
  createTeamMember: (data) => apiClient.post('/admin/team', data),
  updateTeamMember: (id, data) => apiClient.put(`/admin/team/${id}`, data),
  deleteTeamMember: (id) => apiClient.delete(`/admin/team/${id}`),

  // News
  getNews: (params) => apiClient.get('/admin/news', { params }),
  createNews: (data) => apiClient.post('/admin/news', data),
  updateNews: (id, data) => apiClient.put(`/admin/news/${id}`, data),
  deleteNews: (id) => apiClient.delete(`/admin/news/${id}`),

  // Careers
  getJobs: (params) => apiClient.get('/admin/jobs', { params }),
  createJob: (data) => apiClient.post('/admin/jobs', data),
  updateJob: (id, data) => apiClient.put(`/admin/jobs/${id}`, data),
  deleteJob: (id) => apiClient.delete(`/admin/jobs/${id}`),

  // Inquiries
  getContactInquiries: (params) => apiClient.get('/admin/inquiries/contact', { params }),
  updateContactInquiry: (id, data) => apiClient.patch(`/admin/inquiries/contact/${id}`, data),
  deleteContactInquiry: (id) => apiClient.delete(`/admin/inquiries/contact/${id}`),
  exportContactCSV: () => apiClient.get('/admin/inquiries/contact/export', { responseType: 'blob' }),

  getPartnerInquiries: (params) => apiClient.get('/admin/inquiries/partners', { params }),
  updatePartnerInquiry: (id, data) => apiClient.patch(`/admin/inquiries/partners/${id}`, data),
  deletePartnerInquiry: (id) => apiClient.delete(`/admin/inquiries/partners/${id}`),
  exportPartnerCSV: () => apiClient.get('/admin/inquiries/partners/export', { responseType: 'blob' }),

  getJobApplications: (params) => apiClient.get('/admin/inquiries/applications', { params }),
  updateJobApplication: (id, data) => apiClient.patch(`/admin/inquiries/applications/${id}`, data),
  deleteJobApplication: (id) => apiClient.delete(`/admin/inquiries/applications/${id}`),

  // Image Upload
  uploadImage: (formData) =>
    apiClient.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
