const mainController = {
    index :(req,res) => {
        res.sendFile('index.html', { root: "./views" });
    ;
    },
    carrito :(req,res) => {
        res.sendFile('carrito.html', { root: "./views" });
    ;
    },
    productDetail :(req,res) => {
        res.sendFile('productDetail.html', { root: "./views" });
    ;
    },
    register :(req,res) => {
        res.sendFile('register.html', { root: "./views" });
    ;
    },
    login :(req,res) => {
        res.sendFile('login.html', { root: "./views" });
    ;
    }
}

module.exports = mainController