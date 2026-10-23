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
      default:
        'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
    },
    logoUrl: {
      type: String,
      default: '/assets/namah-siddham-logo.png',
    },
    faviconUrl: {
      type: String,
      default: '/favicon.svg',
    },
    registeredOffice: {
      addressLine1: { type: String, default: 'Bhopal, Madhya Pradesh, India' },
      city: { type: String, default: 'Bhopal' },
      state: { type: String, default: 'Madhya Pradesh' },
      country: { type: String, default: 'India' },
      pincode: { type: String, default: '462001' },
      fullAddress: {
        type: String,
        default: 'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
      },
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
      default: '+91 755 0000000',
      trim: true,
    },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com/company/namahsiddham' },
      twitter: { type: String, default: 'https://twitter.com/namahsiddham' },
      facebook: { type: String, default: 'https://facebook.com/namahsiddham' },
      instagram: { type: String, default: 'https://instagram.com/namahsiddham' },
    },
    footerContent: {
      aboutText: {
        type: String,
        default:
          'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
      },
      copyrightText: {
        type: String,
        default: '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.',
      },
    },
    seoDefaults: {
      metaTitle: {
        type: String,
        default:
          'Namah Siddham Corporation Private Limited — IT Services & Digital Products Ecosystem',
      },
      metaDescription: {
        type: String,
        default:
          'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.',
      },
    },
    mapEmbedUrl: {
      type: String,
      default: '',
    },
    ctaSettings: {
      title: {
        type: String,
        default: 'Have a Digital Idea? Let’s Build It Together.',
      },
      subtitle: {
        type: String,
        default:
          'Connect with our team to discuss software development, mobile applications, digital marketing, or opportunities across our digital platforms.',
      },
      primaryButtonText: {
        type: String,
        default: 'Discuss Your Project',
      },
      primaryButtonLink: {
        type: String,
        default: '/contact',
      },
      secondaryButtonText: {
        type: String,
        default: 'Contact Us',
      },
      secondaryButtonLink: {
        type: String,
        default: '/contact',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CompanySettings ||
  mongoose.model('CompanySettings', CompanySettingsSchema);
