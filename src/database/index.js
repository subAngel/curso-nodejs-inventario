const { MongoClient } = require("mongodb"); // * cliente para conectar mongo atlas
const debug = require("debug")("app:module-database"); //

const { Config } = require("../config/index");

/*
TODO exportar una function que devuelva la conexion a la base de datos
* @param collection = coleccion de datos
*/
var connection = null;
module.exports.Database = (collection) =>
	new Promise(async (resolve, reject) => {
		// * funcion que retorna una promesa
		// * patron singleton permite no generar varias instancias
		try {
			if (!connection) {
				//* si no hay una conexion que genere una
				const client = new MongoClient(Config.mongoUri); // dirver de la base de datos
				connection = await client.connect(); // el cliente devuelve una conexion
				debug("Nueva conexion realizada con MongoDB Atlas");
			}
			debug("Reutilizando conexion");
			const db = connection.db(Config.mongoDbname); // *si ya hay una bd que la reutilice
			resolve(db.collection(collection));
		} catch (error) {
			reject(error);
		}
	});
