import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    interest: {
      type: Number,
    },
    minDeposit: {
      type: Number,
    },
    maxDeposit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

export default Plan;
