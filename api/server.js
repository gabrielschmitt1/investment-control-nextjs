require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);

// Porta
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;  // Exporta a instância do app para ser usada nos testes
