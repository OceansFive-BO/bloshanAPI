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
    console.error('Error fetching user:');
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
    console.error('Error fetching user:');
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
    console.error('Error fetching user: ');
    logAndSendStatus(error, res);
  }
};
export const addUser = async (req, res) => {
  try {
    await User.create(req.body).select('-password');
    res.send(201);
  } catch (error) {
    console.error('Error adding users:');
    logAndSendStatus(error, res);
  }
};

//NEED TO UPDATE ALGO
export const getRecommendedBooks = async (req, res) => {
  const userID = req.params.id;
  if(!userID){
    return res.send("Invalid User ID");
  }
  const count = 10;
  try {
    const user = User.find({_id:userID});
    const books = await Book.find({}).sort({likes:-1})
      .select('-borrowerID -_id -due_date -userID').limit(count);
    res.send(books);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};
