//REQUERIMIENTOS
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const multer = require("multer");
const path = require("path");

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

// CRUD
router.post("/login", mainController.userController.loginProcess);
router.put("/register",path_upload_img.single("image_profile"), mainController.userController.createUsers);
router.post("/logout", mainController.userController.logout);


module.exports = router;
