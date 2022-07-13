const DB = require('../db.config');
const fs = require('fs');

exports.getAllPublications = (req, res) => {
    DB.Publication.findAll()
        .then(publications => res.json({ data:publications }))
        .catch( err => res.status(500).json({ error: err}))
};

exports.getPublication = (req, res) => {
    // verification champ id est present et correct
    let publicationId = parseInt(req.params.id)

    DB.Publication.findOne({ where: {id: publicationId}, include: {model: DB.User, attributes:['email']} })
    .then(publication => {
        if((publication === null)) {
            return res.status(404).json({ message: "Publication n'existe pas !"})
        }
        return res.json({data: publication})
    })
    .catch(err => res.status(500).json({ error: err}))
};

exports.createPublication = (req, res) => {
    DB.Publication.create(req.body)
        .then(publication => res.json({ message: 'Publication created', data:publication}))
        .catch(err => res.status(500).json({ error: err}));
};

exports.updatePublication = (req, res) => {
    let publicationId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!publicationId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // Recherche de l'utilisateur
    DB.Publication.findOne({ where: {id: publicationId}, raw: true})
        .then(publication => {
            // Vérifier si la publication existe
            if(publication === null){
                return res.status(404).json({ message: 'This publication does not exist'})
            }
            // Mise a jour de la publication
            Publication.update(req.body, { where: {id: publicationId}})
                .then(publication => res.json({ message: 'Publication Updated'}))
                .catch(err => res.status(500).json({ error: err}));
        })
        .catch(err => res.status(500).json({ error: err}));
};

exports.untrashPublication = (req, res) => {
    let publicationId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!publicationId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }
    DB.Publication.restore({ where: {id: publicationId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ error: err}));
};

exports.trashPublication = (req, res) => {
    let publicationId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!publicationId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // mets l'utilisateur dans une corbeille
    DB.Publication.destroy({ where: {id: publicationId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ error: err}));
};

exports.deletePublication = (req, res) => {
    let publicationId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!publicationId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // suppression de l'utilisateur
    DB.Publication.destroy({ where: {id: publicationId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ error: err}));
};