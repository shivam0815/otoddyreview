import { verifyReviewLink } from "../utils/tokens.js";

export function requireReviewLink(req, res, next) {
  try {
    const token = req.query.token;
    const payload = verifyReviewLink(token);
    req.reviewLink = payload;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, message: e.message || "Unauthorized" });
  }
}
