const express = require("express");

const dataStorage = require("./dataStorage");
var router = express.Router();

function dataValidator(req, res, next) {
	req.body.balance = Number(req.body.balance);

	try {
		dataStorage.userPropExistValidator(req.body);
		dataStorage.userPropTypeValidator(req.body);
	} catch (e) {
		res.status(400);
		next(e);
	}

	next();
}

function userExistChecker(req, res, next) {
	const user = dataStorage.get(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User does not exist!");
	} else {
		next();
	}
}

router.get("/users", function(req, res, next) {
	res.json(dataStorage.getAll());
});

router.get("/users/:id", userExistChecker, function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	res.json(user);
});

router.post("/users", dataValidator, function(req, res, next) {
	dataStorage.set(null, req.body);
	res.status(201).end();
});

router.put("/users/:id", dataValidator, function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	if (user) {
		dataStorage.update(userId, req.body);
	} else {
		dataStorage.set(userId, req.body);
		res.status(201);
	}

	res.end();
});

router.patch("/users/:id", userExistChecker, dataValidator, function(req, res, next) {
	const userId = req.params.id;
	const user = dataStorage.get(userId);

	dataStorage.update(userId, req.body);
	res.end();
});

router.delete("/users/:id", userExistChecker, function(req, res, next) {
	const userId = req.params.id;

	dataStorage.del(userId);

	res.end();
});

module.exports = router;
