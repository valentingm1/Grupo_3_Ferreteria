//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const {check, validationResult, body} = require("express-validator")

//Middleware require//
const guestMiddlware = require("../middlewares/guestMiddleware")
const authLoggMiddlware = require("../middlewares/authLoggMiddleware")

//CONFIGURACION DE MULTER
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const image_path = path.join(__dirname, "../../public/img/profiles");
    callback(null, image_path);
  },
  filename: (req, file, callback) => {
    const imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

const path_upload_img = multer({ storage: multerDiskStorage });

//------------------------------------------------------RUTAS--------------------------------------------------------------//
// Renders de Pantalla
router.get("/register",guestMiddlware, mainController.userController.register);
router.get("/login",guestMiddlware, mainController.userController.login);
router.get("/profile",authLoggMiddlware, mainController.userController.profile);
router.get("/:id/edit-user",authLoggMiddlware, mainController.userController.viewEditUser);



// CRUD
//INICIO DE SESION CON SQL
router.post("/login",[
  check("email", "El mail no puede estar vacio")
  .exists()
  .isEmail()
  .normalizeEmail(),
  check("password", "La contraseña no puede estar vacia y debe tener entre 8 y 20 caracteres")
  .exists()
  .isLength({ min:8, max: 20})
], mainController.userController.loginProcess);

//CREACION DE USUARIO CON BASE SQL
router.post("/register",path_upload_img.single("image_profile"),
[
  check("first_name", "El nombre no puede estar vacio")
  .exists(),
  check("last_name", "El apellido no puede estar vacio")
  .exists(),
  check("email", "El mail no puede estar vacio")
  .exists()
  .isEmail()
  .normalizeEmail(),
  check("password", "La contraseña no puede estar vacia y debe tener entre 8 y 20 caracteres")
  .exists()
  .isLength({ min:8, max: 20}),
  body("image_profile").custom((value, {req}) => {
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
)],
mainController.userController.createUsers,);

router.post("/logout", mainController.userController.logout);

router.put("/:id/edit-user",authLoggMiddlware,[
  check("first_name", "El nombre no puede estar vacio")
  .exists(),
  check("last_name", "El apellido no puede estar vacio")
  .exists(),
  check("email", "El mail no puede estar vacio")
  .exists()
  .isEmail()
  .normalizeEmail(),
  check("password", "La contraseña no puede estar vacia y debe tener entre 8 y 20 caracteres")
  .exists()
  .isLength({ min:8, max: 20}),
  body("image_profile").custom((value, {req}) => {
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
],  mainController.userController.editUser)

module.exports = router;
