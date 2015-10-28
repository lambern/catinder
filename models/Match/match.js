var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Match = new Schema({
   id_current: String,
   id_target: String,
   status: Number
});

Match.static('findByFbId', function(fbId, callback){
	return this.find({id_current: { $ne: fbId}}, callback);
});


var dbCatinder = mongoose.createConnection('mongodb://localhost:27017/catinder');

dbCatinder.on('error', console.error.bind(console, 'Mongoose error'));

module.exports = mongoose.model('Match', Match);

