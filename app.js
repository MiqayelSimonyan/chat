const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const config = require('config');

const app = new Koa();

const mongoose = require('./libs/mongoose');

app.use(
    cors({
        credentials: true,
        origin: config.allowOrigin
    })
);
const server = http.createServer(app.callback());

require('./handlers/favicon').init(app);
require('./handlers/static').init(app);
require('./handlers/logger').init(app);
require('./handlers/errors').init(app);
require('./handlers/session').init(app);
require('./handlers/body-parser').init(app);
require('./handlers/passport').init(app);
require('./handlers/flash').init(app);

const router = new Router();

router.post('/signUp', require('./controllers/auth').signUp);
router.post('/signIn', require('./controllers/auth').signIn);
router.get('/isAuth', require('./controllers/auth').isAuth);
router.get('/signOut', require('./controllers/auth').signOut);

app.use(router.routes());

/*
router.get('/', require('./routes/frontpage').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);

app.use(router.routes());
*/


server.listen(process.env.PORT || config.port, () => {
    console.log(`server listen on ${server.address().port}`)
});

module.exports = app;