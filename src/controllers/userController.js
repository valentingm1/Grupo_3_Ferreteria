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

const db = require("../database/models");

const userController = {

  userList: (req, res) => {
    db.Users.findAll()
    .then(allUsers=>{
      console.log
      res.render("users/usersList", {allUsers});
    })
  },


  register: (req, res) => {
    res.render("users/register");
  },

  createUsers: (req, res) => {
    const image = req.file.filename;

    db.Users.findAll({
      where: { email: req.body.email }
    })
      .then(allUsers => {

        if (allUsers === []) {
          return res.render("users/register")
        }
        else {
          db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: image
          })
            .then(() => {
              return res.redirect("/login");
            })
            .catch((error) => res.send(error));
        }
      })
  },

  login: (req, res) => {
    res.render("users/login");
  },

  loginProcess: (req, res) => {

    db.Users.findOne({
      where: {
        email: req.body.email
      },
    }).then(userToLog => {
        if (userToLog) {
          let passwordConfirm = bcryptjs.compareSync(req.body.password, userToLog.password)
          if (passwordConfirm) {
            req.session.userLogged = userToLog;

            res.redirect("/profile");
          }
        }
        else {
          res.redirect("/login");
        }
      }
      ).catch(error => {
        console.log(error)
        res.send(error)
      })
  },

  viewEditUser: (req, res) =>{
    console.log(req.session.userLogged)
    res.render("users/edit-user", {userLogged: req.session.userLogged})
  },

  editUser: (req, res) => {
    const image = req.file.filename;
    
    db.Users.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      image: image
    },
      {
        where:{
          id: req.params.id
        } 
      }).then((newUser) => {

        req.session.destroy();
         res.redirect("/");
      })
      .catch((error) => res.send(error));
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("UserEmail");
    res.redirect("/");
  },

  profile: (req, res) => {
    res.render("users/perfil", {
      userLogged: req.session.userLogged
    });
  },
  aboutUs: (req, res) => {
    res.render("users/about-us");
  },
};

module.exports = userController;
