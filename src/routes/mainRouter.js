const express = require("express");
const router = express.Router();
const session = require("express-session");

//const { eAdmin } = require("../middlewares/auth");
const mainController = require("../controllers/mainController");

router.get("/search", mainController.pageSearch);

/* ---- Action get a object for parameter ---- */
router.get("/box", /*eAdmin,*/ mainController.getBoxes);
router.get("/box/:id", mainController.getBoxById);
router.get("/detail/:name_description", mainController.getDetailBox);
/* ---- Registered users only ---- */
router.get("/create", /*eAdmin,*/ mainController.pageFormCreateBox);
router.get("/update", mainController.pageFormUpdateBox);
router.get("/delete", mainController.pageFormDeleteBox);
/* ---- Registered users only ---- */
router.post("/create/box", mainController.createBox);
/* ---- Registered users onlyt ---- */
router.put("/:id", mainController.updateBox);
/* ---- Registered users only ---- */
router.delete("/box/:id", mainController.deleteBox);

//Desabilitadas temporariamente -----------------------------;
router.post("/box/name", mainController.getBoxByNameFromBody);
router.post("/box/id", mainController.getBoxById);
router.post("/locale", mainController.getBoxByLocaleFromBody);
//-----------------------------------------------------------;

module.exports = router;
