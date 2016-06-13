'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userShema = mongoose.Schema({

  local : {
    email : String,
    password : String
  },
  facebook : {
    id : String,
    token : String,
    email : String,
    name : String
  }

})

userShema.methods.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

userShema.methods.validPassword = (password) =>
  bcrypt.compareSync(password, userShema.local.password)

module.exports = mongoose.model('User', userShema)
