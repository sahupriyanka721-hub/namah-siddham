import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema(
  {
    pageSlug: {
      type: String,
      required: [true, 'Page slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Page title is required'],
      trim: true,
    },
    heroHeadline: {
      type: String,
      default: '',
    },
    heroDescription: {
      type: String,
      default: '',
    },
    sections: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    bodyContent: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Published',
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    lastUpdatedBy: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
