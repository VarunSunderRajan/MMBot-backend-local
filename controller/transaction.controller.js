const transactionServices = require("../service/transaction.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createTransaction = catchAsync(async (req, res) => {
    const reqBody = req.body
    const transaction = await transactionServices.createTransaction(reqBody);
    if (transaction) {
        res.send({ transaction });
        return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        "message": "Can not create transaction",
    })
});

const getAllTransactions = catchAsync(async (req, res) => {
    const transactions = await transactionServices.getAllTransactions();
    res.send({ transactions });
});

const getTransactionsByUserId = catchAsync(async (req, res) => {
    const transactions = await transactionServices.getTransactionsByUserId(req.params.id);
    res.send({ transactions });
});

const getTransactionById = catchAsync(async (req, res) => {
    const transaction = await transactionServices.getTransactionById(req.params.id);
    if (!transaction) {
        res.status(httpStatus.NOT_FOUND).send({
            "message": "Transaction not found",
        })
        return;
    }
    res.send({ transaction });
});

const updateTransactionById = catchAsync(async (req, res) => {
    const reqBody = req.body
    const transaction = await transactionServices.updateTransaction(req.params.id, reqBody);
    if (!transaction) {
        res.status(httpStatus.NOT_FOUND).send({
            "message": "Transaction not found",
        })
        return;
    }
    res.send({ transaction });
});

const deleteTransactionById = catchAsync(async (req, res) => {
    const deleted = await transactionServices.deleteTransactionById(req.params.id);
    if (!deleted) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            "message": "Can not update transaction",
        })
        return
    }
    res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
    deleteTransactionById,
    getTransactionById,
    getAllTransactions,
    createTransaction,
    updateTransactionById,
    getTransactionsByUserId
}