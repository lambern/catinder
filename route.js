module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index'); 
    });

   

    // route for showing the profile page
    app.get('/logged', isLoggedIn, function(req, res) {
        console.log('loggin');
        res.json({message: 'success'});
    });

    app.get('/error', function(req, res) {
        res.json({message: 'error'});
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'public_profile'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/logged',
            failureRedirect : '/error'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log(req);
    // if user is authenticated in the session
    if (req.isAuthenticated())
        return next();
    console.log('not logged');
    // if they aren't redirect them to the home page
    res.redirect('/');
}