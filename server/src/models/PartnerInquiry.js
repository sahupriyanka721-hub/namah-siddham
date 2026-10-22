import mongoose from 'mongoose';

const PartnerInquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Partnership category is required'],
      enum: [
        'Home Service Professionals',
        'Car Owners and Rental Partners',
        'E-commerce Vendors',
        'Product Sellers',
        'Strategic Business Partners',
        'Corporate Collaboration',
        'Other Business Inquiries',
      ],
    },
    platform: {
      type: String,
      default: 'General / Multiple Platforms',
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Inquiry message is required'],
      trim: true,
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required to proceed'],
      default: false,
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Contacted', 'Resolved', 'Closed'],
      default: 'New',
    },
    internalNotes: [
      {
        note: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

PartnerInquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.PartnerInquiry || mongoose.model('PartnerInquiry', PartnerInquirySchema);
