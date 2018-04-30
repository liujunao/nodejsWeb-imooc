import { EAFNOSUPPORT } from 'constants';

const crypto = require('crypto')
const bcrypt = require('bcrypt')

function getRandomString(len) {
    if (!len) len = 16

    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}

const should = require('should')
const app = require('../../app')
const mongoose = require('mongoose')
const User = mongoose.model('User')

let user
//test
describe('<Unit Test', () => {
    describe('Model User:', () => {
        before((done) => {
            user = {
                name: getRandomString(),
                password: 'password'
            }
            done()
        })

        describe('Before Method save', () => {
            it('should begin without test user', (done) => {
                User.find({ name: user.name }, (err, users) => {
                    users.should.have.length(0)

                    done()
                })
            })
        })

        describe('User save', () => {
            it('should save without problems', (done) => {
                let _user = new User(user)

                _user.save((err) => {
                    should.not.exist(err)
                    _user.remove((err) => {
                        should.not.exist(err)
                        done()
                    })
                })
            })

            it('should password be hashed correctly', (done) => {
                let _user = new User(user)
                let password = user.password

                _user.save((err) => {
                    should.not.exist(err)
                    _user.password.should.not.have.length(0)

                    bcrypt.compare(password, _user.password, (err, isMatch) => {
                        should.not.exist(err)
                        isMatch.should.equal(true)
                        _user.remove((err) => {
                            should.not.exist(err)
                            done()
                        })
                    })
                })
            })

            it('should have default role 0', (done) => {
                let _user = new User(user)

                _user.save((err) => {
                    _user.role.should.equal(0)

                    _user.remove((err) => {
                        done()
                    })
                })
            })

            it('should fail to save an existing user', (done) => {
                let _user1 = new User(user)
                _user1.save((err) => {
                    should.not.exist(err)

                    let _user2 = new User(user)

                    _user2.save((err) => {
                        should.exist(err)

                        _user1.remove((err) => {
                            if (!err) {
                                _user2.remove((err) => {
                                    done()
                                })
                            }
                        })
                    })
                })
            })
        })

        after((done) => {
            //clear user info 
            done()
        })
    })
})