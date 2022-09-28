const { UserRepo } = require("../repositories/usersRepository");
const db = require("../models/index");


async function signUp(req, res, next) {
	const { email, _id, provider } = req.user;
	const userName = req.user.userName ? req.user.userName : req.body.userName;
	try {
		const foundUser = await UserRepo.findOne({ email: email });

		if (foundUser.error) {
			return res.status(400).send({ error: "User not found" });
		}

		if (foundUser.data) {
			return res.status(200).send({
				data: {
					_id: foundUser.data._id,
					email: foundUser.data.email,
					userName: foundUser.data.userName,
					auth_provider: provider,
				},
				success: "User logged in successfully!",
			});
		}

		const newUser = await UserRepo.create({
			_id: _id,
			email: email,
			userName: userName,
			profilePicture: profilePicture,
		});

		return res.status(201).send({
			success: "User registered successfully!",
			data: {
				_id: newUser.data._id,
				email: newUser.data.email,
				userName: newUser.data.userName,
				auth_provider: provider,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function signOut(req, res, next) {
	try {
		return res.status(200).send({ success: "User logged out" });
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
			{ new: true },
		);
		if (updatedUser.error) {
			res.status(400).send({ error: "Error please try again!" });
			return;
		}
		if (updatedUser.data) {
			res.status(200).send({
				success: "Updated user successfully!",
				data: {
					email: updatedUser.data.email,
					userName: updatedUser.data.userName,
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
			{ _id: 1, userName: 1, profilePicture: 1 },
		);
		if (user.error) {
			return res.status(400).send({ error: "Error please try again!" });
		}
		if (user.data) {
			return res
				.status(200)
				.send({ success: "User find ok!", data: user.data });
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
			{ _id: 1, userName: 1, profilePicture: 1 },
		);
		if (users.error) {
			return res.status(400).send({ error: "Error please try again!" });
		}
		if (users.data) {
			return res
				.status(200)
				.send({ success: "Users find ok!", data: users.data });
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
		const track = await TrackRepo.find(
			{ userId: userId },
			{ _id: 1, name: 1, thumbnail: 1, genre: 1, likedBy: 1 },
		);
		const likePropTracks = track.data.map((el) => {
			if (el.likedBy.includes(ownId)) {
				return { ...el._doc, likedBy: true };
			}
			return { ...el._doc, likedBy: false };
		});
		if (track.error) {
			return res.status(400).send({ error: "Error loading user tracks!" });
		}
		if (track.data) {
			return res
				.status(200)
				.send({ success: "Loading user tracks ok!", data: likePropTracks });
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
		const track = await PlaylistRepo.find(
			{
				userId: userId,
				publicAccessible: true,
			},
			{ _id: 1, name: 1, thumbnail: 1, followedBy: 1 },
		);
		const followPropTracks = track.data.map((el) => {
			if (el.followedBy.includes(ownId)) {
				return { ...el._doc, followedBy: true };
			}
			return { ...el._doc, followedBy: false };
		});
		if (track.error) {
			return res.status(400).send({ error: "Error loading user playlist!" });
		}
		if (track.data) {
			return res.status(200).send({
				success: "Loading user playlists ok!",
				data: followPropTracks,
			});
		}
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	signUp,
	signOut,
	updateUser,
	getUser,
	getAllUsers,
	getUserTracks,
	getUserPlaylist,
};
