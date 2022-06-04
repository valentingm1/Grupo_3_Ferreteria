const fs = require("fs")
const { userInfo } = require("os")

const userTracker = {

    fileName: "./data/USER_DATA.json",

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