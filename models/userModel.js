const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = Schema(
  {
    firebase_id: {
      type: String,
      required: [true, 'Firebase id not specified!'],
    },
    firstName: {
      type: String,
      trim: true, //!Removes whitespaces.
    },
    lastName: {
      type: String,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);
//*function getTimestampInSeconds () {
//*   return Math.floor(Date.now() / 1000)
//* }

const User = mongoose.model('user', UserSchema);

module.exports = User;
