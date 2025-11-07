const express = require('express');
const cors = require('cors');
require('express-async-errors');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');
const { swaggerUi, specs } = require('./config/swagger');
const logger = require('./utils/logger');

const app = express();

// Middlewares globais
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    body: req.body,
    query: req.query,
  });
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando' });
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da API
app.use('/api', routes);

// Middleware de rota não encontrada
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;

