var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

app = express();

router = express.Router(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

router.route('/mymemo').post(function(req,res){

    console.log('/mymemo 호출됨');

    var memo = req.body.content; 

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>메모 전달 성공</h1>');
    res.write('<div><p>Memo: ' + memo + '</p></div>');
    res.end();

});

app.use('/', router);


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});

