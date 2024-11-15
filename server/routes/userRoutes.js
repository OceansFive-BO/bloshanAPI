import express from 'express';
import { getUsers, getUserById, getBorrowedBooksByUserId, getLentBooksByUserId } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/borrowed', getBorrowedBooksByUserId);
router.get('/:id/lent', getLentBooksByUserId);

export default router;