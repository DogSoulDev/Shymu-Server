const mongoose = require("mongoose");
const { verifyEmail } = require("validator");

const UserSchema = new mongoose.Schema(
	{
		_id: { type: String },
		userName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "The email is required."],
			trim: true,
			unique: true,
			validate: {
				validator: (value) => verifyEmail(value),
				message: (props) =>
					`The email ${props.value} is not valid, please try again.`,
			},
		},
		profilePicture: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

const UserModel = new mongoose.model("users", UserSchema);

module.exports = UserModel;
