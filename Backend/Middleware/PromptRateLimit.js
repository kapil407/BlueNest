import rateLimit from "express-rate-limit";

const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, // 5 requests per minute
});
export default aiLimiter;