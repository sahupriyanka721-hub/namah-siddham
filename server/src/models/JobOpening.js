import mongoose from 'mongoose';

const JobOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'],
      default: 'Full-time',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, 'Experience requirement is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Published', 'Closed'],
      default: 'Published',
    },
  },
  {
    timestamps: true,
  }
);

JobOpeningSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.JobOpening || mongoose.model('JobOpening', JobOpeningSchema);
