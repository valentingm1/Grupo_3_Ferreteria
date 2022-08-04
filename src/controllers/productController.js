//requerimientos//
const { append, redirect } = require("express/lib/response");
const fs = require("fs");
const multer = require("multer");

//BASE DE DATOS CON SQL

const db = require("../database/models")

const Op = db.Sequelize.Op;




//CONFIGURACION de RUTAS//
const productController = {
  productDetail: (req, res) => {
    const id = req.params.id;

    const producto =db.Products.findByPk(id,{
      include:['categorias']});
    const productsAll = db.Products.findAll();

    Promise.all([producto,productsAll])
    .then(([producto,productsAll])=> {
        res.render('products/productDetail.ejs', {producto,productsAll ,userLogged : req.session.userLogged});
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

    // console.log(req.body.categorias)
    // console.log(req.body.id)

    db.Products.create({
      name: req.body.name,
      discount: req.body.discount,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      color: req.body.colores,
      image : image,
      categoria_id:req.body.categorias
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
    const categorias = db.Categories.findAll();
    const productos = db.Products.findByPk(id,{
      include:['categorias']
   })
  
   Promise.all([categorias,productos])
    .then(([categorias,producto]) =>{
     return res.render('products/modificarproducto', { categorias,producto})
    }).catch((e)=>{
      console.log(e)
    })
  },

  putProduct: (req, res) => {

    let productoId = req.params.id;
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
          where: {id: productoId}
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
        console.log(categorias)
          res.render('products/productList', {products, categorias})
      })
  },

  productCategory: (req, res) =>{
    const categoriaId = req.params.id;

    const categorias = db.Categories.findAll();
    const productos = db.Products.findAll({
      where: {categoria_id: categoriaId}
    });


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
