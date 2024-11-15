import express from 'express';
import { getBooks,getBookByID,getBooksByGenre,getBooksByTitle,addBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/:id', getBookByID);
router.get('/genre/:genre', getBooksByGenre);
router.get('/title/:title', getBooksByTitle);
router.get('/', getBooks);
router.post('/', addBook);

export default router;