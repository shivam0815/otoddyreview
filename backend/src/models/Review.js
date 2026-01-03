import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    // Optional info (future use)
    
    userId: { type: mongoose.Schema.Types.ObjectId, required: false, index: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, required: false, index: true },

    // Core review
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 600, default: "" },
    tags: [{ type: String }],

    // Metrics
    punctuality: { type: Number, min: 1, max: 5, default: 5 },
    behaviour: { type: Number, min: 1, max: 5, default: 5 },
    driving: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
