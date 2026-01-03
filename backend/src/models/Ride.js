import mongoose from "mongoose";

const RideSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    status: { type: String, enum: ["COMPLETED", "CANCELLED", "ONGOING"], default: "ONGOING" },
    completedAt: { type: Date },
    reviewedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Ride", RideSchema);
