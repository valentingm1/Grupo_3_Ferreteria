const mainController = {
    index :(req,res) => {
        res.render('index');
    ;
    },
    carrito :(req,res) => {
        res.render('carrito');
    ;
    },
    productDetail :(req,res) => {
        res.render('productDetail');
    ;
    },
    register :(req,res) => {
        res.render('register');
    ;
    },
    login :(req,res) => {
        res.render('login');
    ;
    }
}

module.exports = mainController