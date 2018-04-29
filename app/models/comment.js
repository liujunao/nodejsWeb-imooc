const mogoose = require('mongoose')
const CommentSchema = require('../schemas/comment')

var Comment = mogoose.model('Comment', CommentSchema)

module.exports = Comment