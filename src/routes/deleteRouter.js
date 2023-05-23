const express = require("express");
const router = express.Router();

const deleteController = require("../controllers/deleteController");

// Rota para deleção de objeto igual ao Endpoint
router.delete("/:id", deleteController.deleteBox); // Endpoint(http://localhost:3000/box/:id);

module.exports = router;
