const {
  UserAction,
  TrackAction,
  PlaylistAction,
} = require('../db/dbActions/index');
const db = require('../models');

const { cloudinary } = require('../config/cloudinary');

const { DEFAULT_PROFILE_IMAGE } = require('../utils/claudinaryDefault');

async function signUp(req, res, next) {
  const { email, _id, provider } = req.user;
  const userName = req.user.userName ? req.user.userName : req.body.userName;
  const profilePicture = req.body.profilePicture || DEFAULT_PROFILE_IMAGE;
  try {
    const foundUser = await UserRepo.findOne({ email: email });

    if (foundUser.error) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (foundUser.data) {
      return res.status(200).send({
        data: {
          _id: foundUser.data._id,
          email: foundUser.data.email,
          userName: foundUser.data.userName,
          profilePicture: foundUser.data.profilePicture,
          auth_provider: provider,
        },
        success: 'User logged',
      });
    }

    const newUser = await UserRepo.create({
      _id: _id,
      email: email,
      userName: userName,
      profilePicture: profilePicture,
    });

    return res.status(201).send({
      success: 'User registered',
      data: {
        _id: newUser.data._id,
        email: newUser.data.email,
        userName: newUser.data.userName,
        profilePicture: newUser.data.profilePicture,
        auth_provider: provider,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function signOut(req, res, next) {
  try {
    return res.status(200).send({ success: 'User logged out' });
  } catch (err) {
    next(err);
  }
}

async function updateAvatar(req, res, next) {
  const { _id } = req.headers;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const profilePicture = result.secure_url;

    const foundUser = await UserRepo.findOneAndUpdate(
      { _id: _id },
      { profilePicture: profilePicture },
      { new: true }
    );

    if (foundUser.error) {
      return res.status(400).send({ error: 'Error updating avatar' });
    }
    if (foundUser.data) {
      return res.status(200).send({
        success: 'Avatar update succeed',
        data: { profilePicture: foundUser.data.profilePicture },
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  const { _id } = req.headers;

  const { userName, email } = req.body;

  try {
    const updatedUser = await UserRepo.findOneAndUpdate(
      { _id: _id },
      { userName: userName, email: email },
      { new: true }
    );

    if (updatedUser.error) {
      res.status(400).send({ error: 'Error updating your user data' });
      return;
    }
    if (updatedUser.data) {
      res.status(200).send({
        success: 'Your user updated successfully',
        data: {
          email: updatedUser.data.email,
          userName: updatedUser.data.userName,
          profilePicture: updatedUser.data.profilePicture,
        },
      });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const userId = req.params.id;

  try {
    const user = await UserRepo.findOne(
      { _id: userId },
      { _id: 1, userName: 1, profilePicture: 1 }
    );

    if (user.error) {
      return res.status(400).send({ error: 'Error loading user data' });
    }

    if (user.data) {
      return res
        .status(200)
        .send({ success: 'Loading user data succeed', data: user.data });
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await UserRepo.find(
      {},
      { _id: 1, userName: 1, profilePicture: 1 }
    );

    if (users.error) {
      return res.status(400).send({ error: 'Error loading users' });
    }

    if (users.data) {
      return res
        .status(200)
        .send({ success: 'Loading users succeed', data: users.data });
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function getUserTracks(req, res, next) {
  const userId = req.params.id;
  const ownId = req.headers._id;

  try {
    const track = await TrackAction.find(
      { userId: userId },
      { _id: 1, name: 1, thumbnail: 1, genre: 1, likedBy: 1 }
    );

    const likePropTracks = track.data.map((el) => {
      if (el.likedBy.includes(ownId)) {
        return { ...el._doc, likedBy: true };
      }
      return { ...el._doc, likedBy: false };
    });

    if (track.error) {
      return res.status(400).send({ error: 'Error loading user tracks' });
    }

    if (track.data) {
      return res
        .status(200)
        .send({ success: 'Loading user tracks succeed', data: likePropTracks });
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function getUserPlaylist(req, res, next) {
  const userId = req.params.id;
  const ownId = req.headers._id;

  try {
    const track = await PlaylistAction.find(
      {
        userId: userId,
        publicAccessible: true,
      },
      { _id: 1, name: 1, thumbnail: 1, followedBy: 1 }
    );

    const followPropTracks = track.data.map((el) => {
      if (el.followedBy.includes(ownId)) {
        return { ...el._doc, followedBy: true };
      }
      return { ...el._doc, followedBy: false };
    });

    if (track.error) {
      return res.status(400).send({ error: 'Error loading user playlist' });
    }

    if (track.data) {
      return res.status(200).send({
        success: 'Loading user playlists succeed',
        data: followPropTracks,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}
//!Revisar Controller
// module.exports = {
//   signUp,
//   signOut,
//   updateAvatar,
//   updateUser,
//   getUser,
//   getAllUsers,
//   getUserTracks,
//   getUserPlaylist,
// };
