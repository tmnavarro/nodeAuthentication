'use strict'

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs')
  })
}
