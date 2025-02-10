const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

// Configuração do Express
const app = express();

// Middlewares
app.use(cors()); 
app.use(bodyParser.json()); 

// Rotas
app.use('/api/auth', authRoutes); 
app.use('/api/url', urlRoutes); 


const PORT = process.env.PORT || 5000; 

sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });