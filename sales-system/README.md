# Sistema de Vendas - Microserviços

Sistema completo de vendas desenvolvido com arquitetura de microserviços.

## 🏗️ Arquitetura

### Backend (Java/Spring Boot)
- **Service Registry (Eureka)**: Porta 8761 - Registro e descoberta de serviços
- **API Gateway**: Porta 8080 - Gateway unificado para todos os serviços
- **Product Service**: Porta 8081 - Gerenciamento de produtos
- **Order Service**: Porta 8082 - Gerenciamento de pedidos

### Frontend (React)
- **React Application**: Porta 3000 - Interface do usuário

### Banco de Dados (MySQL)
- **product_db**: Banco de dados de produtos
- **order_db**: Banco de dados de pedidos

## 🚀 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.1.5
- Spring Cloud (Eureka, Gateway)
- Spring Data JPA
- MySQL 8.0
- Lombok
- Maven

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- JavaScript ES6+

## 📋 Pré-requisitos

- Java JDK 17 ou superior
- Maven 3.6+
- Node.js 16+ e npm
- MySQL 8.0+

## 🔧 Configuração do Banco de Dados

1. Instale o MySQL e inicie o serviço

2. Crie um usuário (ou use root):
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

3. Os bancos de dados serão criados automaticamente na primeira execução

## 📦 Instalação e Execução

### Backend

#### 1. Service Registry (Eureka)
```bash
cd backend/service-registry
mvn clean install
mvn spring-boot:run
```
Acesse: http://localhost:8761

#### 2. API Gateway
```bash
cd backend/api-gateway
mvn clean install
mvn spring-boot:run
```

#### 3. Product Service
```bash
cd backend/product-service
mvn clean install
mvn spring-boot:run
```

#### 4. Order Service
```bash
cd backend/order-service
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```
Acesse: http://localhost:3000

## 🌐 Endpoints da API

### Produtos (via Gateway)
- `GET /api/products/products` - Listar todos os produtos
- `GET /api/products/products/{id}` - Buscar produto por ID
- `POST /api/products/products` - Criar novo produto
- `PUT /api/products/products/{id}` - Atualizar produto
- `DELETE /api/products/products/{id}` - Excluir produto
- `GET /api/products/products/search?name={name}` - Buscar produtos por nome

### Pedidos (via Gateway)
- `GET /api/orders/orders` - Listar todos os pedidos
- `GET /api/orders/orders/{id}` - Buscar pedido por ID
- `POST /api/orders/orders` - Criar novo pedido
- `PATCH /api/orders/orders/{id}/status?status={status}` - Atualizar status
- `DELETE /api/orders/orders/{id}` - Cancelar pedido
- `GET /api/orders/orders/customer/{email}` - Buscar pedidos por cliente

## 📊 Estrutura do Projeto

```
sales-system/
├── backend/
│   ├── service-registry/        # Eureka Server
│   ├── api-gateway/             # API Gateway
│   ├── product-service/         # Serviço de Produtos
│   └── order-service/           # Serviço de Pedidos
├── frontend/                    # Aplicação React
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── README.md
```

## 🔐 Segurança

- CORS configurado para aceitar requisições do frontend (localhost:3000)
- Comunicação entre microserviços via Eureka
- Gateway como ponto único de entrada

## 📝 Funcionalidades

### Produtos
- ✅ Cadastro de produtos
- ✅ Listagem de produtos
- ✅ Edição de produtos
- ✅ Exclusão lógica (inativação)
- ✅ Busca por nome
- ✅ Controle de estoque

### Pedidos
- ✅ Criação de pedidos
- ✅ Listagem de pedidos
- ✅ Atualização de status
- ✅ Cancelamento de pedidos
- ✅ Cálculo automático de totais
- ✅ Múltiplos itens por pedido

### Dashboard
- ✅ Total de produtos
- ✅ Total de pedidos
- ✅ Receita total
- ✅ Pedidos pendentes

## 🎨 Interface

- Design responsivo com Material-UI
- Menu lateral com navegação
- Tabelas interativas
- Formulários validados
- Feedback visual para ações

## 🔄 Status de Pedidos

- `PENDING` - Pendente
- `CONFIRMED` - Confirmado
- `PROCESSING` - Processando
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

## 🛠️ Desenvolvimento

### Ordem de Inicialização
1. MySQL
2. Service Registry (Eureka)
3. API Gateway
4. Product Service
5. Order Service
6. Frontend React

### Variáveis de Ambiente (application.yml)

Você pode personalizar as configurações em cada `application.yml`:
- Portas dos serviços
- Credenciais do banco de dados
- URLs do Eureka
- Configurações de CORS

## 📚 Documentação Adicional

- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é livre para uso educacional e comercial.

## ✨ Autor

Sistema desenvolvido como exemplo de arquitetura de microserviços.
