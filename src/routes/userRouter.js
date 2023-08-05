const express = require("express");
const router = express.Router();
const multer = require("multer");
const { eUser } = require("../middlewares/logMiddleware");

const userController = require("../controllers/userController");

//Exibe a tela de login. Somente no front-end;
router.get("/login", userController.pageLogin);
//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);
// Exibe a página de Perfil (rota restrita para usuários autenticados).
router.post("/profile", /*eUser,*/ userController.profile);// OBS: é necessaria;

module.exports = router;