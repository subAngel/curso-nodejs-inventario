const excelGenerator = (products, name, res) => {
	const xl = require("excel4node");

	products = products.map((product) => {
		let id = product._id.toString();
		delete product._id;
		return {
			id,
			...product,
		};
	});

	// * @param {String} wb workbook
	let wb = new xl.Workbook();
	// * generar una hoja dentro del excel
	let ws = wb.addWorksheet();

	// * agregar los datos dentro del excel
	// ? lee por fila
	for (let i = 1; i <= products.length; i++) {
		// ? Revisa cuantos elementos tiene un producto
		for (let j = 1; j <= Object.values(products[0]).length; j++) {
			let data = Object.values(products[i - 1])[j - 1];
			if (typeof data === "string") {
				ws.cell(i, j).string(data);
			} else {
				ws.cell(i, j).number(data);
			}
		}
	}
	// ? res, si queremos enviar el archivo debemos parsar el objeto response al write
	wb.write(`${name}.xlsx`, res);
};

module.exports.ProcuctsUtils = {
	excelGenerator,
};
