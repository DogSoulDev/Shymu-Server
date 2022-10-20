const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  _id: { type: String },
  userName: {
    type: String,
    trim: true,
  },
  firebase_id: {
    type: String,
    required: [true, 'Firebase id not specified!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    trim: true,
    unique: true,
    validate: {
      //*we use "validator" dependencie to make it faster.
      validator: (value) => isEmail(value),
      message: (props) => `The email ${props.value} is not valid!`,
    },
  },
  profilePicture: {
    type: String,
    ref: 'user',
    trim: true,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'gender',
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'genre',
  },
});
//*function getTimestampInSeconds () {
//*   return Math.floor(Date.now() / 1000)
//* }

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
