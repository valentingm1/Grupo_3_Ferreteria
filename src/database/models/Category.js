module.exports = (sequelize, dataTypes) =>{
    const alias = "Categories";
    const cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    const config = {
        timestamps : false
    };

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = (models)=>{
        Categoria.belongsToMany(models.Products,{
            as:"productos",
            through: "product_category",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: false
        });
    }
    return Categoria;
}