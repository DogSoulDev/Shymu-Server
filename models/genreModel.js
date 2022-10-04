const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			trim: true,
		},
		name: {
			type: String,
			unique: true,
			trim: true,
		},
		popularity: {
			type: Number,
		},
	},
	{ timestamps: true },
);
GenreSchema._id = JSON.stringify(GenreSchema._id); //Reviar esta parte del codigo.
const GenreModel = new mongoose.model("genre", GenreSchema);

module.exports = GenreModel;
