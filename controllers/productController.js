const fs = require("fs");
const path = require("path");
const herramientasFilePath = path.join(__dirname, "../data/PRODUCTS_DATA.json");
const herramientas = JSON.parse(fs.readFileSync(herramientasFilePath, "utf-8"));
const otrosProductos = herramientas;

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
    // TODO: incluir color, otros e imágenes que serían los atributos faltantes.

    herramientas.forEach((producto) => {
      if (producto.id === parseInt(id)) {
        producto.name = name;
        producto.price = price;
        producto.description = description;
      }
    });
    const data = JSON.stringify(herramientas, null, 2);
    fs.writeFileSync(herramientasFilePath, data);
    res.redirect("/");
  },
};

module.exports = productController;
