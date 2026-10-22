import mongoose from 'mongoose';

const LeadershipMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    biography: {
      type: String,
      required: [true, 'Biography is required'],
    },
    profileImage: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

LeadershipMemberSchema.index({ isPublished: 1, displayOrder: 1 });

export default mongoose.models.LeadershipMember || mongoose.model('LeadershipMember', LeadershipMemberSchema);
