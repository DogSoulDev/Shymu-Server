const db = require('../models');
const { TracksRepo } = require('../repositories');
const { cloudinary } = require('../services/cloudinary/index');
const { getPublicId } = require('../services/cloudinary/cloudinaryUtils');

const playbackController = (function () {
  const audio = new Audio();
  return {
    play: function (file) {
      audio.src = file;
      audio.play();
    },
    pause: function () {
      audio.pause();
    },
    stop: function () {
      audio.pause();
      audio.currentTime = 0;
    },
  };
})();
module.exports = {
Audio,
};