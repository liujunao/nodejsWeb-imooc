var User = require('../models/user')

//signup
module.exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}
module.exports.signup = function (req, res) {
    let _user = req.body.user

    User.find({ name: _user.name }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user != '') {
            return res.redirect('/signin')
        } else {
            let user = new User(_user)
            user.save((err, user) => {
                if (err) {
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })
}

//signin
module.exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}
module.exports.signin = (req, res) => {
    let _user = req.body.user
    let name = _user.name
    let = password = _user.password

    User.findOne({ name: name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/signin')
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                console.log(err)
            }
            if (isMatch) {
                //保存session
                req.session.user = user
                return res.redirect('/')
            } else {
                return res.redirect('/signin')
            }
        })
    })
}

//logout
module.exports.logout = (req, res) => {
    delete req.session.user
    //delete app.locals.user
    res.redirect('/')
}

//userlist
module.exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err)
        }
        res.render('userlist', {
            title: 'immoc 用户列表页',
            users: users
        })
    })
}

//midware for user: whether signin
module.exports.signinRequired = function (req, res, next) {
    let user = req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

//midware for user: wheter admin
module.exports.adminRequired = function (req, res, next) {
    let user = req.session.user

    if(user.role <= 10 || !user.role){
        return res.redirect('/signin')
    }
    next()
}