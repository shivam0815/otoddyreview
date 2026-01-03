import { Router } from "express";
import { submitSimpleReview, listSimpleReviews } from "../controllers/review.controller.js";

const router = Router();

router.post("/submit", submitSimpleReview);
router.get("/list", listSimpleReviews); // optional (test/admin)

export default router;
