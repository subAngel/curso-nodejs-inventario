const { ObjectId } = require("mongodb");

const { Database } = require("../database");

const { ProcuctsUtils } = require("./utils");

const COLLECTION = "products";

// * @funtion getAll trae todos los datos de la base de datos en cuanto a productos
const getAll = async () => {
	const collection = await Database(COLLECTION);
	// * retornar todos los productos como un array
	return await collection.find({}).toArray();
};

// * poder realizar busquedas en base al id de un product
const getById = async (id) => {
	const collection = await Database(COLLECTION);
	return collection.findOne({ _id: ObjectId(id) });
};

// * crear un nuevo producto en la base de datos
const createProduct = async (product) => {
	const collection = await Database(COLLECTION);
	let result = await collection.insertOne(product);
	return result.insertedId;
};

const generateReport = async (name, res) => {
	let products = await getAll();
	ProcuctsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
	getAll,
	getById,
	createProduct,
	generateReport,
};
