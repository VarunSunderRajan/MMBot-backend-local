const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;
const Bot = db.bot;
const Setting = db.setting;
const Transaction = db.transaction;
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const createUser = async (params) => {
    const { firstname, lastname, address, username, email, password, role } = params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hash,
        role,
        active: 0,
        deleted: 0,
        balance: 0,
        current: 0,
        previous: 0
    }

    const [row, created] = await User.findOrCreate({
        where: { email: user.email },
        defaults: user,
    });
    if (created) {
        const setting = await Setting.create({
            userId: row.id,
            tradeAmount: "1",
            limitOrders: "1",
            sellProfit: "1",
            stopLossAt: "-15"
        })
        if (setting)
            return row;
        return null
    }
    return null;
};

const createUserWithWallet = async (params) => {
    const { firstname, lastname, address, username, email, password, role } = params;
    const user = {
        firstname,
        lastname,
        username,
        email,
        address,
        role,
        active: 0,
        deleted: 0,
        balance: 0,
        current: 0,
        previous: 0
    }

    const [row, created] = await User.findOrCreate({
        where: { address: user.address },
        defaults: user,
    });
    if (created) {
        const setting = await Setting.create({
            userId: row.id,
            tradeAmount: "1",
            limitOrders: "1",
            sellProfit: "1",
            stopLossAt: "-15"
        })
        if (setting)
            return row;
        return null
    }
    return null;
};


const getAllUsers = async (filter, options) => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    return User.findOne({ where: { id } });
};

const getUserByEmail = async (email) => {
    return User.findOne({ where: { email } });
};

const getUserByAddress = async (address) => {
    return User.findOne({
        where: { address },
        include: [
            {
                model: Bot,
            },
            {
                model: Setting,
            },
            {
                model: Transaction,
            }
        ],
    });
};


const updateUserById = async (userId, updateBody) => {
    const { firstname, lastname, username, email, password, active } = updateBody;
    const user = {
        firstname,
        lastname,
        username,
        email,
        active,
    }
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
    }

    const row = await User.update(user, {
        where: { id: userId },
    });
    return row;
};
const getUserSetting = async (id) => {
    return Setting.findOne({ where: { userId: id } })
}
const updateSetting = async (id, updateBody) => {
    const setting = await Setting.findOne({ where: { id } })
    if (!setting) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found Bot');
    }
    const { tradeAmount = setting.tradeAmount, limitOrders = setting.limitOrders, sellProfit = setting.sellProfit, stopLossAt = setting.stopLossAt, wallet = setting.wallet } = updateBody
    const updateData = {
        tradeAmount,
        limitOrders,
        sellProfit,
        stopLossAt,
        wallet,
    }
    const row = await Setting.update(updateData, {
        where: { id },
    });
    return row;
};


const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) return null
    await user.destroy();
    return user;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    createUserWithWallet,
    getUserByAddress,
    updateSetting,
    getUserSetting
};
