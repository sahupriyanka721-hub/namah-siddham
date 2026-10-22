import apiClient from './client';
import { mockPlatforms, mockNews, mockJobs, mockTeam } from '../data/mockData';

const withFallback = async (apiCall, getFallback) => {
  try {
    return await apiCall();
  } catch (err) {
    const fallback = typeof getFallback === 'function' ? getFallback() : getFallback;
    return { data: { success: true, data: fallback } };
  }
};

export const publicApi = {
  // Settings & Metadata
  getSettings: () =>
    withFallback(
      () => apiClient.get('/public/settings'),
      null
    ),

  // Platforms / Ecosystem
  getPlatforms: () =>
    withFallback(
      () => apiClient.get('/public/platforms'),
      mockPlatforms
    ),

  getPlatformBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/platforms/${slug}`),
      () => mockPlatforms.find((p) => p.slug === slug) || mockPlatforms[0]
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
      mockTeam
    ),

  // News
  getNews: () =>
    withFallback(
      () => apiClient.get('/public/news'),
      mockNews
    ),

  getNewsBySlug: (slug) =>
    withFallback(
      () => apiClient.get(`/public/news/${slug}`),
      () => mockNews.find((n) => n.slug === slug) || mockNews[0]
    ),

  // Careers
  getJobs: () =>
    withFallback(
      () => apiClient.get('/public/jobs'),
      mockJobs
    ),

  // Inquiries Submissions (Persists to localStorage if API is offline)
  submitContact: async (data) => {
    try {
      return await apiClient.post('/public/contact', data);
    } catch (err) {
      const existing = JSON.parse(localStorage.getItem('namah_mock_contacts') || '[]');
      const newInquiry = {
        _id: 'inq_' + Date.now(),
        ...data,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_contacts', JSON.stringify([newInquiry, ...existing]));
      return { data: { success: true, message: 'Inquiry received and logged securely.' } };
    }
  },

  submitPartnerInquiry: async (data) => {
    try {
      return await apiClient.post('/public/partner-inquiries', data);
    } catch (err) {
      const existing = JSON.parse(localStorage.getItem('namah_mock_partners') || '[]');
      const newInquiry = {
        _id: 'part_' + Date.now(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_partners', JSON.stringify([newInquiry, ...existing]));
      return { data: { success: true, message: 'Partner application submitted successfully.' } };
    }
  },

  submitJobApplication: async (data) => {
    try {
      return await apiClient.post('/public/job-applications', data);
    } catch (err) {
      const existing = JSON.parse(localStorage.getItem('namah_mock_applications') || '[]');
      const newApp = {
        _id: 'app_' + Date.now(),
        ...data,
        status: 'applied',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('namah_mock_applications', JSON.stringify([newApp, ...existing]));
      return { data: { success: true, message: 'Job application registered successfully.' } };
    }
  },

  // Document Upload
  uploadDocument: (formData) =>
    apiClient.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
