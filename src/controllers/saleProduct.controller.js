const { SaleProduct, Sale, Product } = require('../models');
const getSaleProducts = async (req, res) => {
    try {
        const details = await SaleProduct.findAll({
            include: [
                { model: Sale, as: 'sale' },
                { model: Product, as: 'product' }
            ]
        });
        return res.status(200).json(details);
    } catch (err) {
        return res.status(500).json({
            message: 'Error obtaining sale details',
            error: err.message
        });
    }
};

const getSaleProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await SaleProduct.findByPk(id, {
            include: [
                { model: Sale, as: 'sale' },
                { model: Product, as: 'product' }
            ]
        });

        if (!detail) {
            return res.status(404).json({ message: 'Sale detail not found' });
        }

        return res.status(200).json(detail);
    } catch (err) {
        return res.status(500).json({
            message: 'Error obtaining sale detail',
            error: err.message
        });
    }
};
const createSaleProduct = async (req, res) => {
    try {
        const { saleId, productId, quantity, price } = req.body;

        const saleExists = await Sale.findByPk(saleId);
        if (!saleExists) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        const productExists = await Product.findByPk(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newDetail = await SaleProduct.create({
            saleId,
            productId,
            quantity,
            price
        });

        return res.status(201).json(newDetail);
    } catch (err) {
        return res.status(400).json({
            message: 'Error creating sale detail',
            error: err.message
        });
    }
};

// actualizar detalle
const updateSaleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await SaleProduct.findByPk(id);

        if (!detail) {
            return res.status(404).json({ message: 'Sale detail not found' });
        }

        if (req.body.saleId) {
            const saleExists = await Sale.findByPk(req.body.saleId);
            if (!saleExists) return res.status(404).json({ message: 'Sale not found' });
        }

        if (req.body.productId) {
            const productExists = await Product.findByPk(req.body.productId);
            if (!productExists) return res.status(404).json({ message: 'Product not found' });
        }

        await detail.update(req.body);
        return res.status(200).json(detail);
    } catch (err) {
        return res.status(400).json({
            message: 'Error updating sale detail',
            error: err.message
        });
    }
};

// eliminar detalle
const deleteSaleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await SaleProduct.findByPk(id);

        if (!detail) {
            return res.status(404).json({ message: 'Sale detail not found' });
        }

        await detail.destroy();
        return res.status(200).json({ message: 'Sale detail deleted successfully' });
    } catch (err) {
        return res.status(400).json({
            message: 'Error deleting sale detail',
            error: err.message
        });
    }
};

module.exports = {
    getSaleProducts,
    getSaleProductById,
    createSaleProduct,
    updateSaleProduct,
    deleteSaleProduct
};