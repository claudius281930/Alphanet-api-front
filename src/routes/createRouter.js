const express = require("express");
const router = express.Router();

const createController = require("../controllers/createController");

//C;
router.post("/create",createController.create);
/*router.post("/fusion",createController.createBox);
router.post("/color",createController.createBox);
router.post("/link",createController.createBox);*/
/* --------------------------------------------------------------------- */

//R;
router.get("/create",createController.homeFormCreateBox);

module.exports = router;