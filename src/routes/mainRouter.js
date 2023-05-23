const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

//R;
router.get("/",mainController.home);
router.get("/box",mainController.getBoxes);
router.get("/fusion", mainController.getFusions);
router.get("/box/:id",mainController.getBoxById);
router.get("/fusion/:id", mainController.getFusionById);
router.get("/box/name/:name_description",mainController.getBoxByName);

module.exports = router;