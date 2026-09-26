const express = require('express');
const DatabaseSync = require('./src/config/sync');

const productRouter = require('./src/routes/productRouter');
const providerRouter = require('./src/routes/providerRouter');
const userRouter = require('./src/routes/user.routes');
const saleRouter = require('./src/routes/sale.routes');
const saleProductRouter = require('./src/routes/saleProduct.routes');

const { swaggerUi, swaggerSpec } = require('./src/swagger/swagger');

const app = express();

app.use(express.json());

// Rutas de la API
app.use('/api/products', productRouter);
app.use('/api/providers', providerRouter);
app.use('/api/users', userRouter);
app.use('/api/sales', saleRouter);
app.use('/api/sale-products', saleProductRouter);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

DatabaseSync.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('Server could not start:', error.message);
    });