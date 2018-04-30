const _ = require('underscore')
const Movie = require('../models/movie')
const Catetory = require('../models/catetory')
const Comment = require('../models/comment')
const fs = require('fs')
const path = require('path')

//detail page
module.exports.detail = function (req, res) {
    let id = req.params.id

    Movie.update({ _id: id }, { $inc: { pv: 1 } }, (err) => {
        if (err) {
            console.log(err)
        }
    })
    Movie.findById(id, function (err, movie) {
        Comment
            .find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec((err, comments) => {
                console.log('movie: ' + comments)
                res.render('detail', {
                    title: 'immoc ' + movie.title,
                    movie: movie,
                    comments: comments
                })
            })
    })
}

//admin new page
module.exports.new = function (req, res) {
    Catetory.find({}, (err, catetories) => {
        res.render('admin', {
            title: 'imooc后台录入页',
            catetories: catetories,
            movie: {}
        })
    })
}

//admin update movice
module.exports.update = function (req, res) {
    let id = req.params.id

    if (id) {
        Movie.findById(id, function (err, movie) {
            Catetory.find({}, (err, catetories) => {
                res.render('admin', {
                    title: 'imooc 后台更新页',
                    movie: movie,
                    catetories: catetories
                })
            })
        })
    }
}

//admin savePoster
module.exports.savePoster = function (req, res, next) {
    console.log(req.files)
    let posterData = req.files.uploadPoster
    let filePath = posterData.path
    let originalFilename = posterData.originalFilename

    if (originalFilename) {
        fs.readFile(filePath, (err, data) => {
            let timestamp = Date.now()
            let type = posterData.type.split('/')[1]
            let poster = timestamp + '.' + type
            let newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

            fs.writeFile(newPath, data, (err) => {
                req.poster = poster
                next()
            })
        })
    } else {
        next()
    }
}

//admin post movice
module.exports.save = function (req, res) {
    let id = req.body.movie._id
    let movieObj = req.body.movie
    let _movie

    if (req.poster) {
        movieObj.poster = req.poster
    }

    if (id) {
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
        _movie = new Movie(movieObj)
        let catetoryId = movieObj.catetory
        let catetoryName = movieObj.catetoryName

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }

            if (catetoryId) {
                Catetory.findById(catetoryId, (err, catetory) => {
                    catetory.movies.push(movie._id)

                    catetory.save((err, catetory) => {
                        res.redirect('/movie/' + movie._id)
                    })
                })
            } else if (catetoryName) {
                let catetory = new Catetory({
                    name: catetoryName,
                    movies: [movie._id]
                })
                catetory.save((err, catetory) => {
                    movie.catetory = catetory._id
                    movie.save((err, movie) => {
                        res.redirect('/movie/' + movie._id)
                    })
                })
            }
        })
    }
}

//list page
module.exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        console.log('movies: ' + movies)
        res.render('list', {
            title: 'immoc列表页',
            movies: movies
        })
    })

}

//list delete movie
module.exports.del = function (req, res) {
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