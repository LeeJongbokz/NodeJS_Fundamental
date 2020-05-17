var express = require('express')
var http = require('http')

var app = express()

app.use(function(req, res, next){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    res.redirect('https://www.google.co.kr');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 ');
});
