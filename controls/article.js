const connectSql = require('../public/connect');
const formidable = require('formidable');
const path = require('path');

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
  },
  upload (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + '/../img');
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files){
      var imgname = files.avatar.path.split('\\').pop();
      console.log('11111', imgname);
      // var nameArray = filename.split('.');
      // var type = nameArray[nameArray.length - 1];
      // var name = '';
      // for (var i = 0; i < nameArray.length - 1; i++) {
      //     name = name + nameArray[i];
      // }
      // var date = new Date();
      // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
      // var avatarName = name + time + '.' + type;
      // var newPath = form.uploadDir + "/" + avatarName;
      // fs.renameSync(files.the_file.path, newPath);  //重命名
      res.send({data: '/blogserver/img/' + imgname})
    })
  }
}