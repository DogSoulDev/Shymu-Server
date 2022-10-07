const Router = require("express").Router();
const StatsRouter = Router();
const { authMiddleware } = require("../middlewares");
const { trackPlaybackController } = require("../controllers");



StatsRouter.get(
  "/tracks/playbacks",
  authMiddleware,
  trackPlaybackController.fetchPlaybacks,
);

StatsRouter.get("/tracks/", authMiddleware, trackPlaybackController.fetchStats);

module.exports = {
  StatsRouter: StatsRouter,
};