//requerimientos//
const { append, redirect } = require("express/lib/response");
const fs = require("fs");
const multer = require("multer");

//BASE DE DATOS CON SQL

const db = require("../database/models")

const Op = db.Sequelize.Op;


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
    .then((categories) =>{
     return res.render('products/crearproducto', { categories})
    }).catch((e)=>{
      console.log(e)
    })
  },

  createProductPost: (req, res) => {
    const image = req.file.filename;

    console.log(req.body.categorias)
    console.log(req.body.id)

    db.Products.create({
      name: req.body.name,
      discount: req.body.discount,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      color: req.body.colores,
      image : image
    },)
    .then((producto)=>{
        res.redirect("/");
    }).catch((errors)=>{
        console.log(errors)
        res.send("ERROR")
    });

  },

  editProduct: (req, res) => {
    const id = req.params.id;
    db.Products.findByPk(id)
    .then((producto) =>{
     return res.render('products/modificarproducto', { producto})
    }).catch((e)=>{
      console.log(e)
    })
  },

  putProduct: (req, res) => {

    let peliculaId = req.params.id;


    db.Products.update(
      {
        name: req.body.name,
        discount: req.body.discount,
        stock: req.body.stock,
        price: req.body.price,
        description: req.body.description,
        colores: req.body.colores,
        image: req.file ? req.file.filename : req.body.image
      },
      {
          where: {id: peliculaId}
      })
      .then( ()=> {
            res.redirect("/")})
      .catch(error => res.send(error))
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
          res.render('products/productList', {products, categorias})
      })
  },

  busqueda: (req, res) =>{

    const productosSearch =db.Products.findAll({
      where:{
        name: {[Op.like]: `%${req.body.search}%`}
      }
    })
    const categorias = db.Categories.findAll();


    Promise.all([categorias,productosSearch])
      .then(function([categorias,products]){
          res.render('products/productList', {products, categorias})
      })
  }
}

module.exports = productController;
