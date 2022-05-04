const express = require("express");
const req = require("express/lib/request");
const router = express.Router()
const multer = require("multer")
const path = require("path")
const mainController = require("../controllers/mainController.js")
const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null, "./public/images/products");
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const uploadFile = multer({storage});

router.get('/', mainController.index);

router.get('/register', mainController.register);

router.get('/login', mainController.login);

router.get('/detalle/:id', mainController.productDetail);

router.get('/carrito', mainController.carrito);

router.get('/crearproducto', mainController.createProduct);

router.get('/modificarproducto', mainController.editProduct);

router.get("/products", mainController.products)

module.exports = router