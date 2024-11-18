import { User,Book } from '../db/models.js';
import mongoose from 'mongoose'

const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.send(users);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select('-password');
    res.send(users);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBorrowedBooksByUserId = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ _id: req.params.id }).select('-password');
    const borrowedBooks = selectedUser.borrowed_books;
    const books = await Book.find({ _id: { $in: borrowedBooks } });
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getLentBooksByUserId = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ _id: req.params.id }).select('-password');
    const lentBooks = selectedUser.lending_books;
    const books = await Book.find({ _id: { $in: lentBooks } });
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};
export const addUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getRecommendedBooks = async (req, res) => {
  const userID = new mongoose.Types.ObjectId(req.params.id);
  if(!userID){
    return res.send("Invalid User ID");
  }
  const count = 10;
  try {
    const user = await User.findOne({_id:userID});
    const alreadyBorrowed = user.borrowed_books;
    const books = await Book.find({_id:{$in:alreadyBorrowed}})
    books.map(({bookID,genre}) => console.log(bookID + " " + genre))
    let alreadyBorrowedBookID = books.map(({bookID}) => bookID)
    let similarGenres = books.map(({genre}) => genre)
    const defaultRecommended = await Book.find({bookID:{$nin:alreadyBorrowedBookID}}).sort({likes:-1}).limit(count);
    const recommendedBooks = await Book.find({bookID:{$nin:alreadyBorrowedBookID},genre: {$in:similarGenres}}).sort({likes:-1}).limit(count);
    let combineResult = [...recommendedBooks, ...defaultRecommended]
    combineResult = [...new Set(combineResult)].slice(0,count)
    res.send(combineResult);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};
