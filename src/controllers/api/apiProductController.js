const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const req = require("express/lib/request");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

// const userFilePath = path.join(__dirname, "../data/USER_DATA.json");
// const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
// const userTracker = require("../middlewares/userTracker")
// const HOUR= 1_000 * 3_600

const db = require("../../database/models");


const apiProductController = {


    productList: async (req, res) => {

        try {
            const productos = await db.Products.findAll({nest: true, include:['categorias']});
            const categorias = await db.Categories.findAll({include :['productos'] })
            const countByCategory = categorias.reduce((prev, curr) =>{

                return {
                    ...prev, 
                    [curr.name]: curr.productos.length
                }
            }, {} )
            res.send({
                count: productos.length,
                countByCategory: countByCategory,
                products: productos
            })

        } catch (error) {
            console.log(error)
            res.send(error)
        }

        // db.Products.findAll( {include:['categorias']})
        // .then(allProducts=>{
        //     return res.json({
        //         count: allProducts.length,
        //         products: allProducts,
        //         status: 200
        //     })
        // })
    },

    productDetail: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then(product=>{
            return res.json({
                data: product,
                status: 200
            })
        })
    }

}

module.exports = apiProductController;