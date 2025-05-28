import express from 'express';

import { createContactDetails } from '../controllers/contactDetailsController.js';

const router = express.Router();
router.post('/create', createContactDetails);
export default router;