var User = require('../models/user')

//signup
exports.signup = function (req, res) {
    let _user = req.body.user

    User.find({ name: _user.name }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user != '') {
            return res.redirect('/')
        } else {
            let user = new User(_user)
            user.save((err, user) => {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/userlist')
            })
        }
    })
}

//signin
exports.signin = (req, res) => {
    let _user = req.body.user
    let name = _user.name
    let = password = _user.password

    User.findOne({ name: name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/')
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
                console.log('password is not match')
            }
        })
    })
}

//logout
exports.logout = (req, res) => {
    delete req.session.user
    //delete app.locals.user
    res.redirect('/')
}

//userlist
exports.list = function (req, res) {
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