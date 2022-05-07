const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/USER_DATA.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const userController = {
  register: (req, res) => {
    res.render("users/register");
  },
  login: (req, res) => {
    res.render("users/login");
  },
};

module.exports = userController;
