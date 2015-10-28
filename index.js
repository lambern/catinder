var express    		= require("express");
var mongoose   		= require("mongoose");
var app        		= express();
var User     		= require('./models/User/user');
var BodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var passport 		= require('passport');
var session 		= require('express-session');
var uuid 			= require('node-uuid');

// mongoose.set('debug', true);
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


// DEBUG Return list of all users
app.get('/users',function(req, res){
	User.find({}, function(err, rep){
		if(err) console.error(err);
		res.json({user: rep});
	});
});


// Make match between current and targetted user
app.post('/users/match', function(req, res){
	var id_current 	= req.user.id;
	var id_target  	= req.body.id_target;
	var user 		= User.findByIdAndUpdate(id_current,
		{$push: 
			{matches: 
				{id: id_target ,status: 1}
			}
		},function(err){
			if(err) res.json({messsage: 'error'});
			res.json({messsage: 'success'});
		});
});

// Get list of all user who are'nt in array users.match
app.get('/users/unmatched', function(req, res){
	var id_current 	= req.user.id;
	User.findById(id_current, 'matches', function(err, rep){
		if(err) res.json({message: 'error'});
		matched	= rep;
		User.find({id: {$nin: matched.matches}}, function(err, rep){
			if(err) res.json({message: 'error'});
			res.json({rep: rep});
		});
	});
});


// Start Server
app.listen(3000, function () {
	console.log( "Express server listening on port 3000");
});