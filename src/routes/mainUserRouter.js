const express = require("express");
const router = express.Router();

const mainUserController = require("../controllers/mainUserController");

router.get("/register", mainUserController.pageResister);
router.get("/login", mainUserController.pageLogin);

module.exports = router;