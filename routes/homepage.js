var FBUser = require('../models/FBUser')

exports.loginLandingPage = function(req, res){
	res.render('loggedOutPage', {title: "Login with Facebook"});
}
exports.main = function(req, res){
	if(req.session.user !== null){
		res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: req.session.user});
	}else{
		res.redirect('/');
	}
};












