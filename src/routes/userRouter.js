const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controllers/userController");

//Exibe a tela de login;
router.get("/login", userController.pageLogin);
//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);

module.exports = router;
