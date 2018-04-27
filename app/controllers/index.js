//index page
var Movie = require('../models/movie')

module.exports.index =  function (req, res) {
    Movie.fetch(function (err, movices) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: 'immoc首页',
            movies: movices
        })
    })
}