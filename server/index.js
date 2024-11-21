import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const PORT = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/bloshan")
  .then(() =>console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/contact',contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
