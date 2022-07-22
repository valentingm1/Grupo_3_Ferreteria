module.exports = (sequelize, dataTypes) =>{
    const alias = "Product_category";
    const cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id:{
            type: dataTypes.INTEGER,
        },
        category_id:{
            type: dataTypes.INTEGER,
        },
    }

    const config = {
        timestamps : false
    };

    const Product_category = sequelize.define(alias, cols, config);
    
    return Product_category;
}