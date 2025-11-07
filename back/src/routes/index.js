const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const clientRoutes = require('./clientRoutes');
const saleRoutes = require('./saleRoutes');
const notaFiscalRoutes = require('./notaFiscalRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/clients', clientRoutes);
router.use('/sales', saleRoutes);
router.use('/nota-fiscal', notaFiscalRoutes);

module.exports = router;

