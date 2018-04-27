const mogoose = require('mongoose')
const UserSchema = require('../schemas/user')

var User = mogoose.model('Movie',UserSchema)

module.exports = User