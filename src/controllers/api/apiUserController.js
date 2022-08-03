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
        .then(allUsers=>{
            allUsers
            return res.json({
                total: allUsers.length,
                data: allUsers,
                status: 200
            })
        })
    },

    userDetail: (req, res) => {
        db.Users.findByPk(req.params.id)
        .then(user=>{
            return res.json({
                data: user,
                status: 200
            })
        })
    }

}

module.exports = apiUserController;