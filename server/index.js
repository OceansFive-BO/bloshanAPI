import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const PORT = 3000;
const app = express();
mongoose.connect("mongodb://localhost:27017/bloshan");

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://Port:${PORT}`);
});