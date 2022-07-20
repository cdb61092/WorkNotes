import { Router } from 'express';
import Note from '../models/notes.js';
import { isAuthorized } from './auth.js';
import mongoose from 'mongoose';

const router = Router();

/*
 * @route POST notes/
 * @desc Create note
 * @access Public
 */
router.post('/create', isAuthorized, async (req, res) => {
  const { note } = req.body;
  const { _id: userID } = req.user;
  // const { title, company, description, note, tags } = req.body;
  try {
    const newNote = new Note({
      ...note,
      userID,
    });

    const savedNote = await newNote.save();

    res.status(200).send(savedNote);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

/*
 * @route GET notes/
 * @desc Get notes
 * @access Public
 */
router.get('/getNotes', isAuthorized, (req, res) => {
  const { _id: userID } = req.user;

  Note.find({ userID: userID }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.put('/updateNote', isAuthorized, async (req, res) => {
  const { note } = req.body;
  const { _id: userID } = req.user;
  const filter = { _id: note._id };

  Note.findOneAndReplace(filter, { ...note, userID }, null, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

/*
 * @route POST notes/
 * @desc Get notes
 * @access Public
 */
router.post('/deleteNote', isAuthorized, async (req, res) => {
  const { _id } = req.body;
  Note.deleteOne({ _id: _id }, null, (err) => {
    if (err) {
      res.status(500).send('Unable to delete document.');
    } else {
      res.status(200).send('Document deleted.');
    }
  });
});

/*
 * @route GET noteSchema/
 * @desc Get note schema
 * @access Public
 */
router.get('/schema', isAuthorized, async (req, res) => {
  const discardKeys = ['_id', 'userID', 'createdAt'];
  Note.findOne({}, (err, result) => {
    const keys = Object.keys(result._doc).filter(
      (value) => !discardKeys.includes(value)
    );
    if (err) {
      res.status(500).send('Error occured, unable to get schema keys');
    } else {
      res.status(200).send(keys);
    }
  });
});

export default router;
