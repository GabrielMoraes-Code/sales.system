const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
  });

  // Erro de validação do Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'Erro de validação',
      message: 'Registro duplicado. Este valor já existe no banco de dados.',
    });
  }

  // Erro de registro não encontrado do Prisma
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Não encontrado',
      message: 'O registro solicitado não foi encontrado.',
    });
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido',
      message: 'O token fornecido é inválido.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado',
      message: 'O token fornecido expirou.',
    });
  }

  // Erro genérico
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.url} não existe.`,
  });
};

module.exports = { errorHandler, notFoundHandler };

