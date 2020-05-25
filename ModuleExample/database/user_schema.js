var crypto = require('crypto');

var Schema = { };

Schema.createSchema = function(mongoose){

    var UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true, 'default' : ''},
        hashed_password: {type: String, required: true, 'default': ''},
        salt: {type: String, required: true},
        name: {type: String, index: 'hashed', 'default': ''},
        age : {type: Number, 'default': -1},
        created_at: {type: Date, index: {unique : false}, 'default': Date.now},
        updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
    });

    console.log('UserSchema 정의함.');

    return UserSchema;
}

module.exports = Schema; 
