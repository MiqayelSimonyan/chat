const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const config = require('config');

const app = new Koa();

const mongoose = require('./libs/mongoose');
const socket = require('./libs/socket');

app.use(
    cors({
        credentials: true,
        origin: config.CLIENT_ORIGIN
    })
);
const server = http.createServer(app.callback());

require('./handlers/static').init(app);
require('./handlers/logger').init(app);
require('./handlers/errors').init(app);
require('./handlers/session').init(app);
require('./handlers/body-parser').init(app);
require('./handlers/passport').init(app);
require('./handlers/flash').init(app);

const router = new Router();

require('./routes/auth').init(router);
require('./routes/user').init(router);

app.use(router.routes());

server.listen(process.env.PORT || config.port, () => {
    console.log(`server listen on ${server.address().port}`)
});

socket(server);

module.exports = app;