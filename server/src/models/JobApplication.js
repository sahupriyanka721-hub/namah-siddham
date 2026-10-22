import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      unique: true,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobOpening',
      required: false,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    applicantName: {
      type: String,
      required: [true, 'Applicant name is required'],
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
      required: [true, 'Phone number is required'],
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    coverNote: {
      type: String,
      default: '',
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'],
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

JobApplicationSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
