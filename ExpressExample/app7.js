
// express 패키지를 import함
var express = require('express');
// http 패키지를 import함
var http = require('http');
// path 패키지를 import함
var path = require('path');

// body-parser 패키지를 import함
var bodyParser = require('body-parser');

// serve-static 패키지를 import함
var static = require('serve-static');

// express객체인 app을 선언함 
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(function(req, res, next){

    console.log('첫 번째 미들웨어에서 요청을 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id: ' + paramId+ '</p></div>');
    res.write('<div><p>Param password:' + paramPassword+ '</p></div>');
    res.end();

});


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 ');
});

