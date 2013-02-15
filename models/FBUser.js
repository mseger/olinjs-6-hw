var mongoose = require('mongoose'), Schema = mongoose.Schema

var FBUserSchema = new Schema({
	name: String, 
	profPicURL: String, 
	profileBackground: String,
	quotes: String
});

var FBUser = mongoose.model('FBUser', FBUserSchema);

module.exports = FBUser; 