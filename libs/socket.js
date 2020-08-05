const Cookies = require('cookies');
const config = require('config');
const User = require('../models/User');

const socketIO = require('socket.io');
const socketRedis = require('socket.io-redis');
const sessionStore = require('./sessionStore');
const logger = require('./logger');

global.users = [];

function socket(server) {
  const io = socketIO(server);

  io.adapter(socketRedis(config.get('redis.uri')));

  io.on('connection', async function (socket) {
    logger.info('socket connected', { requestId: socket.id });
    // socket.broadcast.emit('system_message', `${socket.user.username} connected.`);

    socket.on('authentificate', async (id) => {
      users[id] = socket.id;
    });

    socket.on('signout', async (_id) => {
      delete users[_id];
    });

    socket.on('disconnect', () => {
      //  socket.broadcast.emit('system_message', `${socket.user.username} disconnected.`);
    });

    socket.on('message', (data) => {
      socket.broadcast.to(users[data.reciver._id]).emit('user_message', {
        sender: false,
        reciver: data.user,
        text: data.text,
        date: Date.now()
      });
    });

    socket.on('typing', (user, reciver) => {
      socket.broadcast.to(users[reciver._id]).emit('user_typing', {
        user
      });
    });

    socket.on('stop_typing', user => {
      socket.broadcast.to(users[user._id]).emit('user_stop_typing', {
        username: user.username
      });
    });
  });
}

module.exports = socket;
