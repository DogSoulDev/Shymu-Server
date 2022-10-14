// const Router = require('express');
// const PlaybackRouter = Router();
// const Playback = require('../models/playback.model');

// // !Other way to use PlaybackRouter, adding PlaybackRouter and not variable name, need to check this too.
// // !Revisar este tipo de rutas.

// PlaybackRouter.get('/playback', (req, res) => {
//   Playback.find({}, (err, playbacks) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: 'Unable to get playbacks!',
//           msgError: true,
//         },
//       });
//     } else {
//       res.status(200).json({ playbacks });
//     }
//   });
// });

// PlaybackRouter.get('/:id', (req, res) => {
//   Playback.findById(req.params.id, (err, playback) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: 'Unable to get playback!',
//           msgError: true,
//         },
//       });
//     } else {
//       res.status(200).json({ playback });
//     }
//   });
// });

// PlaybackRouter.post('/', (req, res) => {
//   const playback = new Playback(req.body);
//   playback.save((err) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: 'Unable to add playback!',
//           msgError: true,
//         },
//       });
//     } else {
//       res.status(200).json({
//         message: {
//           msgBody: 'Successfully Added Playback!',
//           msgError: false,
//         },
//       });
//     }
//   });
// });

// PlaybackRouter.delete('/:id', (req, res) => {
//   Playback.findByIdAndDelete(req.params.id, (err) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: 'Unable to Delete Playback!',
//           msgError: true,
//         },
//       });
//     } else {
//       res.status(200).json({
//         message: {
//           msgBody: 'Successfully Deleted Playback!',
//           msgError: false,
//         },
//       });
//     }
//   });
// });

// PlaybackRouter.put('/:id', (req, res) => {
//   Playback.findOneAndUpdate(
//     req.params.id,
//     req.body,
//     { runValidators: true },
//     (err, playback) => {
//       if (err) {
//         res.status(500).json({
//           message: {
//             msgBody: 'Unable to Update Playback!',
//             msgError: true,
//           },
//         });
//       } else {
//         res.status(200).json({
//           message: {
//             msgBody: 'Successfully Updated Playback!',
//             msgError: false,
//           },
//         });
//       }
//     }
//   );
// });

// module.exports = PlaybackRouter;
