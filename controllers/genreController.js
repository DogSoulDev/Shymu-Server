// const { GenreRepo } = require("../repositories");

async function getGenres(req, res, next) {
	try {
		const genres = await GenreRepo.find();

		if (genres.error)
			return res.status(400).send({ error: "Error loading genres" });

		if (genres.data) {
			return res
				.status(200)
				.send({ success: "Genres loaded", data: genres.data });
		}

		next();
	} catch (err) {
		next(err);
	}
}

async function createGenre(req, res, next) {
	try {
		const newGenre = await GenreRepo.create({
			_id: req.body._id,
			name: req.body.genre,
		});
		if (newGenre.error)
			return res.status(400).send({ error: "Error creating genre" });

		if (newGenre.data) {
			return res.status(200).send({ success: "Genres loaded" });
		}

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = { getGenres, createGenre };
