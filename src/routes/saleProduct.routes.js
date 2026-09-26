const express = require('express');
const router = express.Router();
const {
    getSaleProducts,
    getSaleProductById,
    createSaleProduct,
    updateSaleProduct,
    deleteSaleProduct
} = require('../controllers/saleProduct.controller');

/**
 * @swagger
 * /api/sale-products:
 *   get:
 *     summary: Obtener todos los detalles de venta
 *     tags:
 *       - DetalleVenta
 *     responses:
 *       200:
 *         description: Lista de detalles de venta
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getSaleProducts);

/**
 * @swagger
 * /api/sale-products/{id}:
 *   get:
 *     summary: Obtener un detalle de venta por ID
 *     tags:
 *       - DetalleVenta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getSaleProductById);

/**
 * @swagger
 * /api/sale-products:
 *   post:
 *     summary: Crear un detalle de venta
 *     tags:
 *       - DetalleVenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - saleId
 *               - productId
 *               - quantity
 *               - price
 *             properties:
 *               saleId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: double
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Detalle creado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Venta o producto no encontrado
 */
router.post('/', createSaleProduct);

/**
 * @swagger
 * /api/sale-products/{id}:
 *   put:
 *     summary: Actualizar un detalle de venta
 *     tags:
 *       - DetalleVenta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: double
 *     responses:
 *       200:
 *         description: Detalle actualizado correctamente
 *       404:
 *         description: Detalle, venta o producto no encontrado
 */
router.put('/:id', updateSaleProduct);

/**
 * @swagger
 * /api/sale-products/{id}:
 *   delete:
 *     summary: Eliminar un detalle de venta
 *     tags:
 *       - DetalleVenta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       404:
 *         description: Detalle no encontrado
 */
router.delete('/:id', deleteSaleProduct);

module.exports = router;