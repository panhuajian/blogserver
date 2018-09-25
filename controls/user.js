const connectSql = require('../public/connect');

module.exports = {
  // 登录注册接口
  register (req, res) {
    switch (req.body.type) {
      // 注册检测
      case 0:
        connectSql.connPool (`select * from user where username = '${req.body.username}'`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '接口错误！'})
          } else {
            if (rows.length > 0) {
              res.send({status: 0, msg: '用户名已存在！'})
            } else {
              res.send({status: 1, msg: '用户名可用！'})
            }
          }
        })
        break
      // 注册
      case 1:
        connectSql.connPool (`insert user (username, password) values('${req.body.username}', '${req.body.password}')`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '用户注册失败！'})
          } else {
            res.send({status: 1, msg: '用户注册成功！'})
          }
        })
        break
      // 登录
      case 2:
        connectSql.connPool (`select * from user where username = '${req.body.username}' and password = '${req.body.password}'`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '接口错误！'})
          } else {
            if (rows.length > 0) {
              res.send({status: 1, msg: '登录成功！'})
            } else {
              res.send({status: 0, msg: '登录失败！'})
            }
          }
        })
        break
      default:
        res.send({status: 0, msg: '请求信息错误！', data: req.body.type})
    }
  }
};