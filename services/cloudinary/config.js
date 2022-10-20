const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const { config } = require('../../config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const PROFILE_IMAGE =
  'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644179272/default_images/Image_in_Twitter_Default_Icon_collection_by__%D9%8E_vxcp3q.jpg';
const PLAYLIST_THUMBNAIL =
  'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644103474/default_images/ec321f931c68bdf879039038a0e2dd94_a6ieo0.jpg';

module.exports = {
  PROFILE_IMAGE: PROFILE_IMAGE,
  PLAYLIST_THUMBNAIL: PLAYLIST_THUMBNAIL,
};

const app = express();

cloudinary.config({
  cloud_name: config.server.cloudinary.cloud_name,
  api_key: config.server.cloudinary.api_key,
  api_secret: config.server.cloudinary.api_secret,
  profile_image: config.server.cloudinary.profile_image,
  playlist_thumbnail: config.server.cloudinary.playlist_thumbnail,
});
//*NO TOCAR, SUBIDA DE FOTOS , FUNCIONANDO
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'DEV',
  },
});
app.get('/', async (req, res) => {
  return res.json({ message: 'Success! 🙌' });
});

const upload = multer({ storage });

app.post('/', upload.single('picture'), async (req, res) => {
  return res.json({ picture: req.file.path });
});

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
start(3333);

app.use(express.json());

app.post('/audio/upload', async (req, res) => {
  //! Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split('.').pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });
  //! Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
      cb(null, true);
    } else {
      cb(
        {
          message: 'Unsupported File Format',
        },
        false
      );
    }
  };
  //! Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single('audio');
  //! upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }
    //! SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: config.server.cloudinary.cloud_name,
      api_key: config.server.cloudinary.api_key,
      api_secret: config.server.cloudinary.api_secret,
      profile_image: config.server.cloudinary.profile_image,
      playlist_thumbnail: config.server.cloudinary.playlist_thumbnail,
    });
    const { path } = req.file; //! file becomes available in req at this point
    const fName = req.file.originalname.split('.')[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: 'raw',
        public_id: `AudioUploads/${fName}`,
      },
      //! Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);
        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
});
app.post('/video/upload', async (req, res) => {
  //! Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split('.').pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });
  //! Filter the file to validate if it meets the required video extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(
        {
          message: 'Unsupported File Format',
        },
        false
      );
    }
  };
  //! Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 30 * 1024 * 1024,
    },
    fileFilter,
  }).single('video');
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }
    //! SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: config.server.cloudinary.cloud_name,
      api_key: config.server.cloudinary.api_key,
      api_secret: config.server.cloudinary.api_secret,
      profile_image: config.server.cloudinary.profile_image,
      playlist_thumbnail: config.server.cloudinary.playlist_thumbnail,
    });
    const { path } = req.file; //! file becomes available in req at this point
    const fName = req.file.originalname.split('.')[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: 'video',
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: 'pad',
            audio_codec: 'none',
          },
          {
            width: 160,
            height: 100,
            crop: 'crop',
            gravity: 'south',
            audio_codec: 'none',
          },
        ],
      },
      //! Send cloudinary response or catch error
      (err, video) => {
        if (err) return res.send(err);
        fs.unlinkSync(path);
        return res.send(video);
      }
    );
  });
});

module.exports = { cloudinary };

//*https://cloudinary.com/documentation/node_integration
//* https://dev.to/franciscomendes10866/image-upload-to-cloudinary-with-node-js-523o
