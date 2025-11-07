#!/bin/bash

echo "🚀 Iniciando Sistema de Vendas - Microserviços"
echo "================================================"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se o MySQL está rodando
echo -e "${BLUE}📦 Verificando MySQL...${NC}"
if ! pgrep -x "mysqld" > /dev/null
then
    echo "⚠️  MySQL não está rodando. Por favor, inicie o MySQL primeiro."
    exit 1
fi
echo -e "${GREEN}✓ MySQL está rodando${NC}"

# Diretório raiz do projeto
PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)

# Função para iniciar um serviço
start_service() {
    SERVICE_NAME=$1
    SERVICE_PATH=$2
    PORT=$3
    
    echo -e "\n${BLUE}🔧 Iniciando $SERVICE_NAME na porta $PORT...${NC}"
    cd "$PROJECT_ROOT/$SERVICE_PATH"
    
    # Verificar se já foi compilado
    if [ ! -d "target" ]; then
        echo "📦 Compilando $SERVICE_NAME..."
        mvn clean install -DskipTests > /dev/null 2>&1
    fi
    
    # Iniciar em background
    nohup mvn spring-boot:run > "$PROJECT_ROOT/logs/$SERVICE_NAME.log" 2>&1 &
    echo $! > "$PROJECT_ROOT/logs/$SERVICE_NAME.pid"
    
    echo -e "${GREEN}✓ $SERVICE_NAME iniciado (PID: $(cat "$PROJECT_ROOT/logs/$SERVICE_NAME.pid"))${NC}"
}

# Criar diretório de logs
mkdir -p "$PROJECT_ROOT/logs"

# 1. Service Registry (Eureka)
start_service "Service Registry" "backend/service-registry" 8761
sleep 30

# 2. API Gateway
start_service "API Gateway" "backend/api-gateway" 8080
sleep 15

# 3. Product Service
start_service "Product Service" "backend/product-service" 8081
sleep 15

# 4. Order Service
start_service "Order Service" "backend/order-service" 8082
sleep 15

# 5. Frontend React
echo -e "\n${BLUE}🎨 Iniciando Frontend React na porta 3000...${NC}"
cd "$PROJECT_ROOT/frontend"

if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    npm install > /dev/null 2>&1
fi

nohup npm start > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
echo $! > "$PROJECT_ROOT/logs/frontend.pid"
echo -e "${GREEN}✓ Frontend iniciado (PID: $(cat "$PROJECT_ROOT/logs/frontend.pid"))${NC}"

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✨ Sistema iniciado com sucesso!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "📊 Service Registry: http://localhost:8761"
echo "🌐 API Gateway: http://localhost:8080"
echo "📦 Product Service: http://localhost:8081"
echo "🛒 Order Service: http://localhost:8082"
echo "💻 Frontend: http://localhost:3000"
echo ""
echo "📝 Logs disponíveis em: $PROJECT_ROOT/logs/"
echo ""
echo "Para parar todos os serviços, execute: ./scripts/stop-all.sh"
