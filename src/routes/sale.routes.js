const express = require('express');

const {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} = require('../controllers/sale.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Venta
 *   description: Operaciones CRUD para ventas
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Venta]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', getSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */
router.get('/:id', getSaleById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crear una venta
 *     tags: [Venta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venta creada
 */
router.post('/', createSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualizar una venta
 *     tags: [Venta]
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
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Venta actualizada
 *       404:
 *         description: Venta no encontrada
 */
router.put('/:id', updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta eliminada
 *       404:
 *         description: Venta no encontrada
 */
router.delete('/:id', deleteSale);

module.exports = router;