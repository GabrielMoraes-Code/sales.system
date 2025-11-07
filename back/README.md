# Sistema de Vendas - Backend API

API RESTful para sistema de vendas desenvolvida com Node.js, Express, Prisma e MySQL.

## Funcionalidades

- **Autenticação JWT** com diferentes perfis de usuário (Admin, Vendedor, Caixa)
- **CRUD completo** para Produtos, Clientes e Vendas
- **Relacionamentos** entre tabelas (vendas vinculadas a clientes e produtos)
- **Validação de dados** com Zod
- **Middleware de erros** e logs com Winston
- **Documentação interativa** com Swagger
- **CORS** habilitado para comunicação com front-end
- **Integração com API de Nota Fiscal** (estrutura pronta)

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT (jsonwebtoken)
- Zod (validação)
- Winston (logs)
- Swagger (documentação)
- Bcrypt (hash de senhas)

## Pré-requisitos

- Node.js 14+ instalado
- MySQL 5.7+ ou 8.0+ instalado e rodando
- npm ou yarn

## Instalação

1. Clone o repositório ou extraia o arquivo zip

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/sistema_vendas"
JWT_SECRET="seu_segredo_jwt_aqui"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

4. Gere o cliente Prisma:
```bash
npm run prisma:generate
```

5. Execute as migrações do banco de dados:
```bash
npm run prisma:migrate
```

6. (Opcional) Popule o banco com dados iniciais:
```bash
npm run prisma:seed
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrações do banco de dados
- `npm run prisma:studio` - Abre o Prisma Studio (interface visual do banco)
- `npm run prisma:seed` - Popula o banco com dados iniciais

## Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```

## Estrutura do Projeto

```
src/
├── config/             # Configurações (env, swagger)
├── controllers/        # Controllers (lógica de requisições)
├── middlewares/        # Middlewares (auth, erros, CORS)
├── models/             # Cliente Prisma
├── routes/             # Definição de rotas
├── services/           # Lógica de negócio
├── utils/              # Utilitários (logger, validação)
├── app.js              # Configuração do Express
└── server.js           # Ponto de entrada
```

## Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil do usuário autenticado

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Obter produto por ID
- `POST /api/products` - Criar novo produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto
- `GET /api/products/low-stock` - Produtos com estoque baixo

### Clientes
- `GET /api/clients` - Listar todos os clientes
- `GET /api/clients/:id` - Obter cliente por ID (com histórico de compras)
- `POST /api/clients` - Criar novo cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente

### Vendas
- `GET /api/sales` - Listar todas as vendas
- `GET /api/sales/:id` - Obter venda por ID
- `POST /api/sales` - Criar nova venda
- `DELETE /api/sales/:id` - Deletar venda
- `GET /api/sales/date-range` - Vendas por período

### Nota Fiscal
- `POST /api/nota-fiscal/emitir/:saleId` - Emitir nota fiscal
- `GET /api/nota-fiscal/consultar/:notaFiscalId` - Consultar nota fiscal
- `POST /api/nota-fiscal/cancelar/:notaFiscalId` - Cancelar nota fiscal

## Usuários de Teste (após seed)

```
Admin:
- Email: admin@sistema.com
- Senha: admin123

Vendedor:
- Email: vendedor@sistema.com
- Senha: vendedor123

Caixa:
- Email: caixa@sistema.com
- Senha: caixa123
```

## Integração com Front-end

O CORS está configurado para aceitar requisições do front-end React. Por padrão, aceita requisições de `http://localhost:5173`. Para alterar, modifique a variável `FRONTEND_URL` no arquivo `.env`.

## Segurança

- Senhas são criptografadas com bcrypt
- Autenticação via JWT
- Validação de dados em todas as requisições
- Controle de acesso baseado em perfis de usuário

## Logs

Os logs são salvos na pasta `logs/`:
- `error.log` - Apenas erros
- `combined.log` - Todos os logs

## Licença

ISC

