const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const mainController = require("../controllers/mainController");

router.get("/search", mainController.pageSearch);

/* ---- Action get a object for parameter ---- */
router.get("/box", /*auth,*/ mainController.getBoxes);
router.get("/box/:id", mainController.getBoxById);
router.get("/detail/:name_description", mainController.getDetailBox);
/* ---- Registered users only ---- */
router.get("/create", auth, mainController.pageFormCreateBox);
router.get("/update", auth, mainController.pageFormUpdateBox);
router.get("/delete", auth, mainController.pageFormDeleteBox);
/* ---- Registered users only ---- */
router.post("/create/box", auth, mainController.createBox);
/* ---- Registered users onlyt ---- */
router.put("/:id", auth, mainController.updateBox);
/* ---- Registered users only ---- */
router.delete("/box/:id", auth, mainController.deleteBox);

//Desabilitadas temporariamente -----------------------------;
router.post("/box/name", mainController.getBoxByNameFromBody);
router.post("/box/id", mainController.getBoxById);
router.post("/locale", mainController.getBoxByLocaleFromBody);
//-----------------------------------------------------------;

module.exports = router;
