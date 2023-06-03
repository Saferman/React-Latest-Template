const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const mongoose = require('./db/config/mongoose'); // 连接mongodb数据库
const router = require('./routes/index.js');



var app = express();
app.set('port', process.env.PORT || 3003);
// const db = mongoose();
// 加载日志的中间件
// 每一次服务请求都会将信息打印在控制台中
app.use(logger('dev'));
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

//app.use('/',express.static(path.join(__dirname,"..",'build')));
// app.use('/',express.static(path.join(__dirname,"..",'static')));

// 所有的路由会加上“／api”前缀
app.use('/api', router); //添加router中间件

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../dist',"index.html"));
});

/**
 * Socket.io stuff.
 * https://socket.io/docs/v3/handling-cors/
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
  cors: {
    origin: ["http://localhost:3000","http://localhost:8080"],
    methods: ["GET", "POST"]
  }
});
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

// express 自动帮我们创建一个server，封装的node底层http
server.listen(app.get('port'), () => {
  console.log('node server is listening ' + app.get('port'));
});
