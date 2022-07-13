const { DataTypes } = require('sequelize');

/**
 * modèle Publication
 */
module.exports = (sequelize) => {
    return Publication = sequelize.define('Publication', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        titre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(100),
        },
    }, { paranoid: true });             // softDelete
}
