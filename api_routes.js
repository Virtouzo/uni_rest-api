const express = require("express");

const dataStorage = require("./dataStorage");
var router = express.Router();

router.get("/users", function(req, res, next) {
	res.json(dataStorage.getAll());
});

router.get("/users/:id", function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	if (!user) {
		res.status(404).end();
	} else {
		res.json(user);
	}
});

router.post("/users", function(req, res, next) {
	req.body.balance = Number(req.body.balance);

	try {
		dataStorage.userPropExistValidator(req.body);
		dataStorage.userPropTypeValidator(req.body);
	} catch (e) {
		return res.status(400).json({
			message: "Invalid arguments"
		});
	}

	dataStorage.set(null, req.body);
	res.status(201).end();
});

router.put("/users/:id", function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);
	req.body.balance = Number(req.body.balance);

	try {
		dataStorage.userPropExistValidator(req.body);
		dataStorage.userPropTypeValidator(req.body);
	} catch (e) {
		return res.status(400).json({
			message: "Invalid arguments"
		});
	}

	if (user) {
		dataStorage.update(userId, req.body);
	} else {
		dataStorage.set(userId, req.body);
		res.status(201);
	}

	res.end();
});

router.patch("/users/:id", function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);
	req.body.balance = Number(req.body.balance);

	if (!user) return res.status(404).end();
	try {
		dataStorage.userPropExistValidator(req.body);
		dataStorage.userPropTypeValidator(req.body);
	} catch (e) {
		return res.status(400).json({
			message: "Invalid arguments"
		});
	}

	dataStorage.update(userId, req.body);
	res.end();
});

router.delete("/users/:id", function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	if (!user) return res.status(404).end();

	dataStorage.del(userId);

	res.end();
});

module.exports = router;
