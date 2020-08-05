exports.init = (router) => {
    router.get('/user', require('../../controllers/user').getUser);
    router.get('/user/:id', require('../../controllers/user').getUserById);
    router.get('/users', require('../../controllers/user').getUsers);
};