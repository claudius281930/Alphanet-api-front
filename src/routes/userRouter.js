const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { eUser } = require(path.join(__dirname,"../middlewares/logMiddleware"));

const userController = require("../controllers/userController");

//Exibe a pagina de Perfil;
router.get("/profile", eUser, userController.pageProfile);
//Exibe a tela de login. Somente no front-end;
router.get("/login", userController.pageLogin);
//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);

module.exports = router;
