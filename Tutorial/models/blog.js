const mongose = require('mongoose');
const Schema = mongose.Schema;

const blogSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});

const Blog = mongose.model("blog",blogSchema);
module.exports  = Blog;