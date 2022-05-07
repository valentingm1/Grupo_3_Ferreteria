const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");

router.get("/:id/detalle", mainController.productController.productDetail);

router.get("/crear", mainController.productController.createProduct);

router.get("/:id/editar", mainController.productController.editProduct);

router.put("/:id/editar", mainController.productController.putProduct);

router.get("/productList", mainController.productController.productList)

module.exports = router;
