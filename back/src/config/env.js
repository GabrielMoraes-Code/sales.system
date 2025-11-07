require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  notaFiscalApi: {
    url: process.env.NOTA_FISCAL_API_URL,
    apiKey: process.env.NOTA_FISCAL_API_KEY,
  },
};

