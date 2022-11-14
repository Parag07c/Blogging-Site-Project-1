const mongoose =require('mongoose')  //here we require mongoose library package

const authorModel=new mongoose.Schema({   //here we can use mongoose Schema function to define Schema
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        enum:["Mr", "Mrs", "Miss"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:Number,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('authors',authorModel) // mongoose model function to create a author model