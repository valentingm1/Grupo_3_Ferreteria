/* const herramientas= [
    {
        img:"/img/Alicate.jpg",
        name:"Alicate megabueno",
        desc:"Alicate megabueno de acero con descripcion descriptiva",
        price:"Precio $50.00",
        alt:"Imagen de alicate",
        cantidad:"10",
        id: 1,
    },
    {
        img:"/img/Hacha.jpg",
        name:"Hacha cortasúper",
        desc:"Hacha cortasúper de acero con descripcion descriptiva",
        price:"Precio $10.00",
        alt:"imagen de Hacha",
        cantidad:"15",
        id: 2,
    },
    {
        img:"/img/Martillo.jpg",
        name:"Martillo pegaduro",
        desc:"Martillo pegaduro de acero con descripcion descriptiva",
        price:"Precio $40.00",
        alt:"imagen de Martillo",
        cantidad:"5",
        id: 3,
    },
    {
        img:"/img/Hacha.jpg",
        name:"Hacha cortasúper",
        desc:"Martillo pegaduro de acero con descripcion descriptiva",
        price:"Precio $10.00",
        alt:"imagen de Hacha",
        cantidad:"7",
        id: 4,
    },
    {
        img:"/img/Alicate.jpg",
        name:"Alicate megabueno",
        desc:"Alicate megabueno de acero con descripcion descriptiva",
        price:"Precio $50.00",
        alt:"Imagen de alicate",
        cantidad:"10",
        id: 5,
    },
] */

const fs = require("fs");
const path = require("path");

const productController = require("./productController");
const userController = require("./userController");

const herramientasFilePath = path.join(__dirname, "../data/PRODUCTS_DATA.json");
const herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otros = herramientas;

const mainController = {
  index: (req, res) => {
    const herramientas = JSON.parse(
      fs.readFileSync(herramientasFilePath, "utf-8")
    );
    res.render("index", { productos: herramientas });
  },
  carrito: (req, res) => {
    res.render("products/carrito", { productos: herramientas });
    // TODO: ¿a dónde se agregará el producto?
    // - crear base de datos donde se guarde el carrito (lista de producto seleccionada por usuario)
    //
  },

  productController: productController,
  userController: userController,
};

module.exports = mainController;
