const botServices = require("../service/bot.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createBot = catchAsync(async (req, res) => {
    const reqBody=req.body
    const bot = await botServices.createBot(reqBody);
    if (bot) {
        res.send({ bot });
        return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        "message": "Can not create bot",
    })
});

const getAllBots = catchAsync(async (req, res) => {
    const bots = await botServices.getAllBots();
    res.send({ bots });
});

const getBotById = catchAsync(async (req, res) => {
    const bot = await botServices.getBotById(req.params.id);
    if (!bot) {
        res.status(httpStatus.NOT_FOUND).send({
            "message": "Bot not found",
        })
        return;
    }
    res.send({ bot });
});

const updateBotById = catchAsync(async (req, res) => {
    const reqBody=req.body
    const bot = await botServices.updateBot(req.params.id,reqBody);
    if (!bot) {
        res.status(httpStatus.NOT_FOUND).send({
            "message": "Bot not found",
        })
        return;
    }
    res.send({ bot });
});

const deleteBotById = catchAsync(async (req, res) => {
    const deleted = await botServices.deleteBotById(req.params.id);
    if (!deleted) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            "message": "Can not update bot",
        })
        return 
    }
    res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
    deleteBotById,
    getBotById,
    getAllBots,
    createBot,
    updateBotById
}