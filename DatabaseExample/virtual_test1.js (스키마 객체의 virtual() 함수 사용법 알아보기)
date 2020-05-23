
var express = require('express');
var http = require('http');
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');


var app = express();

// 기본 속성 설정 
app.set('port', process.env.PORT || 3000);


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

        doTest();
    });

    database.on('disconnected', connectDB);
}


function createUserSchema() {

    UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true},
        name: {type: String, index: 'hashed', 'default':''},
        age: {type: Number, 'default': -1},
        created_at: {type:Date, index:{unique: false}, 'default': Date.now},
        updated_at: {type:Date, index:{unique: false}, 'default': Date.now}
    });

     UserSchema.virtual('info').set(function(info){
         var splitted = info.split(' ');
         this.id = splitted[0];
         this.name = splitted[1];
         console.log('virtual info 설정함: %s %s', this.id, this.name);
     }).get(function(){
         return this.id + ' ' + this.name
     });

     console.log('UserSchema 정의함.');

     UserModel = mongoose.model("users4", UserSchema);
     console.log('UserModel 정의함');

}

function doTest(){

    var user = new UserModel({"info": 'test01 소녀시대'});

    user.save(function(err){
        if(err){
            throw err;
        }

        console.log("사용자 데이터 추가함.");

        findAll();
    });

    console.log('info 속성에 값을 할당함.');
    console.log('id: %s, name: %s', user.id, user.name);

}

function findAll(){
    UserModel.find({}, function(err, results){
        if(err){
            throw err;
        }

        if(results){
            console.log('조회된 user 문서 객체 #0 -> id: %s, name: %s',
                        results[0]._doc.id, results[0]._doc.name);
        }
    });
}



http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트:' + app.get('port'));

    connectDB();

});
