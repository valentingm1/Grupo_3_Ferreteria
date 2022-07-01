const fs = require("fs")
const { userInfo } = require("os")
const path = require("path")

const pathUserData = path.join(__dirname, "../data/USER_DATA.json")

const userTracker = {

    fileName: pathUserData,

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },
    
    findAll: function(){
        return this.getData()
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(TheUser => TheUser.id === id);
        return userFound
    },
    
    findOneByField: function(field,filtro){
        let allUsers = this.findAll();
        let userFound = allUsers.find(TheUser => TheUser[field] === filtro);
        return userFound
    }
}

module.exports = userTracker