import mongoose from 'mongoose';
import { User, Book, Contact } from './models.js';
import axios from 'axios';
import 'dotenv/config';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const startSeed = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bloshan")
    console.log('MongoDB connected');
    await seedDatabase();
    await generateRandomBooks();
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }finally{
    mongoose.disconnect();
  }
}
startSeed();
const availableUserIDs = ['6736472090d8a0d1e7b37c9d', '5736472090d8a0d1e7b37c9d', '4736472090d8a0d1e7b37c9d', '3736472090d8a0d1e7b37c9d', '2736472090d8a0d1e7b37c9d',
  '6736472090d8a0d1e7b37c9e', '5736472090d8a0d1e7b37c9e', '4736472090d8a0d1e7b37c9e',
  '3736472090d8a0d1e7b37c9e', '2736472090d8a0d1e7b37c9e', '6736472090d8a0d1e7b37c9e'
];
const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Contact.deleteMany({});
    const users = await User.insertMany(userSeedData);
    const books = await Book.insertMany(bookSeedData);
    const contact = await Contact.insertMany(contactSeedData);
    console.log("seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
const generateRandomBooks = async () => {
  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=*&startIndex=4&maxResults=40&key=${API_KEY}`);
    const { items } = data;
    const batch = []
      for ( const item of items){
      const googleBookId = item.id;
      const { title, publishedDate, description, maturityRating, imageLinks } = item.volumeInfo;
      const authors = item.volumeInfo.authors || ["Unlisted"];
      const categories = item.volumeInfo.categories || ["Unlisted"];
      const newBook = {
        bookID: googleBookId,
        userID: (availableUserIDs[Math.floor(Math.random() * 11)]),
        title,
        author: authors.join('/'),
        description,
        notes: "dummy notes",
        image: imageLinks?.thumbnail || null,
        thumbnail: imageLinks?.thumbnail || null,
        maturityRating,
        borrowerID: null,
        genre: categories?.join('/') || [],
        publish_date: new Date(publishedDate)
      };
      await Book.create(newBook);
    }
  } catch (error) {
    console.log("error getting books", error)
  }

};

const userSeedData = [
  {
    _id: new mongoose.Types.ObjectId('6736472090d8a0d1e7b37c9d'),
    username: "john_doe",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: ['673802a1ba6a2d66786589c7'],
    lending_books: ['673802a1ba6a2d66786589c5', '673802a1ba6a2d66786589c6'],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  }, {
    _id: new mongoose.Types.ObjectId('5736472090d8a0d1e7b37c9d'),
    username: "john_doe2",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  },
  {
    _id: new mongoose.Types.ObjectId('4736472090d8a0d1e7b37c9d'),
    username: "john_doe3",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  }, {
    _id: new mongoose.Types.ObjectId('3736472090d8a0d1e7b37c9d'),
    username: "john_doe4",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  }, {
    _id: new mongoose.Types.ObjectId('2736472090d8a0d1e7b37c9d'),
    username: "john_doe5",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  },
  {
    _id: new mongoose.Types.ObjectId('6736472090d8a0d1e7b37c9e'),
    username: "jane_smith",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: ['673802a1ba6a2d66786589c5', '673802a1ba6a2d66786589c6'],
    lending_books: ['673802a1ba6a2d66786589c7'],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
  {
    _id: new mongoose.Types.ObjectId('5736472090d8a0d1e7b37c9e'),
    username: "jane_smith1",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
  {
    _id: new mongoose.Types.ObjectId('4736472090d8a0d1e7b37c9e'),
    username: "jane_smith2",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
  {
    _id: new mongoose.Types.ObjectId('3736472090d8a0d1e7b37c9e'),
    username: "jane_smith3",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
  {
    _id: new mongoose.Types.ObjectId('2736472090d8a0d1e7b37c9e'),
    username: "jane_smith4",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
  {
    _id: new mongoose.Types.ObjectId('1736472090d8a0d1e7b37c9e'),
    username: "jane_smith5",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [],
    lending_books: [],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  },
];


const bookSeedData = [
  {
    _id: new mongoose.Types.ObjectId('673802a1ba6a2d66786589c5'),
    bookID: '1',
    userID: '6736472090d8a0d1e7b37c9d',
    borrowerID: '6736472090d8a0d1e7b37c9e',
    title: "JavaScript Essentials",
    available: true,
    due_date: null,
    created_date: new Date('2024-11-14'),
    author: "John Doe",
    description: "A beginner's guide to JavaScript",
    notes: "Useful for front-end development",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
    maturityRating: 'NOT_MATURE',
    genre: "Programming",
    publish_date: new Date("2020-01-01"),
    likes: 0
  },
  {
    _id: new mongoose.Types.ObjectId('673802a1ba6a2d66786589c6'),
    bookID: '2',
    userID: '6736472090d8a0d1e7b37c9d',
    borrowerID: '6736472090d8a0d1e7b37c9e',
    title: "Data Structures and Algorithms",
    available: true,
    due_date: null,
    created_date: new Date('2024-11-14'),
    author: "Jane Smith",
    description: "In-depth guide on data structures",
    notes: "For intermediate programmers",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
    maturityRating: 'NOT_MATURE',
    genre: "Computer Science",
    publish_date: new Date("2019-06-15"),
    likes: 0
  },
  {
    _id: new mongoose.Types.ObjectId('673802a1ba6a2d66786589c7'),
    bookID: '3',
    userID: '6736472090d8a0d1e7b37c9e',
    borrowerID: '6736472090d8a0d1e7b37c9d',
    title: "Modern Web Development",
    available: true,
    due_date: null,
    created_date: new Date('2024-11-14'),
    author: "Mike Brown",
    description: "An advanced guide to modern web tools",
    notes: "Covers React, Angular, Vue",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
    maturityRating: 'MATURE',
    genre: "Programming",
    publish_date: new Date("2021-03-10"),
    likes: 0
  }
];


const contactSeedData = [
  {
    date: new Date("2021-03-10"),
    phone: "111-222-3333",
    name: "Charlie",
    email: "charlie@example.com",
    message: "I would like more information about your service."
  },
  {
    date: new Date("2021-03-10"),
    phone: "444-555-6666",
    name: "Diana",
    email: "diana@example.com",
    message: "Can I borrow more than three books at a time?"
  }
];
