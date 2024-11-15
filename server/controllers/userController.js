import { User,Book } from '../db/models.js';
const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:')
    logAndSendStatus(error, res);
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select('-password');
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:');
    logAndSendStatus(error, res);
  }
};

export const getBorrowedBooksByUserId = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ _id: req.params.id }).select('-password');
    const borrowedBooks = selectedUser.borrowed_books;
    const books = await Book.find({ bookID: { $in: borrowedBooks } });
    res.send(books);
  } catch (error) {
    console.error('Error fetching users:');
    logAndSendStatus(error, res);
  }
};

export const getLentBooksByUserId = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ _id: req.params.id }).select('-password');
    const lentBooks = selectedUser.lending_books;
    const books = await Book.find({ bookID: { $in: lentBooks } });
    res.send(books);
  } catch (error) {
    console.error('Error fetching users:');
    logAndSendStatus(error, res);
  }
};
