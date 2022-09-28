//!Pendiente de averiguar como funciona el DbQuery:
https://www.npmjs.com/package/normalize-url

async function normalizeDbQuery(promise) {
	let result = {
		data: null,
		error: null,
	};

	try {
		const data = await promise;
		result.data = data;
	} catch (error) {
		result.error = error.message;
	}
	return result;
}

module.exports = normalizeDbQuery;