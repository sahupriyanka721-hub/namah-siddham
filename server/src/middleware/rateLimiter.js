import rateLimit from 'express-rate-limit';

// Strict rate limit for admin authentication attempts
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for public inquiry submissions to prevent spam
export const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15, // Limit each IP to 15 inquiries per 10 minutes
  message: {
    success: false,
    message: 'Too many inquiries submitted from this connection. Please wait a few moments before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
