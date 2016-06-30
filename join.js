var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
server=require('http').createServer(app);
var mongoose = require('mongoose');
console.log('execution start');

mongoose.connect("mongodb://localhost:27017/Join",function(){
  console.log("Mongo Server connected")
})
mongoose.set('debug', true);

app.get('/',function(req,res ){
 res.sendfile('join.html');
});
/*app.post('/user',obj.insert);
*/
server.listen(3000,function(){
  console.log("Server started listening on port 3000");
})

//var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id:Number,
  name: String
})

var PostSchema = new Schema({

 _id: { type: Number, ref: 'User' },
  title: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'}
});

var User = mongoose.model('User',UserSchema)
var Post = mongoose.model('Post',PostSchema)

var obj={};

obj.insert =  function(req,res){
  var data = {
    id:req.body._id,
      name:req.body.name,
      title:req.body.title,
      author:req.body.author
      
   };
   console.log(data);
var aaron = new User({ _id:req.body._id, name:req.body.name});

console.log("aaron method");
aaron.save(function (err) {
  if (err) return (err);
 
  var story = new Post({
    title: req.body.title,
    _id: aaron._id    // assign the _id from the person
  });
  
  story.save(function (err) {
    if (err) return (err);
   
  });
});

Post
.findOne({ title: req.body.title})
.populate('_id')
.exec(function (err,Post) {
  if (err) return (err);
  console.log('The creator is %s', Post._id.name);
  // prints "The creator is Aaron"
});
}
module.exports = app;