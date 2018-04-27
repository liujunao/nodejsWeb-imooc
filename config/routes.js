const Index = require('../app/controllers/index')
const User = require('../app/controllers/user')
const Movie = require('../app/controllers/movie')

module.exports = function (app) {

    //pre handler
    app.use((req, res, next) => {
        let _user = req.session.user
        app.locals.user = _user
        next()
    })

    //Index
    app.get('/', Index.index)
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie', Movie.new)
    app.get('/admin/update/:id', Movie.update)
    app.post('/admin/movie/new', Movie.save)
    app.get('/admin/list', Movie.list)
    app.delete('/admin/delete', Movie.del)

    //User
    app.post("/user/signup", User.signup)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.list)
}
