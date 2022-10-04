// const mongoose = require("mongoose");

// const playlistSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			trim: true,
// 		},
// 		collaborative: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		description: {
// 			type: String,
// 			trim: true,
// 		},
// 		thumbnail: {
// 			type: String,
// 			trim: true,
// 		},
// 		primaryColor: {
// 			type: String,
// 			trim: true,
// 		},
// 		publicAccessible: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		numberSongs: {
// 			type: Number,
// 			default: 0,
// 		},
// 		followers: {
// 			type: Number,
// 			default: 0,
// 		},
// 		rating: {
// 			type: Number,
// 			default: 1,
// 			maxCount: 5,
// 		},
// 		userId: {
// 			type: String,
// 			trim: true,
// 			ref: "users",
// 		},
// 		tracks: [
// 			{
// 				trackId: { type: String, ref: "tracks" },
// 				order: { type: Number, default: 0 },
// 			},
// 		],
// 		followedBy: [{ type: String }],
// 	},
// 	{
// 		timestamps: true,
// 	},
// );

// const Playlist = mongoose.model("playlist", playlistSchema);

// module.exports = Playlist;
