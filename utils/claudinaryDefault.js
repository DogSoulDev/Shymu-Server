// const DEFAULT_PROFILE_IMAGE = 'Image';
// const DEFAULT_PLAYLIST_THUMBNAIL = 'Link Image';

// module.exports = {
//   DEFAULT_PROFILE_IMAGE: DEFAULT_PROFILE_IMAGE,
//   DEFAULT_PLAYLIST_THUMBNAIL: DEFAULT_PLAYLIST_THUMBNAIL,
// };


//!Como subir fotos al cloudinary
// cloudinary.v2.uploader.upload("Aqui hay que meter el link de la imagen",
//   { public_id: "nombre de la imagen" }, 
//   function(error, result) {console.log(result); });

//!Como modificar una foto de cloudinary en codigo:
// cloudinary.image("turtles.jpg", {width: 70, height: 53, crop: "scale"})