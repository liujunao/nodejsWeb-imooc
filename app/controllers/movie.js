const _ = require('underscore')
const Movie = require('../models/movie')


//detail page
exports.detail = function (req, res) {
    let id = req.params.id

    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'immoc ' + movie.title,
            movie: movie
        })
    })
}

//admin new page
exports.new = function (req, res) {
    res.render('admin', {
        title: 'immoc后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
}

//admin update movice
exports.update = function (req, res) {
    let id = req.params.id

    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
}

//admin post movice
exports.save = function (req, res) {
    let id = req.body.movie._id
    let movieObj = req.body.movie
    let _movie

    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
}

//list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'immoc列表页',
            movies: movies
        })
    })

}

//list delete movie
exports.del = function (req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({ _id: id }, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: 1 })
            }
        })
    }
}