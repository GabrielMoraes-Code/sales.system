const express = require('express');
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { validate, createProductSchema, updateProductSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', authenticate, productController.getAll);
router.get('/low-stock', authenticate, productController.getLowStock);
router.get('/:id', authenticate, productController.getById);
router.post('/', authenticate, authorize('ADMIN', 'VENDEDOR'), validate(createProductSchema), productController.create);
router.put('/:id', authenticate, authorize('ADMIN', 'VENDEDOR'), validate(updateProductSchema), productController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), productController.delete);

module.exports = router;

