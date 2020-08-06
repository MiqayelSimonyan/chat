const mongoose = require('mongoose');

const Message = require('../models/Message');

const getMessages = async (ctx, next) => {
    try {
        const paramsId = ctx.params.id;
        const userId = ctx.state.user._id;

        const messages = await Message
            .find({
                $or: [
                    { sender: userId, receiver: paramsId },
                    { sender: paramsId, receiver: userId }
                ]
            })
            .populate('sender')
            .populate('receiver');

        ctx.body = messages.map((message) => message.toObject());
    } catch (err) {
        throw err;
    }
};

module.exports = { getMessages };