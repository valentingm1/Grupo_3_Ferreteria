const  sequelize  = require("sequelize");

module.exports = (sequelize, dataTypes) =>{
    const alias = "Productos";
    const cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(100)
        },
        description: {
            type: dataTypes.STRING(400)
        },
        price: {
            type: dataTypes.DECIMAL
        },
        stock: {
            type: dataTypes.INTEGER,
        },
        image: {
            type: dataTypes.STRING(1234)
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        category: {
            type: dataTypes.INTEGER,
        },
        color: {
            type: dataTypes.INTEGER,
        }
        //productCategory_id: {

        //}           
    };
    const config = {
        timestamps : false
    };

    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}