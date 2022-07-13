const { Sequelize } = require('sequelize');

/**
 * connexion a la bdd
 */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

/**
 * Mise en place deq relations
 */
const db = {};

db.sequelize = sequelize;
db.User = require('./models/User')(sequelize);
db.Publication = require('./models/Publication')(sequelize);

db.User.hasMany(db.Publication, {foreignKey: 'user_id', onDelete: 'cascade'});
db.Publication.belongsTo(db.User, {foreignKey: 'user_id'});

/**
* Synchronisation des modèles
*/
// sequelize.sync(err => {
//     console.log('Database Sync Error', err)
// });
db.sequelize.sync({alter: true});

module.exports = db;