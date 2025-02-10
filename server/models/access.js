const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Access = sequelize.define('Access', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    urlId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accessedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Access.associate = (models) => {
    Access.belongsTo(models.URL, { foreignKey: 'urlId' });
};

module.exports = Access;