import express from 'express';
import {
  getBooks, getBookByID,
  getBooksByGenre, getBooksByTitle,
  addBook, toggleLendStatus, likeBook,
  findNewBook
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/newBooks/:title', findNewBook);
router.get('/title/:title', getBooksByTitle);
router.get('/genre/:genre', getBooksByGenre);
router.put('/:id/like', likeBook);
router.put('/:id/lend', toggleLendStatus);
router.get('/:id', getBookByID);
router.get('/', getBooks);
router.post('/', addBook);

export default router;