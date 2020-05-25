var user = require('./user3.js');


function showUser(){
    return user.getUser().name + ', ' + user.group.name;
}

console.log(showUser());
