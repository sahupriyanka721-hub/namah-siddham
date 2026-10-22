import CompanySettings from '../models/CompanySettings.js';
import Platform from '../models/Platform.js';
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

export const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find({
      status: { $in: ['Published', 'Coming Soon'] },
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
      status: { $in: ['Published', 'Coming Soon'] },
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
      status: { $in: ['Published', 'Coming Soon'] },
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

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, category, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const referenceId = generateReferenceId('NS-CNT');

    const inquiry = await ContactInquiry.create({
      referenceId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      category: category || 'General Inquiry',
      subject: subject || 'Website Contact Form',
      message: message.trim(),
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Your inquiry has been submitted successfully.',
      referenceId: inquiry.referenceId,
    });
  } catch (error) {
    next(error);
  }
};

export const submitPartnerInquiry = async (req, res, next) => {
  try {
    const {
      name,
      businessName,
      email,
      mobile,
      city,
      state,
      category,
      platform,
      message,
      consent,
    } = req.body;

    // Strict validation
    if (!name || !businessName || !email || !mobile || !city || !state || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'All partnership inquiry fields are required.',
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
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      city: city.trim(),
      state: state.trim(),
      category,
      platform: platform || 'General / Multiple Platforms',
      message: message.trim(),
      consent: Boolean(consent),
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Partnership inquiry received. Our business development team will review and get in touch with you.',
      referenceId: partnerInquiry.referenceId,
    });
  } catch (error) {
    next(error);
  }
};

export const submitJobApplication = async (req, res, next) => {
  try {
    const { jobId, jobTitle, applicantName, email, phone, resumeUrl, coverNote, portfolioUrl } = req.body;

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
      message: 'Your job application has been submitted successfully. Our talent team will evaluate your profile.',
      referenceId: application.referenceId,
    });
  } catch (error) {
    next(error);
  }
};
