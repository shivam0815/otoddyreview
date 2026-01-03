import { z } from "zod";
import Review from "../models/Review.js";

const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(600).optional().default(""),
  punctuality: z.number().min(1).max(5).optional().default(5),
  behaviour: z.number().min(1).max(5).optional().default(5),
  driving: z.number().min(1).max(5).optional().default(5),
});

export async function submitSimpleReview(req, res) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid payload", errors: parsed.error.flatten() });
  }

  try {
    const review = await Review.create(parsed.data);
    return res.json({ ok: true, reviewId: String(review._id) });
  } catch (err) {
    console.error("REVIEW CREATE ERROR:", err);
    // ✅ Mongoose validation / unique / cast errors -> 400 for clarity
    return res.status(400).json({ ok: false, message: err.message });
  }
}


// optional test endpoint
export async function listSimpleReviews(req, res) {
  const rows = await Review.find().sort({ createdAt: -1 }).limit(50);
  return res.json({ ok: true, rows });
}
