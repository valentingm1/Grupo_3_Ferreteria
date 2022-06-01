const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");

router.get("/register", mainController.userController.register);
router.post("/register", mainController.userController.createUsers);

router.get("/login", mainController.userController.login);
router.post("/login", mainController.userController.veriLogin);

module.exports = router;
