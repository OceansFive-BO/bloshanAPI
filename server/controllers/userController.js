import { User,Book } from '../db/models.js';
import mongoose from 'mongoose'

const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getUserByEmail = async (req, res) => {
  if(!req.params.email) return res.sendStatus(404);
  try {
    let emailRegex = new RegExp(`^${escapeRegExp(req.params.email)}$`,"i");
    const user = await User.findOne({email: emailRegex});
    console.log(user);
    if(!user){
      return res.status(404).send(`User with E-mail ${req.params.email} not found`);
    }
    res.send(user);
  } catch (error) {
    logAndSendStatus(error, res);
  }
}
export const getUserById = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id })
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

export const getTotalBooksByUserId = async (req, res) => {
  try {
    const books = await Book.find({ userID: req.params.id });
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
