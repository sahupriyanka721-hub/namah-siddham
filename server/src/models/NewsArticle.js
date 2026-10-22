import mongoose from 'mongoose';

const NewsArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    category: {
      type: String,
      default: 'Corporate News',
      trim: true,
    },
    author: {
      type: String,
      default: 'Namah Siddham Communications',
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
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

NewsArticleSchema.index({ isPublished: 1, publishedAt: -1 });

export default mongoose.models.NewsArticle || mongoose.model('NewsArticle', NewsArticleSchema);
