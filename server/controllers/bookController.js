import { Book, User } from '../db/models.js';
import axios from 'axios';
import mongoose from 'mongoose';
import 'dotenv/config';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const DEFAULT_COUNT = 5;


const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};

const formatRegex = str => str.replaceAll('(', '\(').replaceAll(')', '\)');

export const getBookByID = async (req, res) => {
  if (!req.params.id) {
    return res.send("please include id in route /books/[bookID]");
  }
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
  //console.log(title);


  let titleRegex = new RegExp(`${formatRegex(title)}`, "i");
  let genreRegex = new RegExp(`${formatRegex(genre)}`, "i");
  const query = {};
  if (title) {
    query.title = titleRegex;
  }
  if (genre) {
    query.genre = genreRegex;
  }
  try {
    const books = await Book.find(query).select('-borrowerID -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooksByGenre = async (req, res) => {
  const genre = req.params.genre;
  if (!genre) {
    res.send("Couldn't process request please use route in the format /books/genre/[SearchTerm]");
  }
  const count = DEFAULT_COUNT;
  let regex = new RegExp(`${formatRegex(genre)}`, "i");
  try {
    const books = await Book.find({ genre: regex })
      .select('-borrowerID -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};

export const getBooksByTitle = async (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.send("This route requires a title in the format books/title/[searchTerm]");
  }
  const count = DEFAULT_COUNT;
  let regex = new RegExp(`${formatRegex(title)}`, "i");
  try {
    const books = await Book.find({ title: regex })
      .select('-borrowerID -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};


export const likeBook = async (req, res) => {
  const bookID = req.params.id;
  if (!bookID) {
    return res.send("need valid bookID");
  }
  try {
    const updatedBook = await Book.updateOne(
      { _id: bookID },
      { $inc: { likes: 1 } }
    );
    if (!updatedBook.matchedCount) {
      return res.send("Could not find book to like");
    }
    res.sendStatus(204);
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
    const { title, authors, imageLinks,
      maturityRating, categories, publishedDate } = volumeInfo;

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

export const findNewBook = async (req, res) => {
  const title = req.params.title;
  const count = 15;
  if (!title) {
    return res.send("Finding new books requires a title in the format /books/newBooks/[SearchTerm]");
  }
  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=*+intitle:${title}&startIndex=4&maxResults=${count}&key=${API_KEY}`);
    const { items } = data;
    const batch = [];
    for (const item of items) {
      const googleBookId = item.id;
      const { title, publishedDate, description, maturityRating, imageLinks } = item.volumeInfo;
      const authors = item.volumeInfo.authors || ["Unlisted"];
      const categories = item.volumeInfo.categories || ["Unlisted"];
      const newBook = {
        bookID: googleBookId,
        title,
        author: authors.join('/'),
        description,
        image: imageLinks?.thumbnail || null,
        thumbnail: imageLinks?.thumbnail || null,
        maturityRating,
        genre: categories?.join('/') || [],
        publish_date: new Date(publishedDate)
      };
      batch.push(newBook);
    }
    res.send(batch);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};


export const toggleLendStatus = async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    return res.send("Invalid bookID");
  }
  const ObjectId = mongoose.Types.ObjectId;
  try {
    let book = await Book.findOne({ _id: new ObjectId(_id) });
    if (!book?.userID) {
      return res.send("Cannot find book by ID");
    }
    const { available } = book;
    const lenderID = new ObjectId(book.userID);
    let borrowerID = req.body.userID;
    borrowerID = new ObjectId(borrowerID);
    if (!borrowerID) {
      return res.send("Invalid borrowerID in request body");
    }
    let borrowerQuery = null;
    let lenderQuery = null;
    let bookUpdateQuery = null;
    if (available) {
      borrowerQuery = {
        "$push": { "borrowed_books": _id }
      };
      lenderQuery = {
        "$push": { "lending_books": _id }
      };
      bookUpdateQuery = {
        $set: { available: false, borrowerID },
      };
    } else {
      borrowerQuery = {
        "$pull": { "borrowed_books": _id }
      };
      lenderQuery = {
        "$pull": { "lending_books": _id }
      };
      bookUpdateQuery = {
        $set: { available: true, borrowerID: null },
      };
    }
    await User.updateOne({ _id: lenderID }, lenderQuery);
    await User.updateOne({ _id: borrowerID }, borrowerQuery);
    await Book.updateOne({ _id: _id }, bookUpdateQuery);
    res.sendStatus(204);
  } catch (error) {
    logAndSendStatus(error, res);
  }

};
