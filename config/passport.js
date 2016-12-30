var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var mongoose = require("mongoose");

module.exports = function() {
	
	var Usuario = mongoose.model("Usuario");
	
	passport.use(new GitHubStrategy({
		clientID: "",
		clientSecret: "",
		callbackURL: ""
	},
	function(acessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{"login": profile.username},
			{"nome": profile.displayName},
			function(err, usuario) {
				if (err) {
					console.log(err);
					return done(err);
				}
				return done(null, usuario);
			}
		);
	}));
	
	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});
	
	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});
};