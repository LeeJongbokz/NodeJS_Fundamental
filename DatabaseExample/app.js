
var express = require('express');
var http = require('http');
var path = require('path');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('server-static');
var errorHandler = require('errorhandler');

// 익스프레스 객체 생성 
var app = express();

// 기본 속성 설정 
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));


// cookie-parser 설정 
app.use(cookieParser());


// 세션 설정 
app.use(expressSession({
    secret:'my key',
    resave: true,
    saveUninitialized: true
}));

// 라우터 객체 참조 
var router = express.Router();

// 404 오류 페이지 처리 
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨.');
});

// 라우터 객체 등록 
app.use('/', router);

// 404 오류 페이지 처리 
var errorHandler = expressErrorHandler({
    static:{
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// 서버 시작 
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트:' + app.get('port'));
}
