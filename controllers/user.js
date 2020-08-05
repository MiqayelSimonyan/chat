const mongoose = require('mongoose');

const User = require('../models/User');

const getUsers = async (ctx, next) => {
    try {
        const users = await User.find({ _id: { $ne: ctx.state.user._id } });

        ctx.body = users.map((user) => user.toObject());
    } catch (err) {
        throw err;
    }
};

const getUser = async (ctx, next) => {
    if (!ctx.state.user) {
        ctx.body = 'User Not Found';
    } else {
        ctx.body = ctx.state.user.toObject();
    };
};

const getUserById = async (ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
        ctx.throw(400, 'Invalid ObjectId');
    };

    const user = await User.findById(ctx.params.id);

    ctx.body = user.toObject();
};

module.exports = { getUser, getUserById, getUsers };