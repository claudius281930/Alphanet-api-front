const express = require("express");
const router = express.Router();
const multer = require("multer");

//const check = require("../middlewares/checkMiddleware");
const { eAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

//Exibe a pagina de Perfil;
router.get("/profile", eAdmin, userController.pageProfile);
//Exibe a tela de login. Somente no front-end;
router.get("/login", userController.pageLogin);
//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);

module.exports = router;
