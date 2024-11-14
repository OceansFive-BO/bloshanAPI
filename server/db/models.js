import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  birth_date: { type: Date, required: true },
  photo_url: { type: String },
  borrowed_books: [Number],
  lending_books: [Number],
  preferred_contact: { type: String, enum: ['phone', 'email'], required: true }
});
export const User = mongoose.model('User', UserSchema);

const BookSchema = new mongoose.Schema({
  bookID: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  due_date: { type: Date },
  author: { type: String, required: true },
  description: { type: String },
  notes: { type: String },
  image: { type: String },
  ratings_from_google: { type: Number, min: 0, max: 5 },
  genre: { type: String, required: true },
  publish_date: { type: Date, required: true },
  available: { type: Boolean, default: true },
  likes: { type: Number, default: 0 }
});
export const Book = mongoose.model('Book', BookSchema);

const ContactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
export const Contact = mongoose.model('Contact', ContactSchema);

