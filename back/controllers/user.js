const bcrypt = require('bcrypt');

const DB = require('../db.config');

exports.getAllUsers = (req, res) => {
    DB.User.findAll({paranoid: false})
        .then(users => res.json({ data:users }))
        .catch( err => res.status(500).json({ message: 'Database error', error: err}))
};

exports.getUser = (req, res) => {
    // verification champ id est present et correct
    let userId = parseInt(req.params.id);

    DB.User.findOne({ where: {id: userId}, raw: true})
    .then(user => {
        if((user === null)) {
            return res.status(404).json({ message: "Utilisateur n'existe pas !"})
        }
        return res.json({data: user})
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err}))
};

exports.addUser = (req, res) => {
    const { email, password } = req.body;

    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Missing Data'})
    }

    DB.User.findOne({ where: { email: email }, raw: true })
        
        .then(user => {
            // Vérification si l'utilisateur existe déjà
            if( user !== null){
                return res.status(409).json({ message: 'The email already exists !'})
            }

                // hashage du password
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    req.body.password = hash;
                    
                    DB.User.create(req.body)
                        .then(user => res.json({ message: 'User created', data:user}))
                        .catch(err => res.status(503).json({ message: 'Database error', error: err}));
                })
                .catch(err => res.status(501).json({ message: 'Hash process error', error: err}));
        })     
        .catch(err => res.status(512).json({ message: 'Database error', error: err}));
};

exports.updateUser = (req, res) => {
    let userId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // Recherche de l'utilisateur
    DB.User.findOne({ where: {id: userId}, raw: true})
        .then(user => {
            // Vérifier si l'utilisateur existe
            if(user === null){
                return res.status(404).json({ message: 'This user does not exist'})
            }
            // Mise a jour de l'utilisateur
            DB.User.update(req.body, { where: {id: userId}})
                .then(user => res.json({ message: 'User Updated'}))
                .catch(err => res.status(500).json({ message: 'Database error', error: err}));
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err}));
};

exports.untrashUser = (req, res) => {
    let userId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }
    DB.User.restore({ where: {id: userId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err}));
};

exports.trashUser = (req, res) => {
    let userId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // mets l'utilisateur dans une corbeille
    DB.User.destroy({ where: {id: userId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err}));
};

exports.deleteUser = (req, res) => {
    let userId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // suppression de l'utilisateur
    DB.User.destroy({ where: {id: userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err}));
};