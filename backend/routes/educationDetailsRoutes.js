import express from 'express';
import { createEducationDetails } from '../controllers/educationDetailsController.js';

const router = express.Router();
router.post('/create', createEducationDetails);

export default router;