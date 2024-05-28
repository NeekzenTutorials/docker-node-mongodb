const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example.controller.js');

router.post('/example', exampleController.create);

router.get('/example', exampleController.findAll);

router.get('/example/:id', exampleController.findOne);

router.put('/example/:id', exampleController.update);

router.delete('/example/:id', exampleController.delete);

module.exports = router;