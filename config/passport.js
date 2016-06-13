'use strict'

import User from '../app/models/user'

const LocalStrategy = require('passport-local').Strategy

module.exports = (passport) => {

  passport.serializeUser((user, done) =>
    done(null, user.id)
  )

  passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
          done(err, user)
      })
  })

  passport.use('local-sigup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      process.nextTick(() => {
          User.findOne({'local.email' : email}, (err, user) => {
              if (err)
                return done(err)

              if (user){
                return done(null, false, req.flash('sigupMessage', 'Este email já existe'))
              }
              else{
                let newUser = new User()

                newUser.local.email = email
                newUser.local.password = newUser.generateHash(password)

                newUser.save((err) => {
                  if(err)
                    throw err
                  return done(null, newUser)
                })
              }

          })
      })
    }
  ))
}
