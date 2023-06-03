const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/home", mainController.pageHome);

/* ---- Action get a object for parameter ---- */
router.get("/box", mainController.getBoxes);
router.get("/fusion", mainController.getFusions);
router.get("/box/:id", mainController.getBoxById);
router.get("/fusion/:id", mainController.getFusionById);
router.get("/detail/:name_description", mainController.getDetailBox);
/*router.get("/box/locale/detail/:name_description", mainController.findDetailLocale);// "/locale/:locale";*/

/* ---- Action that will take the route of a specific object ---- */
router.get("/create", mainController.pageFormCreateBox);
router.get("/update", mainController.pageFormUpdateBox);
router.get("/delete", mainController.pageFormDeleteBox);

/* ---- Action for create or FIND a object body page---- */
router.post("/create/box", mainController.createBox);
router.post("/box/name", mainController.getBoxByNameFromBody);
router.post("/box/id", mainController.getBoxById);
router.post("/locale", mainController.getBoxByLocaleFromBody);

/* ---- Action for update a object ---- */
router.put("/:id", mainController.updateBox);

/* ---- Action for delete a object ---- */
router.delete("/box/:id", mainController.deleteBox);

module.exports = router;
