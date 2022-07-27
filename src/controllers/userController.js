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
  register: (req, res) => {
    res.render("users/register");
  },
  createUsers: (req, res) => {
    const image = req.file.filename;
    db.Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      image: image
    })
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
  
  login: (req, res) => {
    res.render("users/login");
  },
  loginProcess: (req, res) => {
    const userEmail = req.body.email;

    let userToLog = db.Users.findOne({
      where: {
        email: userEmail,
      },
    })
    .then(
      user => {
          if (user.password == req.body.password) {
              // if password match, then go to index with the user profile.
              //res.render("index", { user });
              // TODO: locals.isLogged poner en true.
              // en userLogged poner los campos del usuario (first_name)
              res.render("index");
          }
          else {
              // otherwise, keep on login (maybe we must add an error message.
              res.render("users/login");
          }
      }
  );




//Promise.all([userToLog]).then((userToLog) => {
  // FIXME: verify that both passwords match.
//});

},
  
  editUser: (req,res) => {
    const image = req.file.filename;
    db.Users.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      image: image
    },
    {
      where: id == req.params.id
    }).then(() => {
      return res.redirect("/perfil");
    })
    .catch((error) => res.send(error));
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("UserEmail");
    res.redirect("/");
  },
  profile: (req, res) => {
    res.render("users/perfil");
  },
};

module.exports = userController;
