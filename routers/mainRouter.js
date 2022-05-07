const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");

router.get("/", mainController.index);

router.get("/carrito", mainController.carrito);

module.exports = router;
