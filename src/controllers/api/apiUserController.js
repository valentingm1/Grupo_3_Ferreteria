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

const apiUserController = {

    userList: (req, res) => {
        db.Users.findAll()
        .then(users=>{
            users.forEach( function( user ){
                let id  = user.id
                let apiUrl = "http://localhost:3030/api/users/"+id
                
                user.dataValues = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email

                }
                user.dataValues.apiUrl = apiUrl;
              });
            return res.json({
                total: users.length,
                data: users,
                status: 200
            })
        })
    },

    userDetail: (req, res) => {
        db.Users.findByPk(req.params.id)
        .then(user=>{
            let image = user.image
            let imageUrl = "http://localhost:3030/img/profiles/"+image
            user.dataValues = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                image: user.image

            }
            user.dataValues.imageUrl = imageUrl
            return res.json({
                data: user,
                status: 200
            })
        })
    }

}

module.exports = apiUserController;