const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true })
  .then(() => console.log("数据库连接成功"))
  .catch((err) => console.log(err));

module.exports = mongoose;