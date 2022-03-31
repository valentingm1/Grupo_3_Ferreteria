const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.static('public'))

app.listen(3000,() =>{
    console.log("Todo sobre ruedas")
})
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
});
app.get("/productCart", (req,res)=>{
    res.sendFile(__dirname+"/views/productCart.html")
});
app.get("/register", (req,res)=>{
    res.sendFile(__dirname+"/views/register.html")
});
app.get("/productDetail", (req,res)=>{
    res.sendFile(__dirname+"/views/productDetail.html")
});
