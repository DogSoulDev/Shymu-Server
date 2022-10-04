//*Lo conecto a express.
const Router = require("express").Router;
//*Importo el Controller.
const { userController } = require("../controllers");
//*Defino Router como la ruta default de User
const UserRouter = Router();

//!Revisar Middleware
const { authMiddleware } = require("../middleware");

//!Revisar utils
const { multerImage } = require("../utils/multer");

UserRouter.post("/sign-up", authMiddleware, userController.signUp);
UserRouter.get("/sign-out", authMiddleware, userController.signOut);
UserRouter.post(
	"/update-avatar",
	multerImage.single("profilePicture"),
	userController.updateAvatar,
);
UserRouter.patch("/update", userController.updateUser);

UserRouter.get("/:id", userController.getUser);
UserRouter.get("/", userController.getAllUsers);

UserRouter.get("/:id/tracks", userController.getUserTracks);
UserRouter.get("/:id/playlist", userController.getUserPlaylist);

module.exports = UserRouter;
