const express = require("express");
const fs = require("fs");
const app = express();
const rutasPagina = require("./routers/main.js");
app.use(express.static('public'));

app.set("view engine", "ejs");


app.listen(3000,() =>{
    console.log("Todo sobre ruedas")
});

app.use("/", rutasPagina);

