var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name:String,
	email:String,
	password:String,
	confirmPassword:String,
		contact:Number,	
 		city:String,
		locality:String,
		zipcode:Number,
		gender:String,
		
		
})


var User = mongoose.model('test',userSchema)


module.exports = User;
