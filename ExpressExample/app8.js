var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();
var router = express.Router(); 

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

// 왜 ('/process/login')이라는 요청 패스를 설정하는가?
// -> 해당 라우트로 post요청이 들어왔을 때, 실행할 콜백함수를 지정해놓는 것이다. 
router.route('/process/login').post(function(req, res){
    console.log('/process/login 처리함.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과임</h1>');
    res.write('<div><p>Param id:' + paramId + '</p></div>');
    res.write('<div><p>Param password:'+ paramPassword+ '</p></div>');
    res.write("<br><br><a href='/public/login2.html'> 로그인 페이지로 돌아가기</a>");
    res.end(); 
});

app.use('/', router);
