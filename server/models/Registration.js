import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian mobile number'],
    },
    college: {
      type: String,
      required: [true, 'College/Institute name is required'],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch/Department is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year of study is required'],
      trim: true,
    },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: [true, 'Registration ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      trim: true,
      index: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event Name is required'],
      trim: true,
    },
    registrationType: {
      type: String,
      enum: ['individual', 'team'],
      required: [true, 'Registration type is required'],
    },

    // Individual Participant fields
    participant: {
      type: participantSchema,
      required: function () {
        return this.registrationType === 'individual';
      },
    },

    // Team / Hackathon fields
    teamName: {
      type: String,
      trim: true,
      required: function () {
        return this.registrationType === 'team';
      },
    },
    teamLeader: {
      type: participantSchema,
      required: function () {
        return this.registrationType === 'team';
      },
    },
    members: {
      type: [participantSchema],
      default: [],
    },

    termsAccepted: {
      type: Boolean,
      required: [true, 'You must accept the terms and guidelines'],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: 'Terms and conditions must be accepted',
      },
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'attended'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for duplicate lookup optimization
registrationSchema.index({ eventId: 1, 'participant.email': 1 });
registrationSchema.index({ eventId: 1, 'teamLeader.email': 1 });
registrationSchema.index({ eventId: 1, 'members.email': 1 });

export const Registration = mongoose.model('Registration', registrationSchema);
