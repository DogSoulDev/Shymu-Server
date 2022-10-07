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
      trim: true,
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
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
