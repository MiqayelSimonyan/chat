const Cookies = require('cookies');
const config = require('config');
const User = require('../models/User');
const Message = require('../models/Message');

const socketIO = require('socket.io');
const socketRedis = require('socket.io-redis');
const sessionStore = require('./sessionStore');
const logger = require('./logger');

global.clients = {};

function socket(server) {
  const io = socketIO(server);

  io.adapter(socketRedis(config.get('redis.uri')));

  io.on('connection', async function (socket) {
    logger.info('socket connected', { requestId: socket.id });

    socket.on('authentificate', async (id) => {
      clients[id] = socket.id;

      io.sockets.emit('online', {
        clients
      });
    });

    socket.on('signout', async (_id) => {
      delete clients[_id];
    });

    socket.on('disconnect', () => {
      let discoonnectedClientId = Object.keys(clients).find(key => clients[key] === socket.id);
      if (discoonnectedClientId) delete clients[discoonnectedClientId];

      io.sockets.emit('online', {
        clients
      });
    });

    socket.on('message', async (data) => {
      let receiverId = data.receiver._id;
      let sender = data.sender._id;
      let message = data.message;

      await Message.create({ sender, receiver: receiverId, message });

      socket.broadcast.to(clients[receiverId]).emit('user_message', {
        sender: data.sender,
        receiver: data.receiver,
        message,
        date: Date.now()
      });
    });

    socket.on('typing', (user, receiver) => {
      socket.broadcast.to(clients[receiver._id]).emit('user_typing', {
        user
      });
    });

    socket.on('stop_typing', user => {
      socket.broadcast.to(clients[user._id]).emit('user_stop_typing', {
        username: user.username
      });
    });
  });
}

module.exports = socket;
