const express = require("express");

// * exportar las funciones controladoras
const { ProductsController } = require("./controller");

//* Router Permite manejar la ruta de los modulos
const router = express.Router();

module.exports.ProductsAPI = (app) => {
	// * definir lar rutas de los modulos productos
	router
		.get("/", ProductsController.getProducts) // ? http://localhost:3000/api/products
		.get("/report", ProductsController.generateReport) // ? generar el reporte
		.get("/:id", ProductsController.getProduct) // ? http://localhost:3000/api/products/23
		.post("/", ProductsController.createProduct);

	app.use("/api/products", router); //* configurar en cierta ruta nuestro router
};
