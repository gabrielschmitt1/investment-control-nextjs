/// <reference types="cypress" />

describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('/login'); // Acessa a página de login
  });

  it('deve renderizar a página de login corretamente', () => {
    cy.get('h1').contains('Entre na sua conta').should('be.visible');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="remember"]').should('exist');
    cy.get('button[type="submit"]').contains('Entrar').should('be.enabled');
  });

  it('deve exibir erros de validação para campos vazios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input:invalid').should('have.length', 2); // Email e senha são obrigatórios
  });

  it.only('deve fazer login com sucesso com credenciais válidas', () => {
    const email = 'teste@teste.com';
    const senha = '123456';

    // Simula a API de login para retornar sucesso
    cy.intercept('POST', 'http://localhost:5000/api/auth/login', {
      statusCode: 200,
      body: { token: 'fakeToken' },
    }).as('loginRequest');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
      email,
      password: senha,
      remember: false, // Estado padrão
    });

    // Verifica redirecionamento para a página inicial
    cy.url().should('include', '/dashboard');
  });

  it('deve exibir uma mensagem de erro com credenciais inválidas', () => {
    const email = 'user@teste.com';
    const senha = 'senhaErrada';
  
    // Simula falha na API de login
    cy.intercept('POST', 'http://localhost:5000/api/auth/login', {
      statusCode: 401,
      body: { message: 'Credenciais inválidas!' },
    }).as('loginRequest');
  
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('button[type="submit"]').click();
  
    // Espera a interceptação ser chamada
    cy.wait('@loginRequest');
  
    // Verifica se a mensagem de erro está visível
    cy.get('#error-message').should('be.visible').and('contain', 'Credenciais inválidas!');
  });

  it('deve alternar o checkbox "lembrar-me"', () => {
    cy.get('input[name="remember"]').as('checkboxLembrar');
    cy.get('@checkboxLembrar').should('not.be.checked');

    cy.get('@checkboxLembrar').click();
    cy.get('@checkboxLembrar').should('be.checked');

    cy.get('@checkboxLembrar').click();
    cy.get('@checkboxLembrar').should('not.be.checked');
  });

  it('deve navegar para a página de cadastro ao clicar em "Cadastre-se"', () => {
    cy.contains('Cadastre-se').click();
    cy.url().should('include', '/signup');
  });

  it('deve desativar o botão de envio durante o carregamento', () => {
    cy.intercept('POST', 'http://localhost:5000/api/auth/login', {
      delayMs: 1000, // Simula um atraso de 1 segundo
      body: { token: 'fakeToken' },
      statusCode: 200,
    }).as('loginRequest');
  
    cy.get('input[name="email"]').type('user@teste.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  
    // Verifica que o botão está desabilitado durante o carregamento
    cy.get('button[type="submit"]').should('be.disabled');
  
    // Espera a resposta da requisição
    cy.wait('@loginRequest');
  
    // Verifica se o botão foi reabilitado após o carregamento
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
