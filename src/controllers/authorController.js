const authorModel=require('../models/authorModel')
const jwt= require('jsonwebtoken')

let nameRegex=/^[a-zA-Z]{1,20}$/
let emailRegex=/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
let passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const createAuthor=async function(req,res){
    try {
        if(Object.keys(req.body).length==0) return res.status(400).send({status:false,msg:"Please fill all the fields"})
        let data=req.body
        let {fname,lname,title,email,password}=data
        if(!fname || fname=="")
          return res.status(400).send({status:false,msg:"first name is required "})
          fname=fname.trim()
         if(!nameRegex.test(fname)) {
          return res.status(400).send({status:false,msg:"Please enter a valid fname "})
         }
        if(!lname || lname==""){
            return res.status(400).send({status:false,msg:"last name is required"})
          }
        lname=lname.trim()
        if(!nameRegex.test(lname)) {
          return res.status(400).send({status:false,msg:"Please enter a valid lname "})
         }
        if(!title || title==""){
            return res.status(400).send({status:false,msg:"title is required"})
          }
          title=title.trim()
        if(!["Mr", "Mrs", "Miss"].includes(title)){
            return res.status(400).send({status:false,msg:"Please provide valid title"})
        }  
        if(!email){
            return res.status(400).send({status:false,msg:"email is required"})
          }
          if(!emailRegex.test(email)){
            return res.status(400).send({status:false,msg:"Please enter valid email"})
          }
          let check=await authorModel.findOne({email:email})
          if(check){
            return res.status(400).send({status:false,msg:"email already exist"})

          }
        if(!password){
            return res.status(400).send({status:false,msg:"password is required"})
          }
        if(!passwordRegex.test(password)){
          return res.status(400).send({status:false,msg:"Please provide valid password having atleast 8 characters"})

        }
        let createData=await authorModel.create({fname,lname,title,email,password})
        return res.status(201).send({status:true,msg:createData})
       } catch (error) {
          return res.status(500).send({status:false,msg:error.message}) 
       }
}

const login =async function(req,res){
    try {
        if(Object.keys(req.body).length==0) return res.status(400).send({status:false,msg:"Body is empty"})
        const {email,password}=req.body
        if(!email)return res.status(400).send({status:false,msg:"Please provide email"})
        if(!password)return res.status(400).send({status:false,msg:"Please enter password"})
        const valid=await authorModel.findOne({email,password})
        if(!valid){
            return res.status(404).send({status:false,msg:"Invalid emailId or password"})
        }
        let token= jwt.sign({authorId:valid._id}, "Project-1")
        
        return res.status(200).send({status:true,msg:token})

    } catch (error) {
       return res.status(500).send({status:false,msg:error.message}) 
        
    }
}

module.exports.login=login                 
module.exports.createAuthor=createAuthor
