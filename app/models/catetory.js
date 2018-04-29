const mogoose = require('mongoose')
const CatetorySchema = require('../schemas/catetory')

var Catetory = mogoose.model('Catetory',CatetorySchema)

module.exports = Catetory