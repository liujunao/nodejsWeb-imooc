const _ = require('underscore')
const Catetory = require('../models/catetory')
const Comment = require('../models/comment')

//catetory_admin new page
module.exports.new = function (req, res) {
    res.render('catetory_admin', {
        title: 'immoc后台分类录入页',
        catetory: {}
    })
}

//catetory_admin post movice
module.exports.save = function (req, res) {
    let _catetory = req.body.catetory

    let catetory = new Catetory(_catetory)

    catetory.save(function (err, catetory) {
        if (err) {
            console.log(err)
        }
        res.redirect('/admin/catetory/list')
    })
}

//catetorylist page
module.exports.list = function (req, res) {
    Catetory.fetch(function (err, catetories) {
        if (err) {
            console.log(err)
        }
        res.render('catetorylist', {
            title: 'imooc 分类列表页',
            catetories: catetories
        })
    })
}