const _ = require("lodash");

const data = {
	1: { first_name: "Rokas", balance: 123 },
	2: { first_name: "Tomas", balance: 555 },
	3: { first_name: "DigiDo", balance: 323 }
};

function userPropExistValidator(user) {
	if (!user.first_name) throw new Error("Invalid arguments!");
	if (!user.balance) throw new Error("Invalid arguments!");
}
function userPropTypeValidator(user) {
	if (user.first_name && !_.isString(user.first_name)) throw new Error("Invalid arguments!");
	if (user.balance && !_.isNumber(user.balance)) throw new Error("Invalid arguments!");
}

function set(key, val) {
	if (!key) {
		keys = _.orderBy(Object.keys(data), "asc");
		key = keys[keys.length - 1] + 1;
	}

	if (data[key]) throw new Error("User already exists!");
	data[key] = val;
}
function get(key) {
	return data[key];
}
function getAll() {
	return data;
}
function update(key, newInfo) {
	if (!data[key]) throw new Error("User does not exist!");

	const newUser = { ...data[key], ...newInfo };
	data[key] = newUser;
}
function del(key) {
	if (!data[key]) throw new Error("User does not exist!");
	delete data[key];
}

module.exports = {
	get,
	set,
	getAll,
	update,
	del,
	userPropExistValidator,
	userPropTypeValidator
};
