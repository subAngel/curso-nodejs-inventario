const express = require("express");

// * exportar las funciones controladoras
const { UsersController } = require("./controller");

//* Router Permite manejar la ruta de los modulos
const router = express.Router();

module.exports.UsersAPI = (app) => {
	// * definir lar rutas de los modulos productos
	router
		.get("/", UsersController.getUsers) // ? http://localhost:3000/api/products
		.get("/:id", UsersController.getUser) // ? http://localhost:3000/api/products/23
		.post("/", UsersController.createUser);

	app.use("/api/users", router); //* configurar en cierta ruta nuestro router
};
