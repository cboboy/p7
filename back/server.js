/**
 * imortation des modules
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const user_router = require('./routes/users');
const publication_router = require('./routes/publications');
const auth_router = require('./middleware/auth');


/**
 * import de la connexion à la bdd
 */
let DB = require('./db.config')

/**
 * initialisation de l'API
 */
const app = express();

/**
 * middleware
 */
app.use(cors());

// express.json() est un middleware express intégré qui convertit le corps de la requête en JSON.
app.use(express.json());

// express.urlencoded() tout comme express.json() convertit le corps de la requête en JSON,
// il exécute également d'autres fonctionnalités telles que : convertir les données de formulaire en JSON, etc.
app.use(express.urlencoded({ extended: true}));

/**
 * routage
 */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users' ,user_router);
app.use('/publications' ,publication_router);
app.use('/auth' ,auth_router.login);
/**
 * Start server avec test DB
 */
DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
        console.log(`serveur demarré sur le port ${process.env.SERVER_PORT}`)
        });
    })
    .catch(err => console.log('Database Error', err));
