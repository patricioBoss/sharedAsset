import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema(
  {
    planId: {
      type: Number,
      required: "plan is required",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    capital: {
      type: Number,
      required: "capital is required",
    },
    approvedDate: {
      type: Date,
    },
    withDrawalDate: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "ended"],
      default: "pending",
    },
    daysCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: String,
      required: "stock symbol is needed",
    },
    currency: {
      type: String,
      required: "currency type needed",
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Investment =
  mongoose.models.Investment || mongoose.model("Investment", InvestmentSchema);

export default Investment;
