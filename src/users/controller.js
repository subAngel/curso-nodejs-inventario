const createError = require("http-errors");

const debug = require("debug")("app:module-users-controller");

const { UsersServices } = require("./services");

// * importar las respuestas
const { Response } = require("../common/response");

module.exports.UsersController = {
	getUsers: async (req, res) => {
		try {
			let usuarios = await UsersServices.getAll();
			Response.success(res, 200, "Lista de usuarios", usuarios);
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
	getUser: async (req, res) => {
		try {
			// ? obtener el id
			const {
				params: { id },
			} = req;
			let user = await UsersServices.getById(id);
			if (!user) {
				Response.error(res, new createError.NotFound());
			} else {
				Response.success(res, 200, `Usuario ${id}`, user);
			}
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
	createUser: async (req, res) => {
		try {
			// * obtener el body
			const { body } = req;
			if (!body || Object.keys(body).length === 0) {
				Response.error(res, new createError.BadRequest());
			} else {
				const insertedId = await UsersServices.createProduct(body);
				Response.success(res, 201, "Usuario agregado", insertedId);
			}
		} catch (error) {
			debug(error);
			Response.error(res);
		}
	},
};
