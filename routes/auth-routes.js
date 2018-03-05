// *********************************************************************************
// auth-routes.js - this file offers a set of routes for authenticating users with OAuth
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');



// Routes
// =============================================================
module.exports = function(app) {
	
	// Auth Login
	app.get("/auth/login", (req, res) => {
	    res.render("login", {user: req.user});
	});

	// Auth Logout
	app.get('/auth/logout', (req, res) => {
		// handle with passport
		//res.send('logging out');
		req.logout();	//removes the userID from the cookie
		res.redirect("/");
	});

	// Auth with Google
	app.get('/auth/google', passport.authenticate('google', {

		// What do we want to retrieve from the user's google+?
		scope: ['profile']
	}));

	// Google Redirect Callback Route
	app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
		//res.send('Reached callback URI');
		//res.json(req.user);
		// console.log(req.user);
		res.redirect('/index/' + req.user.id);		//should redirect to '/profile/req.user.id'
	});

	app.get('/auth/getuser', function(req, res) {
		res.json(req.user.id);
	});
};