import express from 'express';
import { createPersonalDetails } from '../controllers/personalDetailController.js';


const router = express.Router();
router.post('/create', createPersonalDetails);
export default router;