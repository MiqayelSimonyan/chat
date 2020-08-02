module.exports = {
  port: 8080,
  allowOrigin: 'http://localhost:3000',
  secret: 'mysecret',
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost:27017/chat'
  }
};
