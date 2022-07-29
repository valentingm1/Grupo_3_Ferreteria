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
            type: dataTypes.STRING(12345),
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
        },
        categoria_id:{
            type: dataTypes.STRING(100),
            allowNull: false
        },     
    };
    const config = {
        timestamps : false
    };

    const Producto = sequelize.define(alias, cols, config);

    console.log(Producto === sequelize.models.Products);

     //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
     Producto.associate = (models)=>{
        Producto.belongsTo(models.Categories,{
            as: "categorias",
            foreignKey: "categoria_id"
          });

    };

    return Producto;
}