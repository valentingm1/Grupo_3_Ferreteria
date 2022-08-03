//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const apiUserController = require("../../controllers/api/apiUserController");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const {check, validationResult, body} = require("express-validator")


router.get("/users", apiUserController.userList);
router.get("/users/:id", apiUserController.userDetail);

module.exports = router;