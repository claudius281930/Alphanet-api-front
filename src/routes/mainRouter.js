const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.pageHome);
router.get("/name/:name_description", mainController.getBoxByName);// "/name/:name_description" ;
/* ---- Action get a object ---- */
router.get("/box", mainController.getBoxes);
router.get("/fusion", mainController.getFusions);
router.get("/box/:id", mainController.getBoxById);
router.get("/fusion/:id", mainController.getFusionById);

/*router.get("/box/detail/:name_description", mainController.findByLocale); // /detail/:name_description";
router.get("/box/detail/:name_description", mainController.findDetail);// "/locale/:locale";*/

/* ---- Action that will take the route of a specific object ---- */
router.get("/create", mainController.pageFormCreateBox);
router.get("/update", mainController.pageFormUpdateBox);
router.get("/delete", mainController.pageFormDeleteBox);

/* ---- Action for create a object ---- */
router.post("/create/box", mainController.createBox);// mesma rota definida na view no atributo action

/* ---- Action for update a object ---- */
router.put("/:id", mainController.updateBox);

/* ---- Action for delete a object ---- */
router.delete("/box/:id", mainController.deleteBox);// error: currentUrl: 'http://localhost:3000/create//box'

module.exports = router;
