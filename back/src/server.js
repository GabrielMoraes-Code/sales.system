const app = require('./app');
const { port } = require('./config/env');
const logger = require('./utils/logger');
const prisma = require('./models');

const startServer = async () => {
  try {
    // Testar conexão com o banco de dados
    await prisma.$connect();
    logger.info('Conexão com o banco de dados estabelecida com sucesso');

    // Iniciar servidor
    app.listen(port, () => {
      logger.info(`Servidor rodando na porta ${port}`);
      logger.info(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
      logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

