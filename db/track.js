const db = require('../models');
const mongoose = require('mongoose');

async function getDbTrack() {
  let userId = await db.User.find({}, { _id: 1 }).lean();
  let genreId = await db.Genre.find({}, { _id: 1 }).lean();
  return [
    {
      name: 'Better of alone',
      // artist: "RXBYN",
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Rxbyn_-_better_off_alone_fvhwp8.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '20',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Alone',
      // artist: "Color Out",
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583929/tracks-dev/Color_Out_-_Alone_aw3gmk.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/alone_rfib7a.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '21',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Mahidevran - Maze of sorrow',
      // artist: "MAHIDEVRAN ROCK BAND",
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583928/tracks-dev/Mahidevran_Rock_Band_-_Mahidevran_-_Maze_of_sorrow_ips3zs.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/Maze_of_sorrow_r1crlr.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '22',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Aurora',
      // artist: 'Smoking with poets',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583928/tracks-dev/Smoking_With_Poets_-_to__Aurora_t2qnaw.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/aurora_omys8y.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '8',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Sensitive',
      // artist: 'Infraction',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583922/tracks-dev/Infraction_-_Sensitive_vsu6qr.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583756/tracks-thumbnails-dev/Sensitive_unevif.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '3',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Tantalizing Youth',
      artist: 'Social Square',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Social_Square_-_Tantalizing_Youth_eykq87.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/Tantalizing_Youth_bfshzo.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '2',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Igor Pumphonia - Point Of Light',
      artist: 'Igor Pumphonia',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644584871/tracks-dev/Igor_Pumphonia_-_Igor_Pumphonia_-_Point_Of_Light_kjgbyz.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644584802/tracks-thumbnails-dev/Igor_Pumphonia_-_Point_Of_Light_urg7nn.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '12',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Marsupial',
      artist: 'Laurence Danova',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644584996/tracks-dev/Laurence_DaNova_-_Marsupial_1_bxvpkj.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644585151/tracks-thumbnails-dev/Lurence_Danova_oeew0j.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '8',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Chasing Tomorrow (feat. Jade Gritty)',
      artist: 'TAB',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644585238/tracks-dev/Tab_-_Chasing_Tomorrow__feat._Jade_Gritty__leh4r1.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644585210/tracks-thumbnails-dev/TAB_fxakq3.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '12',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Healin My Blues',
      artist: 'BJ Wilbanks',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644427496/tracks-thumbnails/thumbnail-1644427496210_qqpy4a.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644523019/tracks/track-1644523017728_qb6wq4.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '4',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Head Over Heels (Friend Group Remix)',
      artist: 'The Devil Music Co.',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644585554/tracks-dev/The_Devil_Music_Co._-_Head_Over_Heels__Friend_Group_Remix__buotnt.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644585551/tracks-thumbnails-dev/Head_Over_Heels_Friend_Group_Remix_c9uatt.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '21',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Under Water',
      artist: 'THE.MADPIX.PROJECT',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586422/tracks-dev/The.madpix.project_-_Under_Water_2_gyvrkl.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586423/tracks-thumbnails-dev/Under_Water_yoirsy.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '12',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Better',
      // artist: "A8",
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586627/tracks-dev/A8_MUSIC_PRODUCTIONS_-_Better_umwfkh.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586622/tracks-thumbnails-dev/A8_vxgyaf.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '3',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'My Love',
      // artist: 'Modus',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586724/tracks-dev/MODUS_-_My_Love_z7tzk1.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586719/tracks-thumbnails-dev/My_love_wqjuiz.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '3',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Bebe go',
      // artist: 'P Steve Officiel',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586823/tracks-dev/P_Steve_Officiel_-_Bebe_go_r0hlbl.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586816/tracks-thumbnails-dev/bebe_go_zdfn6e.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '23',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Reflections (feat. Mathias Hagen)',
      // artist: 'KEVIN S.',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587062/tracks-dev/Kevin_S._-_Reflections__feat._Mathias_Hagen__lypkgw.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587058/tracks-thumbnails-dev/Reflections_qvdzan.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '24',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Un Ratito Nama (Prod: Duran The Coach)',
      // artist: 'Igor Pumphonia',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587219/tracks-dev/Lessky_-_Un_Ratito_Nama__Prod__Duran_The_Coach__npuws5.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587222/tracks-thumbnails-dev/Un_ratito_m2aeq0.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '23',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Sax Is My Cardio',
      // artist: 'KUZINMUZIN',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587961/tracks-dev/Kuzinmuzin_-_Sax_Is_My_Cardio_fqmvwb.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587960/tracks-thumbnails-dev/Sax_kgjfn8.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '5',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Chill Lofi Hip Hop Type Beat',
      // artist: 'PERYCREEP',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644653754/tracks-dev/PeryCreep_-_Chill_Lofi_Hip_Hop_Type_Beat_l2k8zv.mp3',
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644653692/tracks-thumbnails-dev/Chill_Lofi_Hip_Hop_Type_Beat_ltpm24.jpg',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '25',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Monday 8am',
      // artist: 'KINEMATIC',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644602996/tracks-thumbnails-dev/Monday_8am_amfdta.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644602494/tracks-dev/D_JAY_KOI_-_We_got_the_vibes___Feat_Fil_Straughan__uz9qw7.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '6',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Boys, Girls, Toys & Words',
      // artist: 'MODERN PITCH',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644603153/tracks-thumbnails-dev/Boys_girls_toys_words_sxudby.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644603048/tracks-dev/Kinematic_-_Monday_8am_wpdupt.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '3',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'HOUSE PARTY .(Feat Fil Straughan )',
      // artist: 'D JAY KOI',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644603313/tracks-thumbnails-dev/House_Party_iioyto.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644603319/tracks-dev/D_JAY_KOI_-_HOUSE_PARTY_._Feat_Fil_Straughan___moxvuy.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '25',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Healin My Blues',
      // artist: 'BJ Wilbanks',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644427496/tracks-thumbnails/thumbnail-1644427496210_qqpy4a.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644523019/tracks/track-1644523017728_qb6wq4.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '4',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Acidpowder',
      // artist: 'MAJED SALIH',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644611581/tracks-thumbnails-dev/acidpowder_mooqjz.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644611594/tracks-dev/Majed_Salih_-_Acidpowder_qpcwo0.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '12',
      likedBy: userId.map((user) => user._id),
    },
    {
      name: 'Talk it Out',
      // artist: 'SAMIE BOWER',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      thumbnail:
        'https://res.cloudinary.com/dmkdsujzh/image/upload/v1644611776/tracks-thumbnails-dev/Talk_it_Out_iqui41.jpg',
      url: 'https://res.cloudinary.com/dmkdsujzh/video/upload/v1644611776/tracks-dev/Samie_Bower_-_Talk_It_Out_ekqoyc.mp3',
      userId: userId[Math.ceil(Math.random() * userId.length) - 1]._id,
      genre: '4',
      likedBy: userId.map((user) => user._id),
    },
  ];
}

module.exports = { getDbTrack };
