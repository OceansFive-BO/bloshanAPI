import { Book } from '../db/models.js';
import axios from 'axios';
import 'dotenv/config';
const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};

export const getBookByID = async (req, res) => {
  try {

    const book = await Book.findOne({ bookID: req.param.id }).select('-borrowerID -_id -due_date -userID')
    res.send(book);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooks = async (req, res) => {
  const count = req.query.count || 20;
  const title = req.query.title;
  const genre = req.query.genre;
  let titleRegex = new RegExp(`${title}`, "i")
  let genreRegex = new RegExp(`${genre}`, "i")
  const query = {};
  if(title){
    query.title=titleRegex;
  }
  if(genre){
    query.genre=genreRegex;
  }
  try {
    const books = await Book.find(query).select('-borrowerID -_id -due_date -userID').limit(count)
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooksByGenre = async (req, res) => {
  const genre = req.params.genre;
  const count = 5;
  let regex = new RegExp(`${genre}`, "i")
  try {
    const books = await Book.find({ genre: regex })
      .select('-borrowerID -_id -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooksByTitle = async (req, res) => {
  const title = req.params.title;
  const count = 5;
  let regex = new RegExp(`${title}`, "i")
  try {
    const books = await Book.find({ title: regex })
      .select('-borrowerID -_id -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};
export const addBook  = async (req, res) => {
  /*const googleBookId = req.body.bookID;
  const {notes,userID} = req.body;*/
};
