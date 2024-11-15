import express from 'express';
import { getBooks,getBookByID,getBooksByGenre,getBooksByTitle } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookByID);
router.get('/genre/:genre', getBooksByGenre);
router.get('/title/:title', getBooksByTitle);
//router.get('/', getBooksByID);

export default router;