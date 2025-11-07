#!/bin/bash

echo "🛑 Parando Sistema de Vendas - Microserviços"
echo "================================================"

# Diretório raiz do projeto
PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
LOGS_DIR="$PROJECT_ROOT/logs"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Função para parar um serviço
stop_service() {
    SERVICE_NAME=$1
    PID_FILE="$LOGS_DIR/$SERVICE_NAME.pid"
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        echo -e "${RED}Parando $SERVICE_NAME (PID: $PID)...${NC}"
        kill $PID 2>/dev/null || echo "Processo já finalizado"
        rm -f "$PID_FILE"
        echo -e "${GREEN}✓ $SERVICE_NAME parado${NC}"
    else
        echo "⚠️  $SERVICE_NAME não está rodando"
    fi
}

# Parar serviços na ordem inversa
stop_service "frontend"
stop_service "Order Service"
stop_service "Product Service"
stop_service "API Gateway"
stop_service "Service Registry"

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✨ Todos os serviços foram parados!${NC}"
echo -e "${GREEN}================================================${NC}"
