import express from 'express';
import {
  createRegistration,
  getRegistrationById,
  getAllRegistrations,
} from '../controllers/registrationController.js';
import { registrationRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public registration endpoints
router.post('/', registrationRateLimiter, createRegistration);
router.get('/:registrationId', getRegistrationById);

// Admin / Internal query endpoint (prepared for future auth middleware)
router.get('/', getAllRegistrations);

export default router;
