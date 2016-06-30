var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
 name: { type: String, ref: 'test' },
  sport:String
})

var Post = mongoose.model('Post',PostSchema)

module.exports = Post;