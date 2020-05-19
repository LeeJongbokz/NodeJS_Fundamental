var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

app = express(); 

app.set('view engine', 'pug');

var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();


router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨.');

    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 호출됨.');

        
    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });

    res.redirect('/process/showCookie');

});

app.use('/', router);


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 ');
});


