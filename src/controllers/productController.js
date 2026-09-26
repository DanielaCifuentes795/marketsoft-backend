const { Product, Provider } = require('../models')

const getProducts = async(req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Provider,
                as: 'provider'
            }
        });
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({
            message: 'Error obtaining products',
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: {
                model: Provider,
                as:'provider'
            }
        });
        if (!product) {
            return res.status(404).json ({
                message: 'Product not found'
            });
        }
    
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error obtaining product',
            error: error.message
        });
    }
};
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            providerId
        } = req.body;
                const provider = await Provider.findByPk(providerId);

        if (!provider) {
            return res.status(404).json({
                message: 'Provider not found'
            });
        }
                const product = await Product.create({
            name,
            description,
            price,
            stock,
            providerId
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating product',
            error: error.message
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (req.body.providerId) {
            const provider = await Provider.findByPk(
                req.body.providerId
            );

            if (!provider) {
                return res.status(404).json({
                    message: 'Provider not found'
                });
            }
        }
await product.update(req.body);

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

