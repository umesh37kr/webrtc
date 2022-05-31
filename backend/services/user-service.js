const User = require('../models/user-model')
class UserService{
    async findUser(filter){
        const user = await User.findOne(filter)
        return user;
    }

    async createUser(data){
        const user = await User.create(data)
        return user;
    }
}

module.exports = new UserService()