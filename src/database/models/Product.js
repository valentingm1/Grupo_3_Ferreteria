module.exports = (sequelize, dataTypes) =>{
    const alias = "Products";
    const cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(400),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(1234),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: dataTypes.INTEGER,
            allowNull: false
        }     
    };
    const config = {
        timestamps : false
    };

    const Producto = sequelize.define(alias, cols, config);

    console.log(Producto === sequelize.models.Products)

    return Producto;
}