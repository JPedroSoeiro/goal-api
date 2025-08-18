const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Goal-Wise API',
      version: '1.0.0',
      description: 'Documentação da API do projeto Goal-Wise. Aqui você pode encontrar informações sobre todos os endpoints disponíveis e testá-los diretamente.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Altere a porta se necessário
        description: 'Servidor de Desenvolvimento',
      },
    ],
    // Mantenha o components AQUI e apenas AQUI
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;