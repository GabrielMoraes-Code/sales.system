const axios = require('axios');
const { notaFiscalApi } = require('../config/env');
const logger = require('../utils/logger');

class NotaFiscalService {
  /**
   * Emitir nota fiscal para uma venda
   * @param {Object} saleData - Dados da venda
   * @returns {Promise<Object>} Resposta da API de nota fiscal
   */
  async emitirNotaFiscal(saleData) {
    try {
      const { sale, client, items } = saleData;

      // Estrutura de dados para envio à API de nota fiscal
      const notaFiscalPayload = {
        numero_venda: sale.id,
        data_emissao: sale.date,
        valor_total: parseFloat(sale.total),
        valor_desconto: parseFloat(sale.discount),
        forma_pagamento: sale.paymentMethod,
        
        // Dados do cliente (se houver)
        cliente: client ? {
          nome: client.name,
          email: client.email,
          telefone: client.phone,
          cpf: client.cpf,
        } : null,
        
        // Itens da venda
        itens: items.map(item => ({
          descricao: item.product.name,
          codigo: item.product.sku,
          quantidade: item.quantity,
          valor_unitario: parseFloat(item.price),
          valor_total: parseFloat(item.price) * item.quantity,
        })),
      };

      logger.info('Enviando dados para API de Nota Fiscal', { saleId: sale.id });

      // Fazer requisição para a API externa de nota fiscal
      const response = await axios.post(
        `${notaFiscalApi.url}/emitir`,
        notaFiscalPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${notaFiscalApi.apiKey}`,
          },
          timeout: 30000, // 30 segundos
        }
      );

      logger.info('Nota fiscal emitida com sucesso', {
        saleId: sale.id,
        notaFiscalId: response.data.id,
      });

      return {
        success: true,
        notaFiscal: response.data,
        message: 'Nota fiscal emitida com sucesso',
      };
    } catch (error) {
      logger.error('Erro ao emitir nota fiscal', {
        error: error.message,
        saleId: saleData.sale?.id,
      });

      // Se a API externa falhar, retornar erro mas não bloquear a venda
      return {
        success: false,
        error: error.message,
        message: 'Erro ao emitir nota fiscal. A venda foi registrada, mas a nota fiscal não foi gerada.',
      };
    }
  }

  /**
   * Consultar status de uma nota fiscal
   * @param {string} notaFiscalId - ID da nota fiscal
   * @returns {Promise<Object>} Status da nota fiscal
   */
  async consultarNotaFiscal(notaFiscalId) {
    try {
      const response = await axios.get(
        `${notaFiscalApi.url}/consultar/${notaFiscalId}`,
        {
          headers: {
            'Authorization': `Bearer ${notaFiscalApi.apiKey}`,
          },
          timeout: 15000,
        }
      );

      return {
        success: true,
        notaFiscal: response.data,
      };
    } catch (error) {
      logger.error('Erro ao consultar nota fiscal', {
        error: error.message,
        notaFiscalId,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Cancelar uma nota fiscal
   * @param {string} notaFiscalId - ID da nota fiscal
   * @param {string} motivo - Motivo do cancelamento
   * @returns {Promise<Object>} Resultado do cancelamento
   */
  async cancelarNotaFiscal(notaFiscalId, motivo) {
    try {
      const response = await axios.post(
        `${notaFiscalApi.url}/cancelar/${notaFiscalId}`,
        { motivo },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${notaFiscalApi.apiKey}`,
          },
          timeout: 30000,
        }
      );

      logger.info('Nota fiscal cancelada com sucesso', { notaFiscalId });

      return {
        success: true,
        message: 'Nota fiscal cancelada com sucesso',
        data: response.data,
      };
    } catch (error) {
      logger.error('Erro ao cancelar nota fiscal', {
        error: error.message,
        notaFiscalId,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new NotaFiscalService();

