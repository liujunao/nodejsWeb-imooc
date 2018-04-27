const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const dbUrl = 'mongodb://localhost/imooc'
mongoose.connect('mongodb://localhost/imooc')

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    //利用mongodb存储登陆状态
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

//配置开发环境下的模式
if('development' === app.get('env')){
    app.set('showStackError',true)
    app.use(morgan(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug',true)
}

require('./config/routes')(app)
app.locals.moment = require('moment')
app.listen(port)

console.log('port: ' + port);