const connectSql = require('../public/connect');

module.exports = {
  // 
  article (req, res) {
    switch (req.body.type) {
      // 添加文章
      case 0:
        const title = req.body.title.replace(/'/g, '"')
        const content = req.body.content.replace(/'/g, '"')
        const author = req.body.author.replace(/'/g, '"')
        connectSql.connPool (`insert article (title, content, author) values('${title}', '${content}', '${author}')`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '接口错误！', data: req.body.content})
          } else {
            res.send({status: 1, msg: '发布成功！'})
          }
        })
        
      // 查询所有文章
      case 1:
        connectSql.connPool (`select * from article order by id desc limit 10`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '接口错误！'})
          } else {
            res.send({status: 1, msg: '请求成功', data: rows})
          }
        })
        break
      // 查询点击文章
      case 2:
        connectSql.connPool (`select * from article where id = ${req.body.id}`, (err, rows) => {
          if (err) {
            res.send({status: 0, msg: '接口错误！'})
          } else {
            res.send({status: 1, msg: '请求成功', data: rows[0]})
          }
        })
        break
      default:
        res.send({status: 0, msg: '请求信息错误！'})
    }
  }
}