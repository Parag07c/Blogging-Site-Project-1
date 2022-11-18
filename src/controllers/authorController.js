const authorModel=require('../models/authorModel')
const jwt= require('jsonwebtoken')

const createAuthor=async function(req,res){
    try {
        const data=req.body
        const result=await authorModel.create(data)
        return res.status(201).send({status:true,msg:result})
    } catch (error) {
       return res.status(500).send({status:false,msg:error.message}) 
    }
}

const login =async function(req,res){
    try {
        let body=req.body
        let valid=await authorModel.findOne(body)
        if(!valid){
            return res.status(404).send({status:false,msg:"Invalid emailId or password"})
        }
        let token= jwt.sign({authorId:valid._id},"Project-1")
        return res.status(200).send({status:true,msg:token})

    } catch (error) {
       return res.status(500).send({status:false,msg:error.message}) 
        
    }
}

module.exports.login=login                 
module.exports.createAuthor=createAuthor
