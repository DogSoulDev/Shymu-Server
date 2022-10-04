const mongoose = require('mongoose');
const db = require('../models');

async function getBasePlaylists() {
  let userId = await db.User.find({}, { _id: 1 }).lean();
  let trackId = await db.Track.find({}, { _id: 1 }).lean();

  let tracks = [];

  // slice tracks in five arrays
  for (let i = 0; i < trackId.length; i++) {
    if (i % 10 === 0) {
      tracks.push(trackId.slice(i, i + 10));
    }
  }

  // take only the id of the tracks
  const tracksIds = tracks.map((track) => track.map((t) => t._id));

  // divide the tracks in five arrays and return in strings
  let playlist1 = tracksIds.slice(0, 1);
  let playlist2 = tracksIds.slice(1, 2);
  let playlist3 = tracksIds.slice(2, 3);
  let playlist4 = tracksIds.slice(3, 4);
  let playlist5 = tracksIds.slice(4, 5);
  let playlist6 = tracksIds.slice(5, 6);
  let playlist7 = tracksIds.slice(6, 7);
  let playlist8 = tracksIds.slice(7, 8);
  let playlist9 = tracksIds.slice(8, 9);
  let playlist10 = tracksIds.slice(9, 10);

  const order = 0;

  return [
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Road trip! All the masters I need!',
      // return a list of tracks in an object and its order in a separate object
      tracks: playlist1[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644625060/tracks-thumbnails-dev/car_yx6ld1.jpg',
      collaborative: false,
      description:
        'Get your mic on with this beats. You are going to sing all the way down',
      publicAccessible: true,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Motorcycle Mama!',
      tracks: playlist2[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644625058/tracks-thumbnails-dev/driving_g56eyw.jpg',
      collaborative: false,
      description: 'Take it easy on the wheels with this hits',
      publicAccessible: true,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Chillout with the beats',
      tracks: playlist3[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644625056/tracks-thumbnails-dev/relax_coqdlx.jpg',
      collaborative: false,
      description:
        'Stressed? Don´t worry the final project will soon be over. Relax in the meantime with this hits.',
      publicAccessible: true,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Boogie with the beats',
      tracks: playlist4[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644625049/tracks-thumbnails-dev/boogie_rcl1zd.jpg',
      collaborative: false,
      description:
        'Take the dance floor and try to get your groove on with this beats',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Smile. You are beautiful',
      tracks: playlist5[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644624690/tracks-thumbnails-dev/smile_kpfzj8.jpg',
      collaborative: false,
      description: 'For those times when you are feeling down.',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Staying home',
      tracks: playlist6[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644626587/tracks-thumbnails-dev/brennan-ehrhardt-HALe2SmkWAI-unsplash_c1yhnz.jpg',
      collaborative: false,
      description: 'Feeling homey. Let´s keep it warm.',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Space hits!',
      tracks: playlist7[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644626067/tracks-thumbnails-dev/fly_hx4xyp.jpg',
      collaborative: false,
      description:
        'Have no money for a space trip but you can have a space hit!',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Hits for the weekend',
      tracks: playlist8[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644626096/tracks-thumbnails-dev/hits_nuk3qf.webp',
      collaborative: false,
      description: 'Have no plans but will be happy to hear you are happy.',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Party time',
      tracks: playlist9[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644626587/tracks-thumbnails-dev/amy-shamblen-lJt-3NUFng4-unsplash_z4icus.jpg',
      collaborative: false,
      description: 'Have you finished your master project? Let´s party!',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
    {
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      name: 'Glitter',
      tracks: playlist10[0].map((track) => ({ trackId: track, order: order })),
      followedBy: userId,
      isFollowed: true,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644627361/tracks-thumbnails-dev/glitter_ru5qsp.jpg',
      collaborative: false,
      description: 'Let´s get glittering.',
      publicAccessible: false,
      primaryColor: '#fbdc00',
    },
  ];
}

module.exports = { getBasePlaylists };
