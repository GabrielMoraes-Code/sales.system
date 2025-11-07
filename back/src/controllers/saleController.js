const saleService = require('../services/saleService');

class SaleController {
  async getAll(req, res) {
    try {
      const sales = await saleService.getAllSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const sale = await saleService.getSaleById(req.params.id);
      res.json(sale);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const sale = await saleService.createSale(req.body);
      res.status(201).json(sale);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await saleService.deleteSale(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Datas de início e fim são obrigatórias' });
      }

      const sales = await saleService.getSalesByDateRange(startDate, endDate);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SaleController();

