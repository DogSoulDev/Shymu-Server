const express = require('express');
const router = express.Router();
const Playback = require('../models/playback.model');

//!Other way to use Router, adding Router and not variable name, need to check this too.
router.get('/', (req, res) => {
  Playback.find({}, (err, playbacks) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: 'Unable to get playbacks!',
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ playbacks });
    }
  });
});

router.get('/:id', (req, res) => {
  Playback.findById(req.params.id, (err, playback) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: 'Unable to get playback!',
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ playback });
    }
  });
});

router.post('/', (req, res) => {
  const playback = new Playback(req.body);
  playback.save((err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: 'Unable to add playback!',
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: 'Successfully Added Playback!',
          msgError: false,
        },
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Playback.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: 'Unable to Delete Playback!',
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: 'Successfully Deleted Playback!',
          msgError: false,
        },
      });
    }
  });
});

router.put('/:id', (req, res) => {
  Playback.findOneAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true },
    (err, playback) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: 'Unable to Update Playback!',
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: 'Successfully Updated Playback!',
            msgError: false,
          },
        });
      }
    }
  );
});

module.exports = router;
