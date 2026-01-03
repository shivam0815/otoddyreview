import crypto from "crypto";

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}
function unb64url(input) {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function signReviewLink({ rideId, userId, expMs = 7 * 24 * 60 * 60 * 1000 }) {
  const exp = Date.now() + expMs;
  const payloadObj = { rideId, userId, exp };
  const payload = b64url(JSON.stringify(payloadObj));
  const sig = crypto
    .createHmac("sha256", process.env.REVIEW_LINK_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyReviewLink(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 2) throw new Error("Invalid token format");

  const [payload, sig] = parts;

  const expected = crypto
    .createHmac("sha256", process.env.REVIEW_LINK_SECRET)
    .update(payload)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error("Invalid token signature");
  }

  const parsed = JSON.parse(unb64url(payload));
  if (!parsed?.exp || Date.now() > parsed.exp) throw new Error("Token expired");
  if (!parsed?.rideId || !parsed?.userId) throw new Error("Token missing fields");

  return parsed; // { rideId, userId, exp }
}
