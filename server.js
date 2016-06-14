'use strict'

import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'

import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

//Import config Database and start DB
require('./config/database.js')

//Config app and port
const PORT = process.env.PORT || 3000
const app = express()

//Pre sets express application
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')

//Init passport requires
require('./config/passport')(passport)
app.use(session({ secret: 'appauthenticationsecret'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Public route access
app.use(express.static(__dirname + '/bower_components/bootstrap/dist'))

//Impor Routes
require('./app/routes.js')(app, passport)

//Run server
app.listen(PORT, () => {
  console.log('Server is run in PORT:'+ PORT)
})
