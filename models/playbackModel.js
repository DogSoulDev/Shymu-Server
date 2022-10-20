// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');

// const PlaybackSchema = new mongoose.Schema(
//   {
//     totalPlaybacks: {
//       type: Number,
//       default: 0,
//     },
//     genresDetails: {
//       type: [
//         {
//           genreId: {
//             type: String,
//             required: [true, 'Genre Id is required!'],
//           },
//           genreName: {
//             type: String,
//             required: false,
//           },
//           counter: {
//             type: Number,
//             default: 0,
//           },
//         },
//       ],
//       default: [],
//     },
//     tracksDetails: {
//       type: [
//         {
//           trackId: {
//             type: Schema.Types.ObjectId,
//             ref: 'track',
//           },
//           totalPlaybacks: {
//             type: Number,
//             default: 0,
//           },
//           playbacks: {
//             type: [
//               {
//                 latitude: {
//                   type: Number,
//                   required: false,
//                 },
//                 longitude: {
//                   type: Number,
//                   required: false,
//                 },
//                 userId: {
//                   type: Schema.Types.ObjectId,
//                   ref: 'user',
//                 },
//                 agent: {
//                   type: String,
//                   trim: true,
//                 },
//                 playbackDate: {
//                   type: Date,
//                   default: Date.now,
//                 },
//               },
//             ],
//             default: [],
//           },
//         },
//       ],
//       default: [],
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// const PlaybackModel = mongoose.model('playback', PlaybackSchema);

// module.exports = PlaybackModel;
