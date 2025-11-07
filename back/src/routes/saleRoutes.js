const express = require('express');
const saleController = require('../controllers/saleController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { validate, createSaleSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', authenticate, saleController.getAll);
router.get('/date-range', authenticate, saleController.getByDateRange);
router.get('/:id', authenticate, saleController.getById);
router.post('/', authenticate, authorize('ADMIN', 'VENDEDOR', 'CAIXA'), validate(createSaleSchema), saleController.create);
router.delete('/:id', authenticate, authorize('ADMIN'), saleController.delete);

module.exports = router;

