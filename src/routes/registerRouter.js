const express = require("express");
const router = express.Router();
const multer = require("multer");
//const { check } = require("express-validator"); //check or body;

const registerController = require("../controllers/registerController");
const validations = require("../middlewares/checkMiddleware");

//Exibe a tela do formulario de registro;
router.get("/register", registerController.pageResister);
//Processa os dados para a criação do registro;
router.post("/register/create", validations, registerController.processRegister); // /register/create
module.exports = router;
