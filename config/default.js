module.exports = {
  port: 8080,
  CLIENT_ORIGIN: 'http://localhost:3000',
  secret: 'mysecret',
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  logger: {
    level: 'info'
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost:27017/chat'
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
  }
};
