var passport = require('passport');

exports.authenticate = function(req, res, next) {
	req.body.username = req.body.username.toLowerCase();
	var auth = passport.authenticate('local', function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.send({
				success : false
			})
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			res.send({
				success : true,
				user : {
					username : user.username,
					firstName : user.firstName,
					lastName : user.lastName,
					id : user._id,
					roles : user.roles
				}
			});
		})
	})
	auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(403);
		res.end();
	} else {
		next();
	}
};

exports.requiresRole = function(roles) {
	return function(req, res, next) {
		var isAuthorized = false, i=0;
		if (!req.isAuthenticated()) {
			res.status(403);
			res.end();
		} else {
			for(i=0;i<roles.length;i++){
				if(req.user.roles.indexOf(roles[i]) !== -1) {
					isAuthorized = true;
					break;
				}
			}
			if(!isAuthorized) {
				res.status(403);
				res.end();
			}
			else {
				next();
			}
		}
	}
};
