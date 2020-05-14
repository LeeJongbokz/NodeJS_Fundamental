const express = require('express');

const app = express();

const PORT = 4000;

function handleListening(){
    console.log("PORT 4000 is running");
}

app.get('/', function(req, res){
    res.send("Hello world");
});


app.listen(PORT, handleListening);
