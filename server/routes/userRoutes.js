import express from 'express';
import {User} from '../db/models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500);
  }
});

export default router;
