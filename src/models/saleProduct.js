const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const saleProduct = sequelize.define('saleProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min(val) {
                if (val <= 0) {
                    throw new Error('Quantity must be greater than 0');
                }
            }
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min(val) {
                if (Number(val) <= 0) {
                    throw new Error('Price must be greater than 0');
                }
            }
        }
    }
}, {
    tableName: 'sale_products',
    timestamps: false
});

module.exports = saleProduct;