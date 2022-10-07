const createError = require("http-errors");

const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");

// * importar las respuestas
const { Response } = require("../common/response");

module.exports.ProductsController = {
	getProducts: async (req, res) => {
		try {
			let products = await ProductsService.getAll();
			Response.success(res, 200, "Lista de productos", products);
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
	getProduct: async (req, res) => {
		try {
			// ? obtener el id
			const {
				params: { id },
			} = req;
			let product = await ProductsService.getById(id);
			if (!product) {
				Response.error(res, new createError.NotFound());
			} else {
				Response.success(res, 200, `Producto ${id}`, product);
			}
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
	createProduct: async (req, res) => {
		try {
			// * obtener el body
			const { body } = req;
			if (!body || Object.keys(body).length === 0) {
				Response.error(res, new createError.BadRequest());
			} else {
				const insertedId = await ProductsService.createProduct(body);
				Response.success(res, 201, "Producto Agregado", insertedId);
			}
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},

	generateReport: (req, res) => {
		try {
			ProductsService.generateReport("Inventario", res);
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
};
