const db = require("../models");
const standardization = require("../../utils/standardization");

class GenreAction {
	find() {
		return standardization(db.Genre.find().select({ name: 1, _id: 1 }));
	}
	create(options) {
		return standardization(db.Genre.create(options));
	}
}

module.exports = new GenreAction();
