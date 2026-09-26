const sequelize = require('../config/database');

const Product = require('./Product');
const Provider = require('./Provider');
const User = require('./user');
const Sale = require('./sale');
const SaleProduct = require('./saleProduct');


Provider.hasMany(Product, {
    foreignKey: 'providerId',
    as: 'products'
});

Product.belongsTo(Provider, {
    foreignKey: 'providerId',
    as: 'provider'
});


User.hasMany(Sale, {
    foreignKey: 'userId',
    as: 'sales'
});

Sale.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});


Sale.hasMany(SaleProduct, {
    foreignKey: 'saleId',
    as: 'saleProducts'
});

SaleProduct.belongsTo(Sale, {
    foreignKey: 'saleId',
    as: 'sale'
});


Product.hasMany(SaleProduct, {
    foreignKey: 'productId',
    as: 'saleProducts'
});

SaleProduct.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

module.exports = {
    sequelize,
    Product,
    Provider,
    User,
    Sale,
    SaleProduct
};