import apiClient from './client';

export const publicApi = {
  // Settings & Metadata
  getSettings: () => apiClient.get('/public/settings'),

  // Platforms / Ecosystem
  getPlatforms: () => apiClient.get('/public/platforms'),
  getPlatformBySlug: (slug) => apiClient.get(`/public/platforms/${slug}`),

  // CMS Content
  getPageBySlug: (slug) => apiClient.get(`/public/pages/${slug}`),

  // Leadership Team
  getTeam: () => apiClient.get('/public/team'),

  // News
  getNews: () => apiClient.get('/public/news'),
  getNewsBySlug: (slug) => apiClient.get(`/public/news/${slug}`),

  // Careers
  getJobs: () => apiClient.get('/public/jobs'),

  // Inquiries Submissions
  submitContact: (data) => apiClient.post('/public/contact', data),
  submitPartnerInquiry: (data) => apiClient.post('/public/partner-inquiries', data),
  submitJobApplication: (data) => apiClient.post('/public/job-applications', data),

  // Document Upload (e.g. resume)
  uploadDocument: (formData) =>
    apiClient.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
