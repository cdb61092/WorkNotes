import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  note: {
    type: String,
    required: [true, 'Note is required.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  company: {
    type: String | false,
    default: false,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userID: {
    type: ObjectId,
    required: [true, 'userID is required.'],
  },
  clickup: {
    type: String | false,
    default: false,
  },
  tags: [String],
});

export default mongoose.model('Note', NoteSchema);
