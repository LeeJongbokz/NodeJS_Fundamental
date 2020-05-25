
var user = require('./user5.js');

function showUser(){
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보: %s', showUser());



