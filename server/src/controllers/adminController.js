import Platform from '../models/Platform.js';
import ContactInquiry from '../models/ContactInquiry.js';
import PartnerInquiry from '../models/PartnerInquiry.js';
import JobOpening from '../models/JobOpening.js';
import JobApplication from '../models/JobApplication.js';
import NewsArticle from '../models/NewsArticle.js';
import CompanySettings from '../models/CompanySettings.js';
import { getDBStatus } from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalPlatforms,
      publishedPlatforms,
      totalContactInquiries,
      newContactInquiries,
      totalPartnerInquiries,
      newPartnerInquiries,
      activeJobs,
      totalApplications,
      publishedNews,
      recentContacts,
      recentPartners,
    ] = await Promise.all([
      Platform.countDocuments(),
      Platform.countDocuments({ status: 'Published' }),
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ status: 'New' }),
      PartnerInquiry.countDocuments(),
      PartnerInquiry.countDocuments({ status: 'New' }),
      JobOpening.countDocuments({ status: 'Published' }),
      JobApplication.countDocuments(),
      NewsArticle.countDocuments({ isPublished: true }),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(5).select('-internalNotes'),
      PartnerInquiry.find().sort({ createdAt: -1 }).limit(5).select('-internalNotes'),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalPlatforms,
        publishedPlatforms,
        totalContactInquiries,
        newContactInquiries,
        totalPartnerInquiries,
        newPartnerInquiries,
        activeJobs,
        totalApplications,
        publishedNews,
      },
      recentActivity: {
        contacts: recentContacts,
        partners: recentPartners,
      },
      system: {
        databaseStatus: getDBStatus(),
        serverTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanySettings = async (req, res, next) => {
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

export const updateCompanySettings = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // Prevent inadvertent clearing of legal identifiers
    if (!updateData.companyName) updateData.companyName = 'Namah Siddham Corporation Private Limited';
    if (!updateData.cin) updateData.cin = 'U77100MP2026PTC087531';

    let settings = await CompanySettings.findOne();
    if (!settings) {
      settings = new CompanySettings(updateData);
    } else {
      Object.assign(settings, updateData);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Company settings updated successfully.',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
