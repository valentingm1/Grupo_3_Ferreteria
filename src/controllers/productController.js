//requerimientos//
const { append } = require("express/lib/response");
const fs = require("fs");
const multer = require("multer");

//BASE DE DATOS CON SQL

const db = require("../database/models")


//Base DE DATOS//
const path = require("path");
const herramientasFilePath = path.join(__dirname, "../data/PRODUCTS_DATA.json");
var herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otrosProductos = herramientas;

//CONFIGURACION de RUTAS//
const productController = {
  productDetail: (req, res) => {
    const id = req.params.id;

    db.Products.findByPk(id,{
      include:['categorias']
   })
    .then(producto => {
      console.log(producto.categorias.name)
        res.render('products/productDetail.ejs', {producto});
    })
    .catch((error)=>{
      console.log(error);
    });


  },

  createProduct: (req, res) => {
    db.Categories.findAll()
    .then(categories => {
     return res.render('products/crearproducto', {categories})
  }).catch((e)=>{
    console.log(e)
  })

  const categorias = db.Categories.findAll();
  console.log(categorias)
  },

  createProductPost: (req, res) => {
    const image = req.file.filename;
    db.Products.create({
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
    let productId = req.params.id;
    db.Products
    .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(()=>{
        return res.redirect('../productList')})
    .catch(error => res.send(error)) 
  },

  productList: (req, res) => {
    const categorias = db.Categories.findAll();
    const productos = db.Products.findAll();

    Promise.all([categorias,productos])
      .then(function([categorias,products]){
        console.log(categorias)
          res.render('products/productList', {products, categorias})
      })
    }

  }

module.exports = productController;
