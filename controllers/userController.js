const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/USER_DATA.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const userController = {
  register: (req, res) => {
    res.render("users/register");
  },
  createUsers: (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const id = users.length + 1;

    users.push({
      first_name,
      last_name,
      email,
      password,
      id
    });
    const news_users = JSON.stringify(users);
    fs.writeFileSync(userFilePath, news_users);

    res.redirect("/");
  },
  login: (req, res) => {
    res.render("users/login");
  },
  veriLogin: (req, res) => {
    res.render("users/login");
  }
};

module.exports = userController;
