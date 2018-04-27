const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const _ = require('underscore')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')
var Movie = require('./models/movie')
var User = require('./models/user')

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('port: ' + port);

//index page
app.get('/',function(req,res){
    Movie.fetch(function(err,movices){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title: 'immoc首页',
            movies: movices
        })
    })
})

//detail page
app.get('/movie/:id',function(req,res){
    let id = req.params.id

    Movie.findById(id, function(err,movie){
        res.render('detail',{
            title: 'immoc ' + movie.title,
            movie: movie
        })
    })
})

//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
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
})

//admin update movice
app.get('/admin/update/:id',function(req,res){
    let id = req.params.id

    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})

//admin post movice
app.post('/admin/movie/new', function(req,res){
    let id = req.body.movie._id
    let movieObj = req.body.movie
    let _movie

    if(id !== 'undefined'){
        Movie.findById(id, function(err,movie){
            if(err){
                console.log(err)
            }

            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }else{
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

        _movie.save(function(err,movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

//list page
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title: 'immoc列表页',
            movies: movies
        })
    })
    
})

//list delete movie
app.delete('/admin/delete',function(req,res){
    var id = req.query.id

    if(id){
        Movie.remove({_id: id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success: 1})
            }
        })
    }
})

//signup
app.post("/user/signup",function(req,res){
    
})