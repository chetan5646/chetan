var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	name:String,
	price:Number
	
		
		
})


var Order = mongoose.model('order',orderSchema)


module.exports = Order;