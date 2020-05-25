var express = require('express');
var http = require('http');
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();

// 기본 속성 설정 
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(express.static('public'));

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));


var database;
var UserSchema;
var UserModel;

function connectDB(){

    var databaseUrl = 'mongodb://localhost:27017/local';

    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다.:' + databaseUrl);
        createUserSchema();
    });

    database.on('disconnected', connectDB);
}


function createUserSchema() {

    UserSchema = require('./database/user_schema').createSchema(mongoose);
    UserModel = mongoose.model("users3", UserSchema);
    console.log('UserModel 정의함.');

}




http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트:' + app.get('port'));

    connectDB();

});


