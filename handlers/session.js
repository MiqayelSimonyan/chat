const mongoose = require('mongoose');
const session = require('koa-session');
const mongooseStore = require('koa-session-mongoose');

exports.init = app => app.use(session({
	signed: false,

	store: mongooseStore.create({
		name: 'Session',
		expires: 3600 * 4,
		connection: mongoose
	})
}, app));