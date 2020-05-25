var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');

var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');
var database;

var MemoSchema;
var MemoModel;

app = express();

router = express.Router(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

function connectDB(){

    var databaseUrl = 'mongodb://localhost:27017/local';

    MongoClient.connect(databaseUrl, function(err,db){
        if(err) throw err;

        console.log('데이터베이스에 연결되었습니다.: ' + databaseUrl);

        database = db.db('local');
    });

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다.:' + databaseUrl);

        MemoSchema = mongoose.Schema({
            contents: String,
            created_at: String,
            updated_at: String
        });

        console.log('MemoSchema 정의함.');

        MemoModel = mongoose.model("memo1", MemoSchema);
        console.log('MemoModel 정의함.');
    });

    database.on('disconnected', function(){
        console.log('연결이 끊어졌습니다. 5초 후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    });


}

router.route('/mymemo').post(function(req,res){

    console.log('/mymemo 호출됨');

    var paramMemo = req.body.htmlMemo;

    console.log(paramMemo);

    if(database){
        console.log("hello this is Database");
        addMemo(database, paramMemo, function(err,docs){
            if(err){ throw err;}

            if(docs){
                console.dir(docs);
                var memo = docs._doc.contents;
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>메모 전달 성공</h1>');
                res.write('<div><p>Memo: ' + memo + '</p></div>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                res.write('<h1>메모 전달 실패</h1>');
                res.end(); 
            }
        });
    }else{

        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        res.end(); 
    }


});



var addMemo = function(database, contents, callback){

    console.log('addMemo 호출됨:' + contents);

    var memo = new MemoModel({"contents": contents});

    memo.save(function(err){
        if(err){
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, memo);
    });

};

app.use('/', router);


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
    connectDB();
});
