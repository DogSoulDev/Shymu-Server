//!Testing the router way to call de CRUD operations
// const Router = require('express');


// const express = require('express');
// const router = express.Router();
// const Album = require('../models/album');

// router.get('/', (req, res) => {
//   Album.find({}, (err, albums) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json({ albums });
//   });
// });

// router.get('/:id', (req, res) => {
//   Album.findById(req.params.id, (err, album) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json({ album });
//   });
// });

// router.post('/', (req, res) => {
//   Album.create(req.body, (err, newAlbum) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json({ newAlbum });
//   });
// });

// router.put('/:id', (req, res) => {
//   Album.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedAlbum) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//       }
//       res.status(200).json({ updatedAlbum });
//     }
//   );
// });

// router.delete('/:id', (req, res) => {
//   Album.findByIdAndRemove(req.params.id, (err, deletedAlbum) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json({ deletedAlbum });
//   });
// });

// module.exports = router;
