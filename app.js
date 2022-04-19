const express = require("express");
const fs = require("fs");
const app = express();
const rutasPagina = require("./routers/main.js");
app.use(express.static('public'));

app.set("view engine", "ejs");


app.listen(3000,() =>{
    console.log("Todo sobre ruedas")
})
app.use("/", rutasPagina)

app.use("/register", rutasPagina)

app.use("/login", rutasPagina)

app.use('/detalle', rutasPagina)

app.use('/carrito', rutasPagina)