const { DataTypes } = require('sequelize');

/**
 * modèle User
 */
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true        // Ici une validation de données
            }
        },
        password:{
            type: DataTypes.STRING(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i    // Ici une contrainte
        }
    }, { paranoid: true });          // softDelete

return User;
}
