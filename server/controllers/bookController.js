import { Book,User } from '../db/models.js';
import axios from 'axios';
import mongoose from 'mongoose';


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
    const books = await Book.find(query).select('-borrowerID -_id -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooksByGenre = async (req, res) => {
  const genre = req.params.genre;
  const count = 5;
  let regex = new RegExp(`${genre}`, "i");
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
  let regex = new RegExp(`${title}`, "i");
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
    const { volumeInfo, publisher, description } = bookData;
    const { title, authors, imageLinks, maturityRating, categories, publishedDate } = volumeInfo;

    newBook = {
      bookID: googleBookId,
      userID,
      title,
      author: authors.join('/'),
      description,
      notes,
      image: imageLinks.large,
      thumbnail: imageLinks.thumbnail,
      maturityRating,
      borrowerID: null,
      genre: categories.join('/'),
      publish_date: new Date(publishedDate)
    };

    let bookDBEntry = await Book.create(newBook);
    res.sendStatus(201);
  } catch (error) {
    logAndSendStatus(error, res);
  }

};
export const toggleLendStatus = async (req, res) => {
  const  _id  = req.params.id;
  console.log(_id);
  const ObjectId = mongoose.Types.ObjectId;
  try {
    let book = await Book.findOne({ _id: new ObjectId(_id) });
    //console.log(book);
    const { available } = book;
    //console.log("book.available")
    //console.log(book.available)
    const lenderID = book.userID;
    const borrowerID = book.borrowerID || req.body.borrowerID;

    let borrowerQuery = null;
    let lenderQuery = null;
    let bookUpdateQuery = null;
    if (available) {
      borrowerQuery = {
        "$push": { "lending_books": _id }
      };
      lenderQuery = {
        "$push": { "borrowed_books": _id }
      };
      bookUpdateQuery = {
        $set: { available: false,borrowerID:new ObjectId(borrowerID) },
      };
    } else {
      borrowerQuery = {
        "$pull": { "borrowed_books": _id }
      };
      lenderQuery = {
        "$pull": { "lending_books": _id }
      };
      bookUpdateQuery = {
        $set: { available: true,borrowerID:null },
      };
    }
    await User.updateOne({ _id: new ObjectId(lenderID) }, lenderQuery);
    await User.updateOne({ _id: new ObjectId(borrowerID) }, borrowerQuery);
    await Book.updateOne({_id: new ObjectId(_id)},bookUpdateQuery);
    res.send(204);
  }
  catch (error) {
    logAndSendStatus(error, res);
  }

};
