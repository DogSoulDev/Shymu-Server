const multer = require('multer');

const multerImage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      cb(new Error('File is not suported!'), false);
      return;
    }

    cb(null, true);
  },
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const multerAudio = multer({ storage });

module.exports = { multerImage, multerAudio };