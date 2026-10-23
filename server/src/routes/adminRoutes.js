import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import {
  getDashboardStats,
  getCompanySettings,
  updateCompanySettings,
} from '../controllers/adminController.js';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  reorderServices,
} from '../controllers/serviceController.js';
import {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
  reorderPlatforms,
} from '../controllers/platformController.js';
import {
  getAllPortfolioProjects,
  getPortfolioProjectById,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
} from '../controllers/portfolioController.js';
import {
  getAllPages,
  getPageBySlugAdmin,
  updatePageContent,
} from '../controllers/pageController.js';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import {
  getAllNewsAdmin,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import {
  getAllJobsAdmin,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/careerController.js';
import {
  getContactInquiries,
  updateContactInquiryStatus,
  deleteContactInquiry,
  exportContactInquiriesCSV,
  getPartnerInquiries,
  updatePartnerInquiryStatus,
  deletePartnerInquiry,
  exportPartnerInquiriesCSV,
  getJobApplications,
  updateJobApplicationStatus,
  deleteJobApplication,
} from '../controllers/inquiryController.js';

const router = express.Router();

// Apply auth protection to all administrative routes
router.use(protectAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Company Settings
router.get('/settings', getCompanySettings);
router.put('/settings', updateCompanySettings);

// IT Services CRUD
router.get('/services', getAllServices);
router.post('/services', createService);
router.post('/services/reorder', reorderServices);
router.get('/services/:id', getServiceById);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Platforms CRUD
router.get('/platforms', getAllPlatforms);
router.post('/platforms', createPlatform);
router.post('/platforms/reorder', reorderPlatforms);
router.get('/platforms/:id', getPlatformById);
router.put('/platforms/:id', updatePlatform);
router.delete('/platforms/:id', deletePlatform);

// Portfolio CRUD
router.get('/portfolio', getAllPortfolioProjects);
router.post('/portfolio', createPortfolioProject);
router.get('/portfolio/:id', getPortfolioProjectById);
router.put('/portfolio/:id', updatePortfolioProject);
router.delete('/portfolio/:id', deletePortfolioProject);

// Page Content CMS
router.get('/pages', getAllPages);
router.get('/pages/:slug', getPageBySlugAdmin);
router.put('/pages/:slug', updatePageContent);

// Leadership Management
router.get('/team', getAllTeamMembers);
router.post('/team', createTeamMember);
router.get('/team/:id', getTeamMemberById);
router.put('/team/:id', updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

// News & Announcements
router.get('/news', getAllNewsAdmin);
router.post('/news', createNews);
router.get('/news/:id', getNewsById);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

// Job Openings
router.get('/jobs', getAllJobsAdmin);
router.post('/jobs', createJob);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// Inquiries & Applications
router.get('/inquiries/contact', getContactInquiries);
router.get('/inquiries/contact/export', exportContactInquiriesCSV);
router.patch('/inquiries/contact/:id', updateContactInquiryStatus);
router.delete('/inquiries/contact/:id', deleteContactInquiry);

router.get('/inquiries/partners', getPartnerInquiries);
router.get('/inquiries/partners/export', exportPartnerInquiriesCSV);
router.patch('/inquiries/partners/:id', updatePartnerInquiryStatus);
router.delete('/inquiries/partners/:id', deletePartnerInquiry);

router.get('/inquiries/applications', getJobApplications);
router.patch('/inquiries/applications/:id', updateJobApplicationStatus);
router.delete('/inquiries/applications/:id', deleteJobApplication);

export default router;
