//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const multer = require("multer");
const path = require("path");

//CONFIGURACION DE MULTER
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const image_path = path.join(__dirname, "../public/img");
    callback(null, image_path);
  },

  filename: (req, file, callback) => {
    const imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

const path_upload_img = multer({ storage: multerDiskStorage });

//------------------------------------------------------RUTAS--------------------------------------------------------------//

//DETALLE DE PRODUCTOS
router.get("/:id/detalle", mainController.productController.productDetail);

//FORMULARIO DE CREACION DE PRODUCTOS
router.get("/crear", mainController.productController.createProduct);
//utilizacion de multer con el path_upload_img
router.post( "/crear",path_upload_img.single("image"),mainController.productController.createProductPost);

//FORMULARIO DE EDICION DE PRODUCTOS
router.get("/:id/editar", mainController.productController.editProduct);
router.put("/:id/editar",path_upload_img.single("image"),mainController.productController.putProduct);

//ELIMINAR UN PRODUCTO
router.delete("/:id/detalle", mainController.productController.deleteProduct);

router.get("/productList", mainController.productController.productList);

module.exports = router;
