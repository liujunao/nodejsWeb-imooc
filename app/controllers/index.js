//index page
var Movie = require('../models/movie')
const Catetory = require('../models/catetory')

//index page
module.exports.index = function (req, res) {
    Catetory
        .find({})
        .populate({ path: 'movies', options: { limit: 5 } })
        .exec((err, catetories) => {
            if (err) {
                console.log(err)
            }
            res.render('index', {
                title: 'imooc首页',
                catetories: catetories
            })
        })
}

//search page
module.exports.search = function (req, res) {
    let catId = req.query.cat
    let page = parseInt(req.query.p, 10) || 0
    const count = 2
    let index = page * count

    if (catId) {
        Catetory
            .find({ _id: catId })
            .populate({
                path: 'movies',
                select: 'title poster'
            })
            .exec((err, catetories) => {
                if (err) {
                    console.log(err)
                }
                let catetory = catetories[0] || {}
                let movies = catetory.movies || []
                let results = movies.slice(index, index + count)

                res.render('results', {
                    title: 'imooc 结果列表页面',
                    keyword: catetory.name,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / count),
                    query: 'cat=' + catId,
                    movies: results
                })
            })
    } else {
        let q = req.query.q
        Movie
            .find({ title: new RegExp(q + '.*', 'i') })
            .exec((err, movies) => {
                if (err) {
                    console.log(err)
                }
                let results = movies.slice(index, index + count)

                res.render('results', {
                    title: 'imooc 结果列表页面',
                    keyword: q,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / count),
                    query: 'q=' + q,
                    movies: results
                })
            })
    }
}