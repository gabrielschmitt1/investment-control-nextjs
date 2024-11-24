const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../mock/users');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Todos os campos são obrigatórios!'
      });
    }

    // Verifica se o email já está em uso
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(409).json({
        message: 'Este email já está em uso!'
      });
    }

    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria o novo usuário
    const newUser = {
      id: users.length + 1, // Simples geração de ID para mock
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Adiciona ao array de usuários (mock)
    users.push(newUser);

    // Gera o token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna sucesso e token
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      token
    });

  } catch (error) {
    console.error('Erro no signup:', error);
    res.status(500).json({
      message: 'Erro ao criar usuário!'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário existe
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado!' });
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciais inválidas!' });
  }

  // Gera o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login realizado com sucesso!', token });
});

// Rota protegida de exemplo
router.get('/home', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Você acessou uma rota protegida!', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido!' });
  }
});

module.exports = router;