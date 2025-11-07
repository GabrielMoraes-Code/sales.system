const express = require('express');
const clientController = require('../controllers/clientController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { validate, createClientSchema, updateClientSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', authenticate, clientController.getAll);
router.get('/:id', authenticate, clientController.getById);
router.post('/', authenticate, authorize('ADMIN', 'VENDEDOR'), validate(createClientSchema), clientController.create);
router.put('/:id', authenticate, authorize('ADMIN', 'VENDEDOR'), validate(updateClientSchema), clientController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), clientController.delete);

module.exports = router;

