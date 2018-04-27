const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    //0: nomal user
    //1: verified user
    //2: professional user
    //>10: admin
    //>50: super admin
    role: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function (next) {
    let user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    //生成一个随机的盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            console.log(err)
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err)

                user.password = hash
                next()
            })
        })
    })
})

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, (err, isMatch) => {
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}

module.exports = UserSchema