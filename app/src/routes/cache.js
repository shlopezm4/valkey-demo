const express = require("express");
const router = express.Router();
const cacheController = require("../controllers/cache");

// Home page route.
router.get("/get", cacheController.getController);
router.post("/set", cacheController.setController);
router.post("/hSet", cacheController.hSetController);
router.get("/hGet", cacheController.hGetControler);
router.delete("/delete", cacheController.deleteController);

module.exports = router;
