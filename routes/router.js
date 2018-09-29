let express = require('express');
// let goods = require('../controls/goods');
let user = require('../controls/user');
let article = require('../controls/article');
// let api = require('../api');
// let upload = require('../utils/upload');


let router = express.Router();

// user

// 注册
router.post('/api/register', user.register);
router.post('/api/article', article.article);

// router.get(api.userLogout, user.logout);
// router.get(api.userAutoLogin, user.autoLogin); // 自动登录

// router.post(api.userAdd, user.addOne);
// router.post(api.userDelete, user.deleteOne);
// router.post(api.userDeleteMulti, user.deleteMulti);
// router.post(api.userLogin, user.login); // 登录
// router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

module.exports = router;