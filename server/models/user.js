const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user' // Define um valor padrão para o campo "role"
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10); // Hash da senha antes de salvar
        }
    }
});

// Defina as associações
User.associate = (models) => {
    User.hasMany(models.URL, { foreignKey: 'userId' }); // Um usuário pode ter muitas URLs
};

module.exports = User;