const mainController = {
    index :(req,res) => {
        res.render('index');
    },
    carrito :(req,res) => {
        res.render('products/carrito');
    },
    productDetail :(req,res) => {
        res.render('products/productDetail');
    },
    register :(req,res) => {
        res.render('users/register');
    },
    login :(req,res) => {
        res.render('users/login');
    }
}

module.exports = mainController