import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      default: 'Globe',
      trim: true,
    },
    coverImage: {
      type: String,
      default: '',
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
    keyFeatures: {
      type: [String],
      default: [],
    },
    problemsSolved: {
      type: [String],
      default: [],
    },
    solutionsProvided: {
      type: [String],
      default: [],
    },
    process: [
      {
        step: { type: Number, default: 1 },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    deliverables: {
      type: [String],
      default: [],
    },
    industriesServed: {
      type: [String],
      default: [],
    },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Hidden'],
      default: 'Published',
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

ServiceSchema.index({ status: 1, displayOrder: 1 });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
