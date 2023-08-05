const express = require("express");
const router = express.Router();
const session = require("express-session");

const mainController = require("../controllers/mainController");

/*const { eUser } = require("../middlewares/logMiddleware");
const { eAdmin } = require("../middlewares/authMiddleware");*/

router.get("/search", mainController.pageSearch);

/* ---- Action get a object ---- */
router.get("/box",  mainController.getBoxes);
// router.get("/fusion", mainController.findFusion);
// router.get("/color", /*eUser,*/ mainController.findColor);
// router.get("/link", /*eUser,*/ mainController.findLink);
/* ---- Action get a object for parameter ---- */
router.get("/box/:id", mainController.getBoxById);
router.get("/box/name/:name_description", /*eUser,*/ mainController.getBoxByNameBody);
router.get("/box/locale/:locale", mainController.getBoxByLocaleBody);
router.get("/box/net/:networkTechnology", mainController.getBoxByNetworkTechnologyBody);
router.get("/box/detail/:name_description", mainController.getDetailBox);
/* ---- Registered users only ---- */
router.get("/box//create", mainController.pageFormCreateBox);
router.get("/box//update", mainController.pageFormUpdateBox);
router.get("/box//delete", mainController.pageFormDeleteBox);
/* ---- Registered users only ---- */
router.post("/box/create", mainController.createBox);
/* ---- Registered users only ---- */
router.put("/box/update/:id", mainController.updateBox);
/* ---- Registered users only ---- */
router.delete("/box/delete/:id", mainController.deleteBox);

//Desabilitadas temporariamente -----------------------------;
//
// router.post("/box/id", mainController.getBoxById);
// router.post("/box/locale", mainController.getBoxByLocaleFromBody);
//-----------------------------------------------------------;

module.exports = router;
