import express from 'express';
import {
  getUsers, getUserById,
  getBorrowedBooksByUserId, getLentBooksByUserId,
  addUser, getRecommendedBooks
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/borrowed', getBorrowedBooksByUserId);
router.get('/:id/lending', getLentBooksByUserId);
router.get('/:id/recommended', getRecommendedBooks);
router.post('/', addUser);


export default router;