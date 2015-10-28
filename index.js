var express    		= require("express");
var mongoose   		= require("mongoose");
var app        		= express();
var User     		= require('./models/User/user');
var Match  			= require('./models/Match/match');
var BodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var passport 		= require('passport');
var session 		= require('express-session');
var uuid 			= require('node-uuid');

mongoose.set('debug', true);
app.use(cookieParser());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(session({
  genid: function(req) {
    return uuid.v1();
  },
  secret: 'catinder'
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');

require('./config/passport')(passport);
require('./route.js')(app, passport);
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });
// 


// GET /users : Return list of all users
app.get('/users',function(req, res){
	User.find({}, function(err, rep){
		if(err) console.error(err);
		res.json({user: rep});
	});
});

app.post('/users/login', function(req, res){
	var username 	= req.body.username;
	var password 	= req.body.password;
});

app.post('/users/register', function(req, res){
	var username 	= req.body.username;
	var mail 		= req.body.mail;
	var password 	= req.body.password;
	var usr = new User({username: username, email: mail, password: password});
	usr.save(function(err, usr){
		if(err) return console.error(err);
		res.json({message: 'success'});
	});
});

app.post('/users/match', function(req, res){
	var id_current 	= req.body.id_current;
	var id_target  	= req.body.id_target;
	var match 		= new Match({id_current: id_current, id_target: id_target, status: 1});
	match.save(function(err, match){
		if(err) return console.error(err);
		res.json({message: 'success'});
	});
});

app.get('/users/unmatched', function(req, res){
	var id_current = req.user.facebook.id;
	Match.findByFbId(id_current, function(err, match) {
		if(err) console.error(err);
		console.log(match);
	});
});

app.get('/matches', function(req, res){
	Match.find({}, function(err, rep){
		if(err) console.error(err);
		res.json({matches: rep});
	});
});



// Start Server
app.listen(3000, function () {
	console.log( "Express server listening on port 3000");
});