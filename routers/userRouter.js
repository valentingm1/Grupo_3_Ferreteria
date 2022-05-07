const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");

router.get("/register", mainController.userController.register);

router.get("/login", mainController.userController.login);

module.exports = router;
