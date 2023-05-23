const express = require("express");
const router = express.Router();

const createController = require("../controllers/createController");

//C;
router.get("/",createController.homeFormCreateBox);// mesma rota definida na view no atributo action


module.exports = router;
