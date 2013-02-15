var FBUser = require('../models/FBUser')

exports.loginLandingPage = function(req, res){
	res.render('loggedOutPage', {title: "Login with Facebook"});
}
exports.main = function(req, res){
	if(req.session.user !== null){
		console.log(req.session.user);
		res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: req.session.user});
	}else{
		res.redirect('/');
	}
};

exports.add_comment = function(req, res){
	// post a comment to a photo on Facebook
	req.facebook.api('/'+req.body.fbid+'/comments', 'POST', {'message': req.body.comment}, function (err, stuff) {
		if(err)
			return console.log("Can't post comment to photo");
		res.redirect('/homepage');
	});
};











