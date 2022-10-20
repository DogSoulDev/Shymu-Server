const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const GenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Gender name is required!'],
      trim: true,
    },
    popularity: {
      type: Number,
      required: false,
      default: 0.0,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GenderModel = mongoose.model('gender', GenderSchema);

module.exports = GenderModel;
