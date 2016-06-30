var UserModel = require('../models/userModel');
var OrderModel = require('../models/orderModel');

module.exports = function(){
	
	var obj = {};
	obj.landing = function(req,res){		
		UserModel.find({}, function(err, userData){
			console.log(userData)
			if(err){
				return res.render("landing", {title:"My Landing Page",description:"Landing Page Description"});				
			}							
			if(userData){
				console.log("User Data"+ userData)
				return res.render("landing", {title:"My Landing Page",description:"Landing Page Description",userData:userData});
				
			}
		})	
		 
	}
	
	obj.addUserPage =  function(req,res){
		res.render('addUser');

	}
	obj.newUser =  function(req,res){
		res.render('new');
	}
	obj.display=function(req,res){
		res.render('success')
	}
	obj.update =  function(req,res){
	
		res.render('editUser');
	}
	obj.update1 =  function(req,res){
		
		res.render('fpass');
	}
	obj.remove=function(req,res){
		res.render('deleteUser')
	}
	return obj;
}