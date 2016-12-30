var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var mongoose = require("mongoose");

module.exports = function() {
	
	var Usuario = mongoose.model("Usuario");
	
	passport.use(new GitHubStrategy({
		clientID: "821b5e94428cbac21eb8",
		clientSecret: "1e4acff1fbb1582d8b3f2db68be68a9b60e2d1fa",
		callbackURL: "http://contatooh-alanpinhel.c9users.io/auth/github/callback"
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