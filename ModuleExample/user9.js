function User(id, name){
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function(){
    return {id: this.id, name: this.name};
}

User.prototype.group = {id: 'group1', name: '친구'};


User.prototype.printUser = function(){
    console.log("아이디는: %s, group 이름은 : %s", this.id, this.group.id);
}

module.exports = new User("01", "홍길동");
