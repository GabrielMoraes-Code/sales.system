const express = require('express');
const notaFiscalController = require('../controllers/notaFiscalController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/nota-fiscal/emitir/{saleId}:
 *   post:
 *     summary: Emitir nota fiscal para uma venda
 *     tags: [Nota Fiscal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nota fiscal emitida com sucesso
 */
router.post('/emitir/:saleId', authenticate, authorize('ADMIN', 'VENDEDOR', 'CAIXA'), notaFiscalController.emitir);

/**
 * @swagger
 * /api/nota-fiscal/consultar/{notaFiscalId}:
 *   get:
 *     summary: Consultar status de uma nota fiscal
 *     tags: [Nota Fiscal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notaFiscalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da nota fiscal
 */
router.get('/consultar/:notaFiscalId', authenticate, notaFiscalController.consultar);

/**
 * @swagger
 * /api/nota-fiscal/cancelar/{notaFiscalId}:
 *   post:
 *     summary: Cancelar uma nota fiscal
 *     tags: [Nota Fiscal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notaFiscalId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota fiscal cancelada com sucesso
 */
router.post('/cancelar/:notaFiscalId', authenticate, authorize('ADMIN'), notaFiscalController.cancelar);

module.exports = router;

