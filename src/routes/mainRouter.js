const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

//router.get("/home",mainController.home);

//R;
router.get("/box",mainController.getBoxes);
router.get("/fusion", mainController.getFusions);
router.get("/box/:id",mainController.getBoxById);
router.get("/fusion/:id", mainController.getFusionById);
router.get("/box/name/:name_description",mainController.getBoxByName);
/* ---------------------------------------------------------------------*/
//U;
/*router.update("/box",createController.getBoxUpdate);
router.update("/fusion",createController.getFusionUpdate);
router.update("/color",createController.getColorUpdate);
router.update("/link",createController.getLinkUpdate);*/
/* -------------------------------------------------------------------- */
//D;

module.exports = router;