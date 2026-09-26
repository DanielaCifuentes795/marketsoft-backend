const express = require('express');

const {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} = require('../controllers/sale.controller');

const router = express.Router();

router.get('/', getSales);

router.get('/:id', getSaleById);

router.post('/', createSale);

router.put('/:id', updateSale);

router.delete('/:id', deleteSale);

module.exports = router;