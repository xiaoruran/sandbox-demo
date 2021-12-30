const User = require('../db/user');

// 增加用户
function createUser(username, password) {
  return new Promise((resolve, reject) => {
    const user = new User({
      username: username,
      password: password,
    })
    user.save().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });

}

// 查找用户根据username
function findUserByName(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err)
    })
  })
}

//查找用户根据_id
function findUserById(_id) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: _id }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err)
    })
  })
}

// 更新用户
function updateUser(_id, { username, password }) {
  return new Promise((resolve, reject) => {
    console.log(_id);
    User.updateOne({ _id }, { username, password,updateTime:new Date().getTime()}).then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    })
  })
}

// 获取用户列表
function getUserList() {
  return new Promise((resolve, reject) => {
    User.find().then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    })
  })
}


module.exports = {
  createUser,
  findUserByName,
  findUserById,
  updateUser,
  getUserList
}