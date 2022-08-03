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

const apiCategoryController = {

    categoryList: (req, res) => {
        db.Categories.findAll()
        .then(allCategory=>{
            return res.json({
                data:{
                    total: allCategory.length,
                    categorias: allCategory,
                    status: 200
                }
            })
        })
    },

    categoryProduct: (req, res) => {
        db.products.findAll({

        })
        .then(allCategory=>{
            return res.json({
                data:{
                    total: allCategory.length,
                    categorias: allCategory,
                    status: 200
                }
            })
        })
    }

}

module.exports = apiCategoryController;