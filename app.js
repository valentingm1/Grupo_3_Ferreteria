const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.static('public'))

app.listen(3000,() =>{
    console.log("Todo sobre ruedas")
})
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

app.get("/register", (req,res)=>{
    res.sendFile(__dirname+"/views/register.html")
})

app.get("/login", (req,res)=>{
    res.sendFile(__dirname+"/views/login.html")
})

app.get('/detalle', (req,res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/carrito', (req,res)=>{
    res.sendFile(__dirname + '/views/carrito.html');
});