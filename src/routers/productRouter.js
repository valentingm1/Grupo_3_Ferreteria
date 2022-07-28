//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const {check, validationResult, oneOf, body} = require("express-validator")

//CONFIGURACION DE MULTER
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const image_path = path.join(__dirname, "../../public/img/products");
    callback(null, image_path);
  },
  filename: (req, file, callback) => {
    const imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

const path_upload_img = multer({ storage: multerDiskStorage });

//------------------------------------------------------RUTAS--------------------------------------------------------------//

//DETALLE DE PRODUCTOS BASE SQL
router.get("/:id/detalle", mainController.productController.productDetail);

//FORMULARIO DE CREACION DE PRODUCTOS BASE SQL
router.get("/crear", mainController.productController.createProduct);
//utilizacion de multer con el path_upload_img BASE SQL
router.post( "/crear",path_upload_img.single("image"),
[
  check("name", "El campo no puede estar vacio")
  .exists(),
  check("discount", "El descuento no puede ser igual o menor a 0")
  .isNumeric({min: 1, max:99}),
  check("stock", "El stock no puede ser igual o menor a 0")
  .exists().isNumeric({min: 1}),
  check("price", "El precio no puede ser igual o menor a 0")
  .exists().isNumeric({min: 1}),
  check("description", "La descripcion no puede estar vacía")
  .exists(),
  check("colores", "El campo no puede estar vacío")
  .exists(),
  /* check("categorias","Debes elegir al menos una")
  .exists(["Repuestos","Martillos","Construccion","Hogar","Electrica","Herramientas"]) */
  body("image").custom((value, {req}) => {
    let file = req.file
    let extensiones = [".jpg", ".jpeg", ".png", ".gif"]
    let fileExtension = path.extname(file.originalname)
      if(!file){
        throw new Error("Debes subir una imagen")
      }
      if(!extensiones.includes(fileExtension)){
        throw new Error("Las extensiones permitidas son .png, .jpg y .gif")
      }
   }
 )
  
],
mainController.productController.createProductPost);

//FORMULARIO DE EDICION DE PRODUCTOS BASE SQL
router.get("/:id/editar", mainController.productController.editProduct);
router.put("/:id/editar",path_upload_img.single("image"),[
  check("name", "El campo no puede estar vacio")
  .exists(),
  check("discount", "El descuento no puede ser igual o menor a 0")
  .isNumeric({min: 1, max:99}),
  check("stock", "El stock no puede ser igual o menor a 0")
  .exists().isNumeric({min: 1}),
  check("price", "El precio no puede ser igual o menor a 0")
  .exists().isNumeric({min: 1}),
  check("description", "La descripcion no puede estar vacía")
  .exists(),
  check("colores", "El campo no puede estar vacío")
  .exists(),
  /* check("categorias","Debes elegir al menos una")
  .exists(["Repuestos","Martillos","Construccion","Hogar","Electrica","Herramientas"]) */
  body("image").custom((value, {req}) => {
    let file = req.file
    let extensiones = [".jpg", ".jpeg", ".png", ".gif"]
    let fileExtension = path.extname(file.originalname)
      if(!file){
        throw new Error("Debes subir una imagen")
      }
      if(!extensiones.includes(fileExtension)){
        throw new Error("Las extensiones permitidas son .png, .jpg y .gif")
      }
  }
)
  
],mainController.productController.putProduct);

//ELIMINAR UN PRODUCTO BASE SQL
router.delete("/:id/detalle", mainController.productController.deleteProduct);

//LISTA DE PRODUCTOS BASE SQL
router.get("/productList", mainController.productController.productList);

//BUSQUEDA DE PRODUCTOS
router.post("/busqueda", mainController.productController.busqueda);

module.exports = router;
