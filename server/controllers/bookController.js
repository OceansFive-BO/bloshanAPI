import { Book } from '../db/models.js';
import axios from 'axios';
import 'dotenv/config';

//const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
//console.log(API_KEY)

const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};

export const getBookByID = async (req, res) => {
  try {

    const book = await Book.findOne({ _id: req.params.id }).select('-borrowerID -due_date -userID');
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
  if (title) {
    query.title = titleRegex;
  }
  if (genre) {
    query.genre = genreRegex;
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

export const addBook = async (req, res) => {
  const googleBookId = req.body.bookID;
  const userID = req.body.userID;
  const notes = req.body.notes || "";
  let newBook = {};
  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleBookId}`);
    const bookData = data;
    const { volumeInfo, publisher,  description } = bookData;
    const { title, authors, imageLinks, maturityRating, categories,publishedDate } = volumeInfo;
    //console.log(imageLinks);
    //console.log("publishedDate:_________"+publishedDate);
    newBook = {
      bookID: googleBookId,
      userID,
      title,
      author: authors.join('/'),
      description,
      notes,
      image: imageLinks.large,
      thumbnail:imageLinks.thumbnail,
      maturityRating,
      genre: categories.join('/'),
      publish_date: new Date(publishedDate)
    }
    let bookDBEntry = await Book.create(newBook);
    res.sendStatus(201);
  } catch (error) {
    logAndSendStatus(error, res);
  }

};
