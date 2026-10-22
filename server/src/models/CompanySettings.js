import mongoose from 'mongoose';

const CompanySettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Namah Siddham Corporation Private Limited',
      required: true,
      trim: true,
    },
    companyType: {
      type: String,
      default: 'Private Limited Company',
    },
    cin: {
      type: String,
      default: 'U77100MP2026PTC087531',
      required: true,
      trim: true,
    },
    businessPositioning: {
      type: String,
      default: 'A multi-platform digital business company building and operating specialized online marketplaces and aggregator platforms.',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    faviconUrl: {
      type: String,
      default: '',
    },
    registeredOffice: {
      addressLine1: { type: String, default: 'Madhya Pradesh, India' },
      city: { type: String, default: 'Indore' },
      state: { type: String, default: 'Madhya Pradesh' },
      country: { type: String, default: 'India' },
      pincode: { type: String, default: '452001' },
      fullAddress: { type: String, default: 'Registered Office: Madhya Pradesh, India. CIN: U77100MP2026PTC087531' },
    },
    officialEmail: {
      type: String,
      default: 'contact@namahsiddham.com',
      trim: true,
    },
    grievanceEmail: {
      type: String,
      default: 'grievance@namahsiddham.com',
      trim: true,
    },
    officialPhone: {
      type: String,
      default: '+91 731 0000000',
      trim: true,
    },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com/company/namahsiddham' },
      twitter: { type: String, default: 'https://twitter.com/namahsiddham' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    footerContent: {
      aboutText: {
        type: String,
        default: 'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
      },
      copyrightText: {
        type: String,
        default: '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.',
      },
    },
    seoDefaults: {
      metaTitle: {
        type: String,
        default: 'Namah Siddham Corporation Private Limited — Multi-Platform Digital Aggregator',
      },
      metaDescription: {
        type: String,
        default: 'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
      },
    },
    mapEmbedUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CompanySettings || mongoose.model('CompanySettings', CompanySettingsSchema);
