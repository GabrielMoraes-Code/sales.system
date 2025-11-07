const notaFiscalService = require('../services/notaFiscalService');
const saleService = require('../services/saleService');

class NotaFiscalController {
  async emitir(req, res) {
    try {
      const { saleId } = req.params;

      // Buscar dados completos da venda
      const sale = await saleService.getSaleById(saleId);

      if (!sale) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      // Preparar dados para emissão
      const saleData = {
        sale: {
          id: sale.id,
          date: sale.date,
          total: sale.total,
          discount: sale.discount,
          paymentMethod: sale.paymentMethod,
        },
        client: sale.client,
        items: sale.items,
      };

      // Emitir nota fiscal
      const result = await notaFiscalService.emitirNotaFiscal(saleData);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async consultar(req, res) {
    try {
      const { notaFiscalId } = req.params;
      const result = await notaFiscalService.consultarNotaFiscal(notaFiscalId);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cancelar(req, res) {
    try {
      const { notaFiscalId } = req.params;
      const { motivo } = req.body;

      if (!motivo) {
        return res.status(400).json({ error: 'Motivo do cancelamento é obrigatório' });
      }

      const result = await notaFiscalService.cancelarNotaFiscal(notaFiscalId, motivo);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NotaFiscalController();

