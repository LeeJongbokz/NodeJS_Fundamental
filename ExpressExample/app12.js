var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

app = express(); 

app.set('view engine', 'pug');

var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

var router = express.Router();

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

router.route('/process/product').get(function(req, res){
    console.log('/process/product 호출됨');

    // user세션이 있는지 확인한 후,
    // 만약 세션 객체가 있으면
    if(req.session.user){
    
        // /public/product.html 파일을 응답으로 보내어
        // 상품 정보를 볼 수 있게 함 
        res.redirect('/public/product.html');
    }else{
        // 하지만 user세션이 없다면
        // 로그인 페이지를 보여줌 
        res.redirect('/public/login2.html');
    }

});

router.route('/process/login').post(function(req,res) {

    console.log('/process/login 호출됨');

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    if(req.session.user){
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/public/product.html');
    }else{

        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        }
    };

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>로그인 성공</h1>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/process/product'> 상품 페이지로 이동하기</a>");
    res.end();
});

router.route('/process/logout').get(function(req, res){

    console.log('/process/logout 호출됨');

    if(req.session.user){
        console.log('로그아웃합니다.');

        req.session.destroy(function(err){
            if(err){
                throw err;
            }
            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
}

app.use('/', router);


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 ');
});

