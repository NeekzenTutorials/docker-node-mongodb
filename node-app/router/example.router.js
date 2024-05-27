const express = require('express');
const router = express.Router();

// Importer le contrôleur
const exampleController = require('../controllers/example.controller.js');

// Créer une nouvelle donnée
router.post('/example', exampleController.create);

// Récupérer toutes les données
router.get('/example', exampleController.findAll);

// Récupérer une seule donnée avec l'id
router.get('/example/:id', exampleController.findOne);

// Mettre à jour une donnée avec l'id
router.put('/example/:id', exampleController.update);

// Supprimer une donnée avec l'id
router.delete('/example/:id', exampleController.delete);

module.exports = router;