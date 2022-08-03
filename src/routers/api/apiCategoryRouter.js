//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const apiCategoryController = require("../../controllers/api/apiCategoryController");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const {check, validationResult, body} = require("express-validator")


router.get("/category", apiCategoryController.categoryList);
router.get("/categoryProduct", apiCategoryController.categoryProduct);

module.exports = router;