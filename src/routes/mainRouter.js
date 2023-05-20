const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/box",mainController.getBoxes);
/*router.get("/box",mainController.getBoxes);
router.get("/box/create",mainController.postBox);
router.get("/box/update",mainController.updateBox);
router.get("/box/:id",mainController.deleteBox);*/

module.exports = router;