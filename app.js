
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , homepage = require('./routes/homepage')
  , FBUser = require('./routes/FBUser')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: '480495895344412', secret: '969edafa9a66f9947050c80daad36d49'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

// set a global variable for the permissions I want
global.scope = ['user_photos', 'friends_photos', 'publish_stream'];

// GETS
app.get('/', homepage.loginLandingPage);
app.get('/login', Facebook.loginRequired({scope: scope}), FBUser.login);
app.get('/homepage', Facebook.loginRequired({scope: scope}), homepage.main);
app.get('/users/delete_all', FBUser.delete_all);


// PUTS
app.post('/login', Facebook.loginRequired({scope: scope}), FBUser.login);
app.post('/logout', Facebook.loginRequired({scope: scope}), FBUser.logout);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
