# Projeto de Estudo: Sistema de Login com Next.js e Node.js

Este é um projeto de estudo pessoal que utiliza **Next.js** no frontend e **Node.js** no backend. O objetivo é aprender sobre o desenvolvimento de aplicações full-stack, utilizando as tecnologias mais atuais para criação de um sistema de login simples.

## Tecnologias Utilizadas

### Frontend:
- **Next.js**: Framework React para construção do frontend.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Cypress**: Ferramenta para testes automatizados E2E (End-to-End).
- **Axios**: Biblioteca para realizar requisições HTTP.

### Backend:
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework minimalista para construção de APIs.
- **JWT (JSON Web Token)**: Para autenticação de usuários.
- **Bcrypt**: Para hashing de senhas e garantir segurança no armazenamento.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

1. **Frontend**: Localizado na pasta `frontend/` e construído com **Next.js**. A aplicação oferece uma interface de login com integração com o backend.
   
2. **Backend**: Localizado na pasta `backend/` e construído com **Node.js** e **Express**. Ele fornece uma API RESTful para login e registro de usuários, utilizando JWT para autenticação.

## Como Rodar o Projeto

### Pré-requisitos
Antes de rodar o projeto, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

### 1. Backend
Navegue até a pasta `backend/` e siga os passos abaixo:

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

### 2. Frontend
Navegue até a pasta `frontend/` e siga os passos abaixo:

```bash
# Navegue até a pasta do backend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

### 3. Testes
Navegue até a pasta `frontend/` e siga os passos abaixo:

```bash
# No diretório frontend
npm run test

```

### Rodando pipeline de CI (Github Actions)
Este projeto está configurado para rodar testes automaticamente sempre que um novo código for enviado para o GitHub. A pipeline de CI/CD foi configurada com o GitHub Actions. Para mais detalhes, consulte o arquivo .github/workflows/cypress-tests.yml.

```bash
/frontend
    /node_modules
    package.json
    pages/
    components/
    ...

/backend
    /node_modules
    package.json
    server.js
    ...

/.github
    /workflows
        cypress-tests.yml
```
### Scripts do Projeto

Backend:
 - npm run dev: Inicia o servidor de desenvolvimento com o nodemon.
 - npm test: Executa os testes unitários com Jest.

Frontend:
 - npm run dev: Inicia o servidor de desenvolvimento do Next.js.
 - npm run build: Constrói a aplicação para produção.
 - npm run start: Inicia a aplicação em modo produção.
 - npm run lint: Roda o ESLint para verificar problemas de estilo de código.
 - npm run test: Executa os testes automatizados com Cypress.

### Contribuições
Este é um projeto de estudo pessoal, mas se você quiser contribuir, sinta-se à vontade para abrir um pull request com melhorias ou correções de bugs!

### Licença
Este projeto está licenciado sob a Licença ISC.