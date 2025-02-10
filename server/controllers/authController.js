const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config()

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'cadê você?' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'credenciais invalidas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};



const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {

        const user = await User.create({ username, password, role });

        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout bem-sucedido!" });
};

module.exports = { login, register, logout };