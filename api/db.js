const sqlite3 = require('sqlite3').verbose();

// Cria ou abre um banco de dados SQLite (o arquivo será chamado database.db)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Cria a tabela de usuários se ela não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;
