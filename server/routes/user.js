const express = require('express');

const router = express.Router();

// 获取用户列表
router.get('/info', (req, res) => {
  res.json({
    code: 0,
    message: '',
    data : {'name':'saferman'}
  });
});


module.exports = router;
