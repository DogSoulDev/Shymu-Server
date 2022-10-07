const mongoose = require('mongoose');
const db = require('../models');

const { getDbTracks } = require('./tracks');
const { getDbPlaylists } = require('./playlists');
const { getDbGenres } = require('./genre');
const { getDbUsers } = require('./users');

async function seedUsers() {
  const results = getDbUsers();

  await db.Users.deleteMany({});
  await db.Users.create([...results]);
}

async function seedTracks() {
  const results = await getDbTracks();

  await db.Tracks.deleteMany({});
  await db.Tracks.create([...results]);
}

async function seedPlaylists() {
  const results = await getDbPlaylists();

  await db.Playlists.deleteMany({});
  await db.Playlists.create([...results]);
}

async function seedGenres() {
  const results = getDbGenres();

  await db.Genre.deleteMany({});
  await db.Genre.create([...results]);
}

module.exports = { seedTracks, seedPlaylists, seedGenres, seedUsers };
