var userController = require('./controllers/user')()
var rootController = require('./controllers/root')()


module.exports = function(app){

	app.get('/', rootController.landing);
	app.get('/landing', rootController.landing);
	app.get('/success',rootController.display);
	app.get('/new', rootController.newUser);
	app.get('/addUser', rootController.addUserPage);
	app.get('/editUser', rootController.update);
	app.get('/fpass', rootController.update1);
	app.get('/deleteUser', rootController.remove);

	// app.get('/landing', landing)

  //User APIs
	app.get('/orders', userController.getOrder);
 	app.get('/user', userController.getUser);
 	app.post('/user', userController.insert);
 	app.put('/user', userController.update);
 	app.put('/user', userController.update1);
 	app.delete('/user', userController.remove);
  
  
}
