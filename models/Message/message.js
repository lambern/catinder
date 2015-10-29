var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
   id_current		: String,
   id_target		: String,
   raw: [{
   		content		: String,
   		date 		: Date,
   }]
});



var dbCatinder = mongoose.createConnection('mongodb://localhost:27017/catinder');

dbCatinder.on('error', console.error.bind(console, 'Mongoose error'));

module.exports = mongoose.model('Message', Message);

