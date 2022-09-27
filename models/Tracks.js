const mongoose = require("mongoose");

//*Creo el Schema de las pistas que tengo en mi base de datos de mongodb compass, en este caso dentro de ShymuDB tengo tracks.
const TrackSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a name'],
    },
    url: { type: String },
    thumbnail: { type: String },
    duration: { type: Number },
    userId: { type: String, ref: 'users' },

  },
  { timestamps: true }
);

//*Aqui ponemos el nombre de nuestra base de datos o tabla especifica que tenemos dentro de ShymuDB en este caso "tracks" y luego el Schema que acabamos de crear.
const TrackModel = new mongoose.model('tracks', TrackSchema);

//*Lo exportamos para tener acceso a este modelo fuera de este archivo.
module.exports = TrackModel;
