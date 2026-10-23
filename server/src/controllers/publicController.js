import CompanySettings from '../models/CompanySettings.js';
import Platform from '../models/Platform.js';
import Service from '../models/Service.js';
import PortfolioProject from '../models/PortfolioProject.js';
import PageContent from '../models/PageContent.js';
import LeadershipMember from '../models/LeadershipMember.js';
import NewsArticle from '../models/NewsArticle.js';
import JobOpening from '../models/JobOpening.js';
import ContactInquiry from '../models/ContactInquiry.js';
import PartnerInquiry from '../models/PartnerInquiry.js';
import JobApplication from '../models/JobApplication.js';
import { generateReferenceId } from '../utils/helpers.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await CompanySettings.findOne();
    if (!settings) {
      settings = await CompanySettings.create({
        companyName: 'Namah Siddham Corporation Private Limited',
        cin: 'U77100MP2026PTC087531',
        registeredOffice: {
          addressLine1: 'Bhopal, Madhya Pradesh, India',
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          country: 'India',
          pincode: '462001',
          fullAddress: 'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
        },
      });
    }
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// IT Services
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'Published' })
      .sort({ displayOrder: 1, createdAt: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({
      slug: slug.toLowerCase(),
      status: 'Published',
    }).select('-__v');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or currently unavailable.',
      });
    }

    const otherServices = await Service.find({
      _id: { $ne: service._id },
      status: 'Published',
    })
      .limit(3)
      .select('title slug shortDescription icon');

    res.status(200).json({
      success: true,
      data: service,
      related: otherServices,
    });
  } catch (error) {
    next(error);
  }
};

// Digital Platforms
export const getPlatforms = async (req, res, next) => {
  try {
    // Only return visible platforms (Live, Published, Under Development, Coming Soon)
    const platforms = await Platform.find({
      status: { $in: ['Live', 'Published', 'Under Development', 'Coming Soon'] },
    })
      .sort({ displayOrder: 1, createdAt: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms,
    });
  } catch (error) {
    next(error);
  }
};

export const getPlatformBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const platform = await Platform.findOne({
      slug: slug.toLowerCase(),
      status: { $in: ['Live', 'Published', 'Under Development', 'Coming Soon'] },
    }).select('-__v');

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found or currently unavailable.',
      });
    }

    // Get related platforms
    const related = await Platform.find({
      _id: { $ne: platform._id },
      status: { $in: ['Live', 'Published', 'Under Development', 'Coming Soon'] },
    })
      .limit(3)
      .select('name slug logoUrl category shortDescription websiteUrl status');

    res.status(200).json({
      success: true,
      data: platform,
      related,
    });
  } catch (error) {
    next(error);
  }
};

// Portfolio
export const getPortfolio = async (req, res, next) => {
  try {
    const { category, type } = req.query;
    const query = { status: 'Published' };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (type && type !== 'All') {
      query.projectType = type;
    }

    const projects = await PortfolioProject.find(query)
      .sort({ isFeatured: -1, displayOrder: 1, createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await PortfolioProject.findOne({
      slug: slug.toLowerCase(),
      status: 'Published',
    }).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// CMS Content
export const getPageBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = await PageContent.findOne({
      pageSlug: slug.toLowerCase(),
      status: 'Published',
    }).select('-__v');

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page content not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

// Leadership Team
export const getTeam = async (req, res, next) => {
  try {
    const team = await LeadershipMember.find({ isPublished: true })
      .sort({ displayOrder: 1, createdAt: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

// News & Announcements
export const getNews = async (req, res, next) => {
  try {
    const news = await NewsArticle.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .select('-content -__v');

    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await NewsArticle.findOne({
      slug: slug.toLowerCase(),
      isPublished: true,
    }).select('-__v');

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found or unpublished.',
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// Careers
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await JobOpening.find({ status: 'Published' })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Contact & Project Inquiry Submission
export const submitContact = async (req, res, next) => {
  try {
    const {
      name,
      businessName,
      email,
      phone,
      city,
      serviceRequired,
      budgetRange,
      projectDescription,
      message,
      preferredContactMethod,
      consent,
    } = req.body;

    const desc = projectDescription || message;

    if (!name || !email || !phone || !city || !desc) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, mobile number, city, and project description are required fields.',
      });
    }

    const referenceId = generateReferenceId('NS-CNT');

    const inquiry = await ContactInquiry.create({
      referenceId,
      name: name.trim(),
      businessName: businessName ? businessName.trim() : '',
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      city: city.trim(),
      serviceRequired: serviceRequired || 'Website Development',
      budgetRange: budgetRange ? budgetRange.trim() : '',
      projectDescription: desc.trim(),
      preferredContactMethod: preferredContactMethod || 'Email',
      consent: consent !== undefined ? Boolean(consent) : true,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Your project inquiry has been received and logged securely.',
      referenceId: inquiry.referenceId,
    });
  } catch (error) {
    next(error);
  }
};

// Partnership Inquiry Submission
export const submitPartnerInquiry = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      businessName,
      email,
      mobile,
      phone,
      city,
      state,
      category,
      partnershipCategory,
      platform,
      relevantPlatform,
      message,
      businessDescription,
      consent,
    } = req.body;

    const contactName = name || fullName;
    const contactPhone = mobile || phone;
    const partnerCat = category || partnershipCategory;
    const partnerPlatform = platform || relevantPlatform || 'General / Multiple Platforms';
    const partnerMessage = message || businessDescription;

    if (
      !contactName ||
      !businessName ||
      !email ||
      !contactPhone ||
      !city ||
      !state ||
      !partnerCat ||
      !partnerMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Full name, business name, email, phone, city, state, category, and business description are required.',
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'Please accept the consent terms to proceed with your partnership application.',
      });
    }

    const referenceId = generateReferenceId('NS-PTR');

    const partnerInquiry = await PartnerInquiry.create({
      referenceId,
      name: contactName.trim(),
      businessName: businessName.trim(),
      email: email.toLowerCase().trim(),
      mobile: contactPhone.trim(),
      city: city.trim(),
      state: state.trim(),
      category: partnerCat,
      platform: partnerPlatform,
      message: partnerMessage.trim(),
      consent: Boolean(consent),
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message:
        'Partnership inquiry received. Our business development team will review and get in touch with you.',
      referenceId: partnerInquiry.referenceId,
    });
  } catch (error) {
    next(error);
  }
};

// Job Application Submission
export const submitJobApplication = async (req, res, next) => {
  try {
    const { jobId, jobTitle, applicantName, email, phone, resumeUrl, coverNote, portfolioUrl } =
      req.body;

    if (!jobTitle || !applicantName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Position, applicant name, email, and phone number are required.',
      });
    }

    const referenceId = generateReferenceId('NS-APP');

    const application = await JobApplication.create({
      referenceId,
      jobId: jobId || undefined,
      jobTitle: jobTitle.trim(),
      applicantName: applicantName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      resumeUrl: resumeUrl || '',
      coverNote: coverNote ? coverNote.trim() : '',
      portfolioUrl: portfolioUrl ? portfolioUrl.trim() : '',
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message:
        'Your job application has been submitted successfully. Our talent team will evaluate your profile.',
      referenceId: application.referenceId,
    });
  } catch (error) {
    next(error);
  }
};
