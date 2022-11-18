const mongoose =require('mongoose')  //here we require mongoose library package

const authorModel=new mongoose.Schema({   //here we can use mongoose Schema function to define Schema
    fname:{
        type:String,
        required:true
    },
    lname:{
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
        unique:true,
        match:[/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/, 'Please fill a valid email address']
        
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('authors',authorModel) // mongoose model function to create a author model