import rateLimit from 'express-rate-limit';

/**
 * Basic rate limiting to prevent spam submissions on registration endpoints
 */
export const registrationRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // limit each IP to 20 registration attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many registration requests from this IP. Please try again after 10 minutes.',
  },
});
