const Example = require('../models/example.model.js');

// Ajouter une donnée
exports.create = (req, res) => {
    console.log("Received data:", req.body); // Log pour vérifier les données reçues
    const example = new Example({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });

    example.save()
        .then(data => {
            console.log("Data saved:", data); // Log pour vérifier les données insérées
            res.send(data);
        })
        .catch(err => {
            console.log("Error saving data:", err); // Log en cas d'erreur
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création de l'exemple."
            });
        });
};

// Récupérer toutes les données
exports.findAll = (req, res) => {
    Example.find()
        .then(examples => {
            res.send(examples);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des exemples."
            });
        });
};

// Récupérer une seule donnée par ID
exports.findOne = (req, res) => {
    Example.findById(req.params.id)
        .then(example => {
            if(!example) {
                return res.status(404).send({
                    message: "Exemple non trouvé avec l'id " + req.params.id
                });
            }
            res.send(example);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Exemple non trouvé avec l'id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'exemple avec l'id " + req.params.id
            });
        });
};

// Supprimer une donnée
exports.delete = (req, res) => {
    Example.findByIdAndRemove(req.params.id)
        .then(example => {
            if(!example) {
                return res.status(404).send({
                    message: "Exemple non trouvé avec l'id " + req.params.id
                });
            }
            res.send({message: "Exemple supprimé avec succès!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Exemple non trouvé avec l'id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Impossible de supprimer l'exemple avec l'id " + req.params.id
            });
        });
};

// Modifier une donnée
exports.update = (req, res) => {
    Example.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }, {new: true})
    .then(example => {
        if(!example) {
            return res.status(404).send({
                message: "Exemple non trouvé avec l'id " + req.params.id
            });
        }
        res.send(example);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Exemple non trouvé avec l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour de l'exemple avec l'id " + req.params.id
        });
    });
};