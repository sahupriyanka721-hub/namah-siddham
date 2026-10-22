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
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'General Inquiry',
    },
    subject: {
      type: String,
      trim: true,
      default: 'Corporate Contact Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
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

export default mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', ContactInquirySchema);
