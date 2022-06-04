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
    const image_path = path.join(__dirname, "../public/img/userImg");
    callback(null, image_path);
  },

  filename: (req, file, callback) => {
    const imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

const path_upload_img = multer({ storage: multerDiskStorage });

//------------------------------------------------------RUTAS--------------------------------------------------------------//

router.get("/register", mainController.userController.register);
router.post("/register",path_upload_img.single("image_profile"), mainController.userController.createUsers);

router.get("/login", mainController.userController.login);
router.post("/login", mainController.userController.veriLogin);

module.exports = router;
