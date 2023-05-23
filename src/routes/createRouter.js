const express = require("express");
const router = express.Router();

const createController = require("../controllers/createController");

//C;
router.post("/box",createController.create);// mesma rota definida na view no atributo action
// router.get("/box",createController.homeFormCreateBox)

module.exports = router;
