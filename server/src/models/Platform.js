import mongoose from 'mongoose';

const PlatformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Platform name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    detailedDescription: {
      type: String,
      required: [true, 'Detailed description is required'],
    },
    problemSolved: {
      type: String,
      default: '',
    },
    targetAudience: {
      type: String,
      default: '',
    },
    websiteUrl: {
      type: String,
      required: [true, 'Website URL is required'],
      trim: true,
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    useCases: {
      type: [String],
      default: [],
    },
    howItWorks: {
      type: [String],
      default: [],
    },
    partnerOpportunities: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Live', 'Under Development', 'Coming Soon', 'Hidden', 'Draft', 'Published', 'Archived'],
      default: 'Under Development',
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

PlatformSchema.index({ status: 1, displayOrder: 1 });

export default mongoose.models.Platform || mongoose.model('Platform', PlatformSchema);
