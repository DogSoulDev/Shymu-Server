const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TrackSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required!'],
      trim: true,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0.0,
    },
    color: {
      type: String,
      trim: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'genre',
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    artists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    playlists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'playlist',
        },
      ],
      default: [],
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model('tracks', TrackSchema);

module.exports = Track;
