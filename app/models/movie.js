const mogoose = require('mongoose')
const MovieSchema = require('../schemas/movie')

var Movie = mogoose.model('Movie',MovieSchema)

module.exports = Movie