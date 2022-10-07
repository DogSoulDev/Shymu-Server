const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const DefaultSchema = Schema({
  url: {
    type: String,
    required: true,
  },
  httpVerb: {
    type: String,
    required: true,
  },
  totalRequests: {
    type: Number,
    default: 0,
  },
  requests: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
        requestDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const DefaultReq = mongoose.model('default', DefaultSchema);

module.exports = DefaultReq;
