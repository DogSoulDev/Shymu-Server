const mongoose = require("mongoose");
const { Configuration } = require("../config/config");

function connect() {
	return mongoose.connect(Configuration.development.db.url, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		autoIndex: true,
	});
}

module.exports = connect;
