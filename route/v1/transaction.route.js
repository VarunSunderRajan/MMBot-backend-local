const express = require('express');
const router = express.Router();

const transactionController = require('../../controller/transaction.controller.js');

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - hello
 *     description: API is running
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/all', transactionController.getAllTransactions);
router.get('/user/:id', transactionController.getTransactionsByUserId);
router.get('/:id', transactionController.getTransactionById);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransactionById);
router.delete('/:id', transactionController.deleteTransactionById);

module.exports = router;