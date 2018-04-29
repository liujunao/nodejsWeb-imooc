const Index = require('../app/controllers/index')
const User = require('../app/controllers/user')
const Movie = require('../app/controllers/movie')
const Comment = require('../app/controllers/comment')
const Catetory = require('../app/controllers/catetory')

module.exports = function (app) {

    //pre handler
    app.use((req, res, next) => {
        let _user = req.session.user
        app.locals.user = _user
        next()
    })

    //Index
    app.get('/', Index.index)

    //Movie
    app.get('/movie/:id', Movie.detail)
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
    app.delete('/admin/movie/delete', User.signinRequired, User.adminRequired, Movie.del)

    //User
    app.post("/user/signup", User.signup)
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list)

    //Comment
    app.post('/user/comment', User.signinRequired, Comment.save)

    //Catetory
    app.get('/admin/catetory/new', User.signinRequired, User.adminRequired, Catetory.new)
    app.post('/admin/catetory', User.signinRequired, User.adminRequired, Catetory.save)
    app.get('/admin/catetory/list', User.signinRequired, User.adminRequired, Catetory.list)

    //results
    app.get('/results', Index.search)
}
