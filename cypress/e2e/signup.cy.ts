/// <reference types="cypress" />

describe('Página de Cadastro', () => {
  beforeEach(() => {
    cy.visit('/signup'); // Acessa a página de cadastro
  });

  it('deve renderizar a página de cadastro corretamente', () => {
    cy.get('h1').contains('Crie sua conta').should('be.visible');
    cy.get('form').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="confirmPassword"]').should('exist');
    cy.get('input[name="terms"]').should('exist');
    cy.get('button[type="submit"]').contains('Criar conta').should('be.enabled');
  });

  it('deve exibir erros de validação para campos vazios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input:invalid').should('have.length', 5); // Todos os campos são obrigatórios
  });

  it('deve exibir mensagem de erro para senhas diferentes', () => {
    cy.get('input[name="name"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senhaErrada');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    cy.get('#error-message').should('be.visible').and('contain', 'As senhas não coincidem');
  });

  it('deve exibir mensagem de erro se a senha for curta', () => {
    cy.get('input[name="name"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@teste.com');
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirmPassword"]').type('123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    cy.get('#error-message').should('be.visible').and('contain', 'A senha deve ter pelo menos 6 caracteres');
  });

  it('deve cadastrar com sucesso com dados válidos', () => {
    const nome = 'João Silva';
    const email = 'joao@teste.com';
    const senha = 'senha123';

    // Simula sucesso na API de cadastro
    cy.intercept('POST', 'http://localhost:5000/api/auth/signup', {
      statusCode: 200,
      body: { token: 'fakeToken' },
    }).as('signupRequest');

    cy.get('input[name="name"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    cy.wait('@signupRequest').its('request.body').should('deep.equal', {
      name: nome,
      email,
      password: senha,
    });

    cy.url().should('include', '/dashboard'); // Redireciona para a página inicial
  });

  it('deve exibir uma mensagem de erro se a API retornar falha', () => {
    const nome = 'João Silva';
    const email = 'joao@teste.com';
    const senha = 'senha123';

    // Simula falha na API de cadastro
    cy.intercept('POST', 'http://localhost:5000/api/auth/signup', {
      statusCode: 400,
      body: { message: 'Erro ao criar conta. Tente novamente.' },
    }).as('signupRequest');

    cy.get('input[name="name"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[name="confirmPassword"]').type(senha);
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    cy.wait('@signupRequest');
    cy.get('#error-message').should('be.visible').and('contain', 'Erro ao criar conta. Tente novamente.');
  });

  it('deve desativar o botão de envio durante o carregamento', () => {
    cy.intercept('POST', 'http://localhost:5000/api/auth/signup', {
      delayMs: 1000, // Simula um atraso de 1 segundo
      body: { token: 'fakeToken' },
      statusCode: 200,
    }).as('signupRequest');

    cy.get('input[name="name"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait('@signupRequest');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('deve navegar para a página de login ao clicar em "Entre aqui"', () => {
    cy.contains('Entre aqui').click();
    cy.url().should('include', '/login');
  });
});
