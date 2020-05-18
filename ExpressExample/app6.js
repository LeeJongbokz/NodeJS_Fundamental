var express = require('express')
var http = require('http')

var app = express()

app.use(function(req, res, next){

    console.log('첫 번째 미들웨어에서 요청을 처리함');

    var userAgent = req.header('User-Agent');
    
    // 요청 파라미터는 영어로 query string이라고 함
    // 즉, 클라이언트에서 서버로 요청할 때, 문자열로 데이터를 전달함
    // 이 요청 파라미터는 서버 쪽에서 받아 사용할 수 있어야 하므로
    // req객체의 query 객체 안에 넣어두게 됨 
    var paramName = req.query.name;

    res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent: ' + userAgent+ '</p></div>');
    res.write('<div><p>Param name::' + paramName + '</p></div>');
    res.end(); 
});


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 ');
});
