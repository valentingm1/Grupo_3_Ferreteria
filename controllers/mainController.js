const herramientas= [
    {
        img:"img/Alicate.jpg",
        name:"Alicate megabueno",
        desc:"Alicate megabueno de acero con descripcion descriptiva",
        price:"Precio $50.00",
        alt:"Imagen de alicate",
        cantidad:"10",
    },
    {
        img:"img/Hacha.jpg",
        name:"Hacha cortasúper",
        desc:"",
        price:"Precio $10.00",
        alt:"imagen de Hacha",
        cantidad:"15",
    },
    {
        img:"img/Martillo.jpg",
        name:"Martillo pegaduro",
        desc:"",
        price:"Precio $40.00",
        alt:"imagen de Martillo",
        cantidad:"5",
    },
    {
        img:"img/Hacha.jpg",
        name:"Hacha cortasúper",
        desc:"",
        price:"Precio $10.00",
        alt:"imagen de Hacha",
        cantidad:"7",
    },
    {
        img:"img/Alicate.jpg",
        name:"Alicate megabueno",
        desc:"Alicate megabueno de acero con descripcion descriptiva",
        price:"Precio $50.00",
        alt:"Imagen de alicate",
        cantidad:"10",
    },
]

const mainController = {
    index :(req,res) => {
        res.render('index', {productos: herramientas});
    },
    carrito :(req,res) => {
        res.render('products/carrito');
    },
    productDetail :(req,res) => {
        res.render('products/productDetail',{productos: herramientas});
    },
    register :(req,res) => {
        res.render('users/register');
    },
    login :(req,res) => {
        res.render('users/login');
    },
    submitDetail :(req,res) => {
        res.render('products/submitDetail');
    }
}

module.exports = mainController
