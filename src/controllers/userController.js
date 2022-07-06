const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const req = require("express/lib/request");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const session = require("express-session")

// const userFilePath = path.join(__dirname, "../data/USER_DATA.json");
// const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
// const userTracker = require("../middlewares/userTracker")
// const HOUR= 1_000 * 3_600 


const db = require("../database/models")


const userController = {
  register: (req, res) => {
    res.render("users/register");
  },
  createUsers: (req, res) => {
    const image = req.file.filename;
    db.Users
    .create(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            genre_id: req.body.genre_id,
            image: image
        }
    )
    .then(()=> {
        return res.redirect('/')})            
    .catch(error => res.send(error))

  },
  // Para traer a los usuarios desde el JSON uso estos metodos, los nedesito para hacer funcionar el login

  login: (req, res) => {
    res.render("users/login");
  },
  loginProcess: (req, res) => {
    const userEmail = req.body.email;

    let userToLog = db.Users.findOne({
      where : {
        email: userEmail
      }
    });

    if (userToLog.password === req.body.password) {
      res.render("index", {usuario})
    }

// -------------------------------
//     let UserToLog = userTracker.findOneByField("email", req.body.email);

//     if (UserToLog) {
//       let isCheckedPassword = bcryptjs.compareSync(
//         req.body.password,
//         UserToLog.password
//       );
//       if (isCheckedPassword) {
//         req.session.userLogged = UserToLog;

//         if (req.body.remember =! undefined) {
//           res.cookie("UserEmail", req.body.email, { maxAge: HOUR});
//         }

//         return res.redirect("/");
//       }
//       return res.render("users/login", {
//         errors: {
//           email: {
//             errorMsg: "Le erraste a una credencial maestro",
//           },
//         },
//       });
//     }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("UserEmail");
    res.redirect("/");
  },
  profile:(req,res) =>{
    res.render("users/perfil")
  }
};

module.exports = userController;