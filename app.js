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
const fs = require('fs')

const dbUrl = 'mongodb://localhost/imooc'
mongoose.connect('mongodb://localhost/imooc')

//models loading
let models_path = __dirname + '/app/models'
let walk = function (path) {
    fs
        .readdirSync(path)
        .forEach((file) => {
            let newPath = path + '/' + file
            let stat = fs.statSync(newPath)

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            } else if (stat.isDirectory()) {
                walk(newPath)
            }
        })
}
walk(models_path)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: true,
    //利用mongodb存储登陆状态
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

//配置开发环境下的模式
if ('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(morgan(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

require('./config/routes')(app)
app.locals.moment = require('moment')
app.listen(port)

console.log('port: ' + port);