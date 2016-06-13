'use strict'

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs')
  })

  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') })
  })

  app.get('/sigup', (req, res) => {
    res.render('sigup.ejs', { message: req.flash('sigupMessage') })
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get user to Session
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post('/sigup', passport.authenticate('local-sigup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))
  
}

//middleware to verify login is true
const isLoggedIn = (req, res, next) => {

  //user is authenticated in the session
  if(req.isAuthenticated())
    return next()

  //redirect to base url when loggedid is false
  res.redirect('/')
}
