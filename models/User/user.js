var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var User = new Schema({
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    matches			 : [{
    	id			 : String,
    	status		 : Number
    }]
});


User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var dbCatinder = mongoose.connect('mongodb://localhost:27017/catinder').connection;

dbCatinder.on('error', console.error.bind(console, 'Mongoose error'));

module.exports = mongoose.model('User', User);

