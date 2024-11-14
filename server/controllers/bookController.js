import { Book } from '../db/models.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().select('-borrowerID -_id -due_date -userID');;
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500);
  }
};