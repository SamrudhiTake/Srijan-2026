import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Event slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Event short code is required (e.g. HACK, PCB)'],
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      required: [true, 'Event category is required'],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    fullDescription: {
      type: String,
    },
    registrationType: {
      type: String,
      enum: ['individual', 'team'],
      default: 'individual',
      required: true,
    },
    minTeamSize: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxTeamSize: {
      type: Number,
      default: 1,
      min: 1,
    },
    registrationOpen: {
      type: Boolean,
      default: true,
    },
    registrationDeadline: {
      type: Date,
    },
    brochure: {
      type: String,
    },
    icon: {
      type: String,
      default: 'Sparkles',
    },
    venue: {
      type: String,
      default: 'To be announced',
    },
    date: {
      type: String,
      default: 'To be announced',
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
