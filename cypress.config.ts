import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL do frontend
    setupNodeEvents(on, config) {
      // Implementação de event listeners (se necessário)
    },
    env: {
      apiUrl: 'http://localhost:5000', // URL do backend
    },
    // Pasta onde ficarão os testes
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
