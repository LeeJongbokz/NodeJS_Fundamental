
var express = require('express');
var http = require('http');
var expressSession = require('express-session');
var path = require('path');
var logger = require('morgan');
var route_loader = require('./routes/route_loader');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config');

var app = express(); 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


var router = express.Router(); 
route_loader.init(app, router);

var configPassport = require('./config/passport');
configPassport(app, passport);

var userPassport = require('./routes/user_passport');
userPassport(app, passport);

//===== Passport 관련 라우팅 =====//


app.use('/', router);



// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));   
});
