const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			//*trim (string method that is used to remove whitespace characters from the start and end of a string.)
		},
		description: {
			type: String,
			trim: true,
		},
		cover: {
			type: String,
			trim: true,
		},
		userId: {
			type: String,
			trim: true,
			ref: "users",
		},
		//*Revisas tracks
		tracks: [
			{
				trackId: { type: String, ref: "tracks" },
				order: { type: Number, default: 0 },
			},
		],
		followedBy: [{ type: String }],
	},
	{
		timestamps: true,
	},
);

const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = Playlist;
