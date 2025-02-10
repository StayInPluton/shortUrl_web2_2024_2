const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const URL = sequelize.define('URL', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

// Defina as associações
URL.associate = (models) => {
    URL.belongsTo(models.User, { foreignKey: 'userId' }); // Uma URL pertence a um usuário
    URL.hasMany(models.Access, { foreignKey: 'urlId' }); // Uma URL pode ter muitos acessos
};

module.exports = URL;