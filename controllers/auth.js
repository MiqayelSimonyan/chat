const passport = require('../libs/passport');
const User = require('../models/User');

const signUp = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    try {
        const user = new User({});

        await user.setPassword(password);
        await user.setUsername(username);

        await user.save();

        await ctx.login(user);

        ctx.body = user.toObject();
    } catch (err) {
        throw err;
    };
};

const signIn = async (ctx, next) => {
    await passport.authenticate('local', async function (err, user, info) {
        if (err) throw err;

        if (user) {
            await ctx.login(user);

            ctx.body = user.toObject();
        } else {
            ctx.throw(401, info);
        };
    })(ctx, next);
};

const signOut = async (ctx, next) => {
    try {
        let user = ctx.state.user;
        await ctx.logOut();

        ctx.session = null
        ctx.sessionOptions.maxAge = 0

        ctx.body = {
            _id: user._id,
            success: true
        };
    } catch (err) {
        ctx.body = false;
    };
};

const isAuth = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.body = {
            isAuth: true,
            user: ctx.state.user.toObject()
        }
    } else {
        ctx.body = {
            isAuth: false,
            user: null
        };
        //    throw new Error('user is not authentificated');
    }
};

module.exports = { signIn, signUp, signOut, isAuth };