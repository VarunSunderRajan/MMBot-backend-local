const httpStatus = require('http-status');
const db = require("../models");
const Transaction = db.transaction;
const User = db.user;
const Bot = db.bot;
const ApiError = require('../utils/ApiError');
//TODO- change address to user id
const createTransaction = async ({ userId, botId, amount, fee, type, hash }) => {
    const user = await User.findOne({
        where: { id: userId }
    });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Can not find user');
    }
    const bot = await Bot.findOne({
        where: { id: botId }
    });
    if (!bot) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Can not find bot');
    }
    const transaction = await Transaction.create({ userId, botId, amount, fee, type, hash });
    return transaction;
};

const getAllTransactions = async (filter, options) => {
    const transactions = await Transaction.findAll();
    return transactions;
};

const getTransactionsByUserId = async (userId) => {
    const transactions = await Transaction.findAll({ where: { userId }, });
    return transactions;
};

const getTransactionById = async (id) => {
    return Transaction.findOne({ where: { id } });
};

const updateTransaction = async (id, updateBody) => {
    const transaction = await Transaction.findOne({ where: { id } })
    if (!transaction) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found Transaction');
    }
    const { userId = transaction.userId, botId = transaction.botId, amount = transaction.amount, fee = transaction.fee, type = transaction.type, hash = transaction.hash } = updateBody
    const updateData = {
        userId, botId, amount, fee, type, hash
    }
    const row = await Transaction.update(updateData, {
        where: { id },
    });
    return row;
};


const deleteTransactionById = async (transactionId) => {
    const transaction = await getTransactionById(transactionId);
    if (!transaction) return null
    await transaction.destroy();
    return transaction;
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    deleteTransactionById,
    updateTransaction,
    getTransactionsByUserId
};
