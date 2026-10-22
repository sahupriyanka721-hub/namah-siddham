import express from 'express';
import {
  getSettings,
  getPlatforms,
  getPlatformBySlug,
  getPageBySlug,
  getTeam,
  getNews,
  getNewsBySlug,
  getJobs,
  submitContact,
  submitPartnerInquiry,
  submitJobApplication,
} from '../controllers/publicController.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// General & Settings
router.get('/settings', getSettings);

// Platforms & Ecosystem
router.get('/platforms', getPlatforms);
router.get('/platforms/:slug', getPlatformBySlug);

// CMS Content
router.get('/pages/:slug', getPageBySlug);

// Team & Leadership
router.get('/team', getTeam);

// News & Announcements
router.get('/news', getNews);
router.get('/news/:slug', getNewsBySlug);

// Careers
router.get('/jobs', getJobs);

// Form Submissions (Rate-limited & validated)
router.post('/contact', inquiryLimiter, submitContact);
router.post('/partner-inquiries', inquiryLimiter, submitPartnerInquiry);
router.post('/job-applications', inquiryLimiter, submitJobApplication);

export default router;
