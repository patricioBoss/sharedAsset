import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      default: 'dollars',
    },
    timeZones: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Preference = mongoose.models.Preference || mongoose.model('Preference', PreferenceSchema);

module.exports = Preference;
