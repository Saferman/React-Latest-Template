const express = require('express');
const user = require('./user');
// 注册路由
const router = express.Router();;
// 路由中间件
router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  console.log('this is a api request!');
  // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
  next();
});

router.use('/user', user);

module.exports = router;
