const request = require('supertest');
const app = require('../server'); // O caminho depende de onde está o seu arquivo principal do servidor
const users = require('../mock/users'); // Importa o mock para testes

describe('Testes para a rota de autenticação', () => {
  test('Deve retornar um token JWT ao enviar credenciais válidas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@teste.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Deve retornar erro para credenciais inválidas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@teste.com',
        password: 'senhaerrada',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas!');
  });

  test('Deve retornar erro se o email não existir', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'naoexiste@teste.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado!');
  });
});

describe('Testes para a rota /home', () => {
  let token;

  // Obter um token válido antes dos testes
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@teste.com',
        password: '123456',
      });
    token = response.body.token;
  });

  test('Deve acessar a rota /home com um token válido', async () => {
    const response = await request(app)
      .get('/api/auth/home')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Você acessou uma rota protegida!');
  });

  test('Deve negar acesso sem um token', async () => {
    const response = await request(app).get('/api/auth/home');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido!');
  });

  test('Deve negar acesso com um token inválido', async () => {
    const response = await request(app)
      .get('/api/auth/home')
      .set('Authorization', 'Bearer token_invalido');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido!');
  });
});

