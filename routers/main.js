const express = require("express");
const req = require("express/lib/request");
const router = express.Router()
const mainController = require("../controllers/mainController.js")

router.get('/', mainController.index);

router.get('/register', mainController.register);

router.get('/login', mainController.login);

router.get('/detalle/:id', mainController.productDetail);

router.get('/carrito', mainController.carrito);

router.get('/submitDetail', mainController.submitDetail);

module.exports = router