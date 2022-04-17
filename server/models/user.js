import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username cannot be blank'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
  },
});

UserSchema.methods = {
  _hashPassword(password) {
    return bcrypt.hash(password);
  },
  authenticateUser(password) {
    return bcrypt.compare(password, this.password);
  },
  generateAuthToken() {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );
    return token;
  },
};

export default mongoose.model('User', UserSchema);
