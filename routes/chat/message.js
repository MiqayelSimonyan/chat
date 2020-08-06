exports.init = (router) => {
    router.get('/messages/:id', require('../../controllers/chat').getMessages);
};