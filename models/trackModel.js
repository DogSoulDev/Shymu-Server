const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
	{
		_id: { type: String },
		name: {
			type: String,
			trim: true,
			required: [true, "Name Required"],
		},
		rating: { type: Number },
		url: { type: String },
		thumbnail: { type: String },
		duration: { type: Number },
		userId: { type: String, ref: "users" },
		genre: { type: mongoose.Schema.Types.String, ref: "genre" },
	},
	{ timestamps: true },
);

const TrackModel = new mongoose.model("tracks", TrackSchema);

module.exports = TrackModel;
