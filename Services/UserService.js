const User = require('../Models/UserModel.js');

class UserService {
    async create(data){
        return await User.create(data);
    };

    async fetch(hook){
        return await User.find(hook);
    }

    async findUser(hook){
        return await User.findOne(hook);
    }
};

module.exports = new UserService();