import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = Router();
dotenv.config();

/*
 * @route POST auth/
 * @desc Login user
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter your credentials' });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) throw Error('User does not exist');

    const isAuthenticated = user.authenticateUser(password);
    if (!isAuthenticated) throw Error('Invalid credentials');

    const token = user.generateAuthToken();
    console.log(token);

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send(user);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      res.status(400).json({ msg: e.message });
    }
  }
});

/*
 * @route POST auth/
 * @desc Register user
 * @access Public
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user) throw Error('Username already taken');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

// Verify JWT middleware
export const isAuthorized = (req, res, next) => {
  const token = req.cookies.token;

  //check if token exists
  if (!token) {
    return res.status(401).send('No token found, authorization denied');
  }

  try {
    //verify token
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedJWT: ', decodedJWT);
    req.user = decodedJWT;
    next();
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
};

export default router;
