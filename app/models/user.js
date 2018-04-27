const mogoose = require('mongoose')
const UserSchema = require('../schemas/user')

var User = mogoose.model('User',UserSchema)

module.exports = User