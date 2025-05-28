import express from 'express';
import { createWorkExperience } from '../controllers/workExperienceController.js';

const router = express.Router();
router.post('/create', createWorkExperience);

export default router;