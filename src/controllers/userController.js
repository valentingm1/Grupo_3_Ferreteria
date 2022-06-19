const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const req = require("express/lib/request");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const session = require("express-session")

const userFilePath = path.join(__dirname, "../data/USER_DATA.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
const userTracker = require("../database/models/userTracker.js")
const HOUR= 1_000 * 3_600 

const userController = {
  register: (req, res) => {
    res.render("users/register");
  },
  createUsers: (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const id = users.length + 1;

    const image = req.file.filename;

    console.log(image);

    users.push({
      first_name,
      last_name,
      email,
      password,
      id,
      image,
    });

    const news_users = JSON.stringify(users);
    fs.writeFileSync(userFilePath, news_users);

    res.redirect("/");
  },
  // Para traer a los usuarios desde el JSON uso estos metodos, los nedesito para hacer funcionar el login

  login: (req, res) => {
    res.render("users/login");
  },
  loginProcess: (req, res) => {
    let UserToLog = userTracker.findOneByField("email", req.body.email);

    if (UserToLog) {
      let isCheckedPassword = bcryptjs.compareSync(
        req.body.password,
        UserToLog.password
      );
      if (isCheckedPassword) {
        req.session.userLogged = UserToLog;

        if (req.body.remember =! undefined) {
          res.cookie("UserEmail", req.body.email, { maxAge: HOUR});
        }

        return res.redirect("/");
      }
      return res.render("users/login", {
        errors: {
          email: {
            errorMsg: "Le erraste a una credencial maestro",
          },
        },
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("UserEmail");
    res.redirect("/");
  },
<<<<<<< HEAD
  profile:(req,res) =>{
    res.render("users/profile")
  }
=======
>>>>>>> ad8cf7b966917410cc09fe1caa426938664a3745
};

module.exports = userController;