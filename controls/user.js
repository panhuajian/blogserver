const connectSql = require('../public/connect');

module.exports = {

    register (req, res) {
        connectSql.connPool (`insert user (username, password) values('${req.body.username}', '${req.body.password}')`, (err, rows) => {
            if (err) {
                res.send({status: 0, msg: '用户注册失败！'})
            } else {
                res.send({status: 1, msg: '用户注册成功！'})
            }
        }) 
    }
};