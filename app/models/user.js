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

// no use arrow function because need access "this"
userShema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}


module.exports = mongoose.model('User', userShema)
