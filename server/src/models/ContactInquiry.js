import mongoose from 'mongoose';

const ContactInquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    serviceRequired: {
      type: String,
      required: [true, 'Service required is mandatory'],
      enum: [
        'Website Development',
        'Software Development',
        'Mobile Application Development',
        'Digital Marketing',
        'Product Partnership',
        'Vendor / Service Partner Registration',
        'Other Business Inquiry',
        'General Corporate Inquiry',
      ],
      default: 'Website Development',
    },
    budgetRange: {
      type: String,
      trim: true,
      default: '',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    preferredContactMethod: {
      type: String,
      enum: ['Email', 'Phone', 'WhatsApp'],
      default: 'Email',
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
      default: true,
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

ContactInquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.ContactInquiry ||
  mongoose.model('ContactInquiry', ContactInquirySchema);
