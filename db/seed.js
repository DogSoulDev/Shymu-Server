// const mongoose = require("mongoose");
// const db = require("../models");

// const { getBaseTracks } = require("./tracks");
// const { getBasePlaylists } = require("./playlists");
// const { getBaseGenres } = require("./genre");
// const { getBaseUsers } = require("./users");

// async function seedUsers() {
// 	const results = getBaseUsers();

// 	await db.User.deleteMany({});
// 	await db.User.create([...results]);
// }

// async function seedTracks() {
// 	const results = await getBaseTracks();

// 	await db.Track.deleteMany({});
// 	await db.Track.create([...results]);
// }

// async function seedPlaylist() {
// 	const results = await getBasePlaylists();

// 	await db.Playlist.deleteMany({});
// 	await db.Playlist.create([...results]);
// }

// async function seedGenres() {
// 	const results = getBaseGenres();

// 	await db.Genre.deleteMany({});
// 	await db.Genre.create([...results]);
// }

// module.exports = { seedTracks, seedPlaylist, seedGenres, seedUsers };
