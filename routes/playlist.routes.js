const PlaylistRouter = require("express").Router();

//!Revisar utils
const { multerAudio, multerImage } = require("../utils/multer");

//!Crear middleware
const { authMiddleware } = require("../middleware");

//*Enruta el Controller
const { playlistController } = require("../controllers");

PlaylistRouter.post(
	"/",
	multerImage.single("cover"),
	playlistController.createPlaylist,
);

PlaylistRouter.get("/", playlistController.getAllPlaylists);
PlaylistRouter.get("/public", playlistController.getPublicPlaylists);
PlaylistRouter.patch("/:id", playlistController.addTrack);
PlaylistRouter.get("/:id", playlistController.getPlaylistById);
PlaylistRouter.put("/:id/follow", playlistController.followPlaylist);
PlaylistRouter.patch(
	"/update/:id",
	multerImage.single("cover"),
	playlistController.updatePlaylist,
);
PlaylistRouter.delete("/:id", playlistController.deletePlaylist);
PlaylistRouter.put("/order/:id", playlistController.orderTracks);

module.exports = PlaylistRouter;
