const mongoose = require('./db_connect.js');

const user = new mongoose.Schema({
  username:String,
  password: String,
  role: {
    type:Number,
    default:0,
  },
  updateTime: {
    type:Number,
    default:new Date().getTime(),
  },
});

const User = mongoose.model('User',user);

module.exports = User;