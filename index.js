const express = require("express");
const debug = require("debug")("app:main");

// esportar el modulo de products
const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users");
const { IndexAPI, NotFoundAPI } = require("./src/index");

const app = express();

// * capacidad de recibir datos en el request.body
app.use(express.json());

IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
NotFoundAPI(app);
// * -----------------------------------MODULOS-------------------------------------------
// ? comando 'netstat' identifica los procesos ejecutados en la computadora y en que puerto
// ? netstat -ano | findstr 3000  ->  encontrar el proceso
// ? taskkill /PID PID /F
app.listen(Config.port, () => {
	debug(`Servidor escuchando en el puerto ${Config.port}`);
});
