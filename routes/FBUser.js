var FBUser = require('../models/FBUser')

// login a new user, start a new session
exports.login = function (req, res) {
  req.facebook.api('/me', function(err, data){
  	req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData){
  		var existentUser = FBUser.findOne({name: data.name}, function (err, user){
  			if(user){
  				req.session.user = user;
  				res.redirect('/homepage');
	  		}else{
	  			var loggedInUser = new FBUser({name: data.name, profPicURL: picData.data.url, profileBackground: "white", quotes: data.quotes});
	  			loggedInUser.save(function (err){
			  			if(err)
			  				console.log("Unable to save new user.");
			  		 	req.session.user = loggedInUser; 
			  			res.redirect('/homepage');
	  			});
	  		}
	  	});
  	});
  });
};

// logout of your account
exports.logout = function(req, res){
	req.session.user = null;
	res.redirect('/');
}

// delete all users
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	FBUser.remove({}, function(err) { 
   		console.log('collection removed');
   		res.redirect('/');
	});
};