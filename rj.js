var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id:Number,
  username: String
})
var PostSchema = new Schema({

 _creator : { type: Number, ref: 'User' },
  title: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'}
});

var User1 = mongoose.model('User',UserSchema)
var Post1 = mongoose.model('Post',PostSchema)

var User= new User1({
 username:'chetan' 
})

var Post= new Post1({
  title:'xyz',
  author:'writer'
})


User.save(function(error,result){
  if(error){
console.log('user save method')
    
  }
  else
  {
    console.log(result);
  }
})

Post.save(function(error,result){
  if (error) {
    console.log('post method')
  }else{
    console.log(result)

  }
})

Post1.findOne({author:'writer' })

  .populate('author')

  .exec(function(error, result) {
if(error){
    console.log('find method')
  }
else{
    console.log(result)
  }
  })
  /*app.listen(3000,function(){
  console.log("Server started listening on port 3000");
})*/
/*var Schema = mongoose.Schema;
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var aaron = new Person({ _id: 0, name: 'Aaron', age:100 });

aaron.save(function (err) {
  if (err){
    console.log('aaron method')
  };
  
  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) {
      console.log('err')
    };
    // thats it!
  });
});


Story.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) {console.log('err')};
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
});

Story.findOne({ title: 'Once upon a timex.' }, function(error, story) {
  if (error) {
    console.log('err');
  }
  story._creator = aaron;

  console.log(story._creator.name); // prints "Aaron"
});

Story
.findOne({ title: /timex/i })
.populate('_creator', 'name') // only return the Persons name
.exec(function (err, story) {
  if (err) {
  console.log('err')
};
  
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
  
  console.log('The creators age is %s', story._creator.age);
  // prints "The creators age is null'
})*/