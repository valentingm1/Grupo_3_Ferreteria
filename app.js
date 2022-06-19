
//REQUERIMIENTOS//
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session")
const validateLoggedInUserMW = require("./src/middlewares/validateLoggedInUserMW")
const rememberSessionMW = require("./src/middlewares/rememberSessionMW")
const cookies = require('cookie-parser');

//REQUERIMIENTOS RUTAS//
const app = express();
const mainRouter = require("./src/routers/mainRouter");
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");


//Middlewares//
app.use(express.static("public"));
app.use(session({secret:"AMIGO NO PUEDO PAUSARLO", resave: false, saveUninitialized: false}));
// cookies
app.use(cookies());
app.use(rememberSessionMW);
app.use(validateLoggedInUserMW);



// Habilitar las peticiones http put y delete
app.use(methodOverride("_method"));

// Habilitar recepcion de informacion
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuracion de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.listen(3030, () => {
  console.log("Todo sobre ruedas");
});
// /
app.use("/", mainRouter);
// /login
// /register
app.use("/", userRouter);
// /producto/detalle/:id
// /producto/crear
// /producto/modificar
app.use("/producto", productRouter);
