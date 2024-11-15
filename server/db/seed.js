import mongoose from 'mongoose';
import { User, Book, Contact } from './models.js';

mongoose.connect("mongodb://localhost:27017/bloshan")
.then(() => {
  console.log('MongoDB connected');
  seedDatabase();
})
.catch(err => console.error('MongoDB connection error:', err))

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
  } finally {
    mongoose.disconnect();
  }
};


const userSeedData = [
  {
    username: "john_doe",
    password: "hashedpassword1",
    firstname: "John",
    lastname: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Main St, Hometown",
    birth_date: new Date('1970-11-14'),
    borrowed_books: [3],
    lending_books: [1,2],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "email"
  },
  {
    username: "jane_smith",
    password: "hashedpassword2",
    firstname: "Jane",
    lastname: "Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Metropolis",
    birth_date: new Date('2000-11-14'),
    borrowed_books: [1,2],
    lending_books: [3],
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIdr7HcfjPdwSAGPtaGRxlaM7d-PaAJdX9Q&s",
    preferred_contact: "phone"
  }
];


const bookSeedData = [
  {
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
    ratings: 4.5,
    genre: "Programming",
    publish_date: new Date("2020-01-01"),
    likes: 0
  },
  {
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
    ratings: 4.8,
    genre: "Computer Science",
    publish_date: new Date("2019-06-15"),
    likes: 0
  },
  {
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
    ratings: 4.7,
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

