var UserModel = require('../models/userModel');
var PostModel = require('../models/postModel');
var OrderModel=require('../models/orderModel');
var nodemailer = require("nodemailer");
var randomstring = require("randomstring");
var sess;
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: 'mr.ccpawar@gmail.com',
        pass: '@!chetan'
    }
});
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  console.log("encrypted "+crypted);
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  console.log("decrypted "+dec);
  return dec;
}


module.exports = function(){
	
	var obj = {};
    	
     obj.getOrder =  function(req, res){
     	console.log("in get oreder");
	
		OrderModel.find({}, function(err, orderData){
			console.log("in find one"+orderData);
			if(err){
					console.log("error");	
					return res.json({error:"order is Not Found"})
			}							
			 if(orderData){
				console.log("login successful");
				console.log("order Data"+ orderData);
				res.json(orderData);
			
			}
			else
			{
				console.log("invalid order");
				res.send("error");
			}
			
		})								
	}
	


	obj.getUser =  function(req, res){
		console.log("EMAIL:"+ req.query.email);
		console.log("PASSWORD:"+ req.query.password);
		var dec=encrypt(req.query.password);

		UserModel.findOne({email:req.query.email,password:dec}, function(err, userData){
			console.log("in find one"+userData);
			if(err){
					console.log("error");	
					return res.json({error:"User is Not Found"})
			}							
			 if(userData){
				console.log("login successful");
				console.log("User Data"+ userData);
				res.send("login");
			
			}
			else
			{
				console.log("invalid user");
				res.send("error");
			}
			
		})								
	}
	
	obj.insert =  function(req,res){
	sess=req.session;		
		console.log("request Body" + req.body);
		console.log(JSON.stringify(req.body));
		console.log(req.body.name);
		console.log(req.body.password);
		pass = encrypt(req.body.password);
var data = {
    	name:req.body.name,
    	email:req.body.email,
    	password:pass,
   		 confirmPassword:req.body.cpassword,
    	contact:req.body.contact, 
    	city:req.body.city,
     	locality:req.body.locality, 
       	zipcode:req.body.zipcode,
     	gender:req.body.gender,
     	sport:req.body.sport
   };
 var user = new UserModel(data);
 user.save(function(err,userData){
				if(!err){
					res.json(userData);
				}
			});
 var post = new PostModel(data);
 post.save(function(err,postData){
				if(!err){
					
				}
			});
// setup e-mail data with unicode symbols
/*var mailOptions = {
    from: "pranotipatil.77@gmail.com", // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});*/
console.log(req.body.name);

var aaron = new UserModel({ name:req.body.name});

aaron.save(function (err) {
  if (err) return (err);
  
  var story = new PostModel({
    sport:req.body.sport,
    name: aaron.name    // assign the _id from the person
  });
  
  story.save(function (err) {
    if (err) return (err);
    // thats it!
  });
});

PostModel
.findOne({ sport:req.body.sport})
.populate('name')
.exec(function (err,Post) {
  if (err) return (err);
  console.log('The creator is %s', PostModel.name.sport);
  // prints "The creator is Aaron"
});		
}

obj.update =  function(req, res){		
	console.log("in update method");
	pass = encrypt(req.body.password);
	var mailOptions = {
    from: "pranotipatil.77@gmail.com", // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔ updated", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "Password:" +"  "+ req.body.password+"  "+"email:" +"  "+ req.body.email/*"<b>Hello world ✔<br> Password is updated  </b>"*/ // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
		UserModel.findOneAndUpdate({email:req.query.email},
		 {$set:{password:pass}},{upsert:false}, function(err, userData){
				if(!err){
					return res.json(userData)
				}
			})
	}
	obj.update1 =  function(req, res){		
	console.log("in update method");
	// create reusable transport method (opens pool of SMTP connections)

	pass = encrypt(req.body.password);
		UserModel.findOneAndUpdate({email:req.query.email},
		 {$set:{password:pass}},{upsert:false}, function(err, userData){
				if(!err){
					return res.json(userData)
				}
			})
	}

	obj.remove =  function(req,res){
		UserModel.findOneAndRemove({email:req.query.email},function(err, result){
			if(!err){
				return res.json(result)
			}
		})
			
	}
	return obj;
}