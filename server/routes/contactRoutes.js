import express from 'express';
import { saveNewContact } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', saveNewContact);

export default router;