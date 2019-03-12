const express = require('express');

const dataStorage = require('./dataStorage')
var router = express.Router();

router.get('/users', function (req, res, next) {
    res.json(dataStorage.getAll());
})

router.get('/users/:id', function (req, res, next) {
    const userId = req.params.id;
    const user = dataStorage.get(userId);

    if (!user) throw new Error('User does not exist!')
    res.json(user)
})

router.post('/users', function (req, res, next) {
    console.log('received resp')
    const body = req.body;
    dataStorage.set(null, req.body)

    res.status(201).end();
})

router.put('/users/:id', function (req, res, next) {
    const userId = req.params.id;
    const user = dataStorage.get(userId)

    if (user) {
        dataStorage.update(userId, req.body)
    } else {
        dataStorage.set(userId, req.body)
        res.status(201);
    }

    res.end();
})

router.patch('/users/:id', function (req, res, next) {
    const userId = req.params.id;
    dataStorage.update(userId, req.body)

    res.end();
})

router.delete('/users/:id', function (req, res, next) {
    console.log('wow')
    const userId = req.params.id;
    const user = dataStorage.get(userId)

    dataStorage.del(userId)

    res.end()
})

module.exports = router;