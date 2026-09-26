const { Sale, User } = require('../models');


const getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        });

        res.status(200).json(sales);

    } catch (error) {
        res.status(500).json({
            message: 'Error getting sales',
            error: error.message
        });
    }
};


const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        });

        if (!sale) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        res.status(200).json(sale);

    } catch (error) {
        res.status(500).json({
            message: 'Error getting sale',
            error: error.message
        });
    }
};


const createSale = async (req, res) => {
    try {
        const { userId, date } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'userId is required'
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const sale = await Sale.create({
            userId,
            date: date || new Date(),
            total: 0
        });

        res.status(201).json(sale);

    } catch (error) {
        res.status(400).json({
            message: 'Error creating sale',
            error: error.message
        });
    }
};


const updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);

        if (!sale) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        const { userId, date } = req.body;

        if (userId) {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            sale.userId = userId;
        }

        if (date) {
            sale.date = date;
        }

        await sale.save();

        res.status(200).json(sale);

    } catch (error) {
        res.status(400).json({
            message: 'Error updating sale',
            error: error.message
        });
    }
};


const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);

        if (!sale) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        await sale.destroy();

        res.status(200).json({
            message: 'Sale deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting sale',
            error: error.message
        });
    }
};


module.exports = {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};