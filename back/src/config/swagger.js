const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Vendas',
      version: '1.0.0',
      description: 'API RESTful para sistema de vendas com autenticação JWT, gerenciamento de produtos, clientes e vendas',
      contact: {
        name: 'Suporte',
        email: 'suporte@sistemavendas.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['ADMIN', 'VENDEDOR', 'CAIXA'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            sku: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'integer' },
            minStock: { type: 'integer' },
            category: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            cpf: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Sale: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            date: { type: 'string', format: 'date-time' },
            subtotal: { type: 'number' },
            discount: { type: 'number' },
            total: { type: 'number' },
            paymentMethod: { type: 'string' },
            status: { type: 'string' },
            clientId: { type: 'integer', nullable: true },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

