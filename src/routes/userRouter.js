const express = require("express");
const router = express.Router();
const multer = require("multer");
const { check } = require("express-validator"); //check or body;

const userController = require("../controllers/userController");

const validations = [
  check("name").isString().notEmpty().withMessage("inválido"),
  check("password").notEmpty().withMessage("inválido"),
];
router.get("/", userController.pageResister);
router.get("/login", userController.pageLogin);

router.post("/create", validations, userController.createRegister); // /register/create

module.exports = router;
