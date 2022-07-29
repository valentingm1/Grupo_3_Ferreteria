const fs = require("fs");
const path = require("path");

const productController = require("./productController");
const userController = require("./userController");

//BASE DE DATOS CON SQL

const db = require("../database/models")



const herramientasFilePath = path.join(__dirname, "../data/PRODUCTS_DATA.json");
const herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otros = herramientas;

const mainController = {
  index: (req, res) => {
    db.Products.findAll()
      .then(products => {
        console.log(req.session)
          res.render('index', {products})
      })
  },
  carrito: (req, res) => {
    res.render("products/carrito", { productos: herramientas });
    // TO-DO: ¿a dónde se agregará el producto?
    // - crear base de datos donde se guarde el carrito (lista de producto seleccionada por usuario)
    //
  },

  productController: productController,
  userController: userController,
};


module.exports = mainController;
