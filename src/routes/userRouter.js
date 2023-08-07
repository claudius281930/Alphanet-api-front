const express = require("express");
const router = express.Router();
const multer = require("multer");
const { eUser } = require("../middlewares/logMiddleware");

const userController = require("../controllers/userController");

//Exibe a tela de login;
router.get("/login", userController.pageLogin);
//Exibe a tela de perfil;
//router.get("/profile", /*eUser,*/ userController.pageProfile);

//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);
// Exibe a página de Perfil (rota restrita para usuários autenticados).
router.get("/profile", /*eUser,*/ userController.profile);

module.exports = router;