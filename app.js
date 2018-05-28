/**
 * express 静态服务器 ngork测试暴漏3000端口
 */
var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, '/src')));

/**
 * 此处应该设置动态路由 后期优化
 * 可实现思路  遍历文件夹 生成router地址和目录
 */
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.get('/tab', function (req, res) {
  res.sendFile(path.join(__dirname, './src/tab.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, './page/login.html'));
});

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, './page/signup.html'));
});

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, './page/index.html'));
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});