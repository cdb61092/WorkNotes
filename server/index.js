import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/auth.js';
import NoteRoutes from './routes/note.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRoutes);
app.use('/note', NoteRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
