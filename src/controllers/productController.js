//requerimientos//
const { append } = require("express/lib/response");
const fs = require("fs");
const multer = require("multer");

//BASE DE DATOS SQL

const db = require('../database/models');
const sequelize = db.sequelize;

//Modelo De Productos
const Product = db.Producto;

//Base DE DATOS//
const path = require("path");
const herramientasFilePath = path.join(__dirname, "../database/data/PRODUCTS_DATA.json");
var herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otrosProductos = herramientas;

//CONFIGURACION de RUTAS//
const productController = {
  productDetail: (req, res) => {

    const id = req.params.id;
    const toolFound = herramientas.find((herramienta) => herramienta.id == id);

    if (toolFound) {
      const productDetailData = {
        producto: toolFound,
        otrosProductos,
      };

      res.render("products/productDetail", productDetailData);
    } else {
      res.send("Producto inexistente");
    }
  },

  createProduct: (req, res) => {
    res.render("products/crearproducto");
  },

  createProductPost: (req, res) => {
    const image = req.file.filename;
    Product.create({
      name: req.body.name,
      discount: req.body.discount,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      color: req.body.colores,
      category: req.body.category,
      image : image
    })
    .then(()=>{
        res.redirect("/");
    }).catch((errors)=>{
        console.log(errors)
        res.send("ERROR")
    })
  },

  editProduct: (req, res) => {
    const id = req.params.id;
    const toolFound = herramientas.find((herramienta) => herramienta.id == id);

    if (toolFound) {
      const productoParaModificar = {
        producto: toolFound,
      };
      res.render("products/modificarproducto", productoParaModificar);
    } else {
      res.send("Producto inexistente");
    }
  },

  putProduct: (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const stock = req.body.stock;
    const color = req.body.color;
    const category = req.body.category;
    
    const image = req.file.filename

    herramientas.forEach((producto) => {
      if (producto.id === parseInt(id)) {
        producto.name = name;
        producto.price = price;
        producto.description = description;
        producto.stock = stock;
        producto.color = color;
        producto.category = category;
        producto.image = image;
      }
    });
    const data = JSON.stringify(herramientas);
    fs.writeFileSync(herramientasFilePath, data);
    res.redirect("/producto/"+ req.params.id + "/detalle");
  },
  deleteProduct: (req, res) => {
    function checkProduct(product) {
      if (product.id != req.params.id) {
        return product;
      }
    }
    herramientas = herramientas.filter(checkProduct);
    let newData = JSON.stringify(herramientas);
    fs.writeFileSync(herramientasFilePath, newData);
    res.redirect("/");
  },

  productList: (req, res) => {
      db.Product.findAll()
    .then(products => {
      res.render("products/productList", { products})
    })
    
  },
};

module.exports = productController;
