# 🚀 Guia de Início Rápido

## Instalação Rápida (5 minutos)

### 1️⃣ Pré-requisitos
```bash
# Verificar Java
java -version  # Deve ser 17+

# Verificar Maven
mvn -version

# Verificar Node.js
node -v  # Deve ser 16+
npm -v

# Verificar MySQL
mysql --version
```

### 2️⃣ Configurar MySQL

**Opção A: MySQL Local**
```sql
-- Conectar ao MySQL
mysql -u root -p

-- Criar usuário (se necessário)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Os bancos de dados serão criados automaticamente
```

**Opção B: MySQL via Docker**
```bash
docker run --name sales-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  -d mysql:8.0
```

### 3️⃣ Iniciar o Sistema

**Método 1: Script Automático (Recomendado)**
```bash
cd sales-system
./scripts/start-all.sh
```

**Método 2: Docker Compose**
```bash
cd sales-system
docker-compose up -d
```

**Método 3: Manual (para desenvolvimento)**

```bash
# Terminal 1 - Service Registry
cd backend/service-registry
mvn spring-boot:run

# Terminal 2 - API Gateway (aguardar 30s)
cd backend/api-gateway
mvn spring-boot:run

# Terminal 3 - Product Service (aguardar 15s)
cd backend/product-service
mvn spring-boot:run

# Terminal 4 - Order Service (aguardar 15s)
cd backend/order-service
mvn spring-boot:run

# Terminal 5 - Frontend (aguardar 15s)
cd frontend
npm install
npm start
```

### 4️⃣ Acessar o Sistema

✅ **Frontend**: http://localhost:3000  
✅ **Service Registry**: http://localhost:8761  
✅ **API Gateway**: http://localhost:8080  

### 5️⃣ Testar a API

```bash
# Criar um produto
curl -X POST http://localhost:8080/api/products/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook Dell",
    "description": "Notebook Dell Inspiron 15",
    "price": 3500.00,
    "stock": 10,
    "category": "Eletrônicos",
    "active": true
  }'

# Listar produtos
curl http://localhost:8080/api/products/products

# Criar um pedido
curl -X POST http://localhost:8080/api/orders/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "João Silva",
    "customerEmail": "joao@email.com",
    "customerPhone": "(11) 99999-9999",
    "address": "Rua ABC, 123",
    "items": [
      {
        "productId": 1,
        "productName": "Notebook Dell",
        "quantity": 1,
        "price": 3500.00
      }
    ]
  }'

# Listar pedidos
curl http://localhost:8080/api/orders/orders
```

## 🛑 Parar o Sistema

**Com Script:**
```bash
./scripts/stop-all.sh
```

**Com Docker:**
```bash
docker-compose down
```

**Manual:**
```bash
# Pressione Ctrl+C em cada terminal
```

## 🐛 Solução de Problemas

### Porta já em uso
```bash
# Linux/Mac
sudo lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Erro de conexão com MySQL
- Verifique se o MySQL está rodando
- Confirme usuário/senha em `application.yml`
- Teste conexão: `mysql -u root -p`

### Serviços não registram no Eureka
- Aguarde 30-60 segundos
- Verifique logs em `logs/` 
- Acesse http://localhost:8761

### Frontend não carrega
- Limpe cache: `rm -rf node_modules package-lock.json`
- Reinstale: `npm install`
- Verifique se API Gateway está rodando

## 📊 Verificar Status

```bash
# Service Registry
curl http://localhost:8761/actuator/health

# API Gateway
curl http://localhost:8080/actuator/health

# Product Service
curl http://localhost:8081/actuator/health

# Order Service
curl http://localhost:8082/actuator/health
```

## 🎯 Próximos Passos

1. ✅ Explore o Dashboard
2. ✅ Cadastre produtos
3. ✅ Crie pedidos
4. ✅ Teste diferentes status de pedidos
5. ✅ Use a busca de produtos

## 📚 Documentação Completa

Consulte [README.md](README.md) para informações detalhadas sobre:
- Arquitetura completa
- Endpoints da API
- Configurações avançadas
- Desenvolvimento e contribuição
