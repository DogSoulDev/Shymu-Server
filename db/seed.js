//!Revisar como funcionan los Seeds
const mongoose = require('mongoose');
const db = require('../models');

const { getDbTrack } = require('./track');
const { getDbPlaylist } = require('./playlist.js');
const { getDbGenre } = require('./genre');
const { getDbUser } = require('./user');
const { getDbGender } = require('./gender');

async function seedUsers() {
  const results = getDbUser();

  await db.Users.deleteMany({});
  await db.Users.create([...results]);
}

async function seedTracks() {
  const results = await getDbTrack();

  await db.Tracks.deleteMany({});
  await db.Tracks.create([...results]);
}

async function seedPlaylists() {
  const results = await getDbPlaylist();

  await db.Playlists.deleteMany({});
  await db.Playlists.create([...results]);
}

async function seedGenres() {
  const results = getDbGenre();

  await db.Genre.deleteMany({});
  await db.Genre.create([...results]);
}
async function seedGenders() {
  const results = getDbGender();

  await db.Gender.deleteMany({});
  await db.Gender.create([...results]);
}

module.exports = {
  seedTracks,
  seedPlaylists,
  seedGenres,
  seedUsers,
  seedGenders,
};
