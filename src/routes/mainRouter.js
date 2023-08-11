const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.home);

/* ---- Exhibition pages for users ---- */
// OBS: todas as rotas utilizam-se dos dados da Session para liberar a sua respectiva funçãoo;
router.get("/search", mainController.pageSearch);
router.get("/box//create", mainController.pageFormCreateBox);
router.get("/box//update", mainController.pageFormUpdateBox);
router.get("/box//delete", mainController.pageFormDeleteBox);

/* ---- Action get a object ---- */
router.get("/box", mainController.getBoxes);
router.get("/box/:id", mainController.getBoxById);
router.get("/box/name/:name_description", mainController.getBoxByNameBody);
router.get("/box/locale/:locale", mainController.getBoxByLocaleBody);
router.get("/box/net/:networkTechnology", mainController.getBoxByNetworkTechnologyBody);
router.get("/box/detail/:name_description", mainController.getDetailBox);
/* ---- Registered users only ---- */
router.post("/box/create", mainController.createBox);
/* ---- Registered users only ---- */
router.put("/box/update/:id", mainController.updateBox);
/* ---- Registered users only ---- */
router.delete("/box/delete/:id", mainController.deleteBox);

module.exports = router;
