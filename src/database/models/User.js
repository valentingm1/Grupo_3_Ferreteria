const  sequelize  = require("sequelize");

module.exports = (sequelize, dataTypes) =>{
    const alias = "Users";
    const cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: dataTypes.STRING(100)
        },
        last_name: {
            type: dataTypes.STRING(100)
        },
        email: {
            type: dataTypes.STRING(400)
        },
        password: {
            type: dataTypes.STRING(100)
        },
        image: {
            type: dataTypes.STRING(1234)
        },
        rol:{
            type: dataTypes.INTEGER,
        },

     };
    const config = {
        timestamps : false
    };

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}