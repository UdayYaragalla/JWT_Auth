const { request, response } = require('express')
const loginDao = require('../dao/loginDao')
const jwt = require('../jwt/jwtUtills')

module.exports = {
    register: async (request, response) => {
        const result = await loginDao.register(request.body);
        response.status(200).send(result);
    },
    login: async (request, response) => {
        const result = await loginDao.login(request.body);
        response.status(200).send(result);
    },
    users: async (request, response) => {
        const result = await loginDao.users();
        response.send(result)
    }
}