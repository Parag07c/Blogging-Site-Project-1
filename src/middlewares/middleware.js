const jwt= require('jsonwebtoken')
const blogModel = require('../models/blogModel')

const authentication= async function(req,res,next){
try{
    let token = req.headers["x-api-key"]
    if(!token){
        return res.status(400).send({message:"token is required"})
    }
    let verify= jwt.verify(token,"Project-1")
    if(!verify){
        return res.status(401).send({status:false,msg:"authentication failed! invalid token"})
    }
    req.logedIn=verify.authorId
    next()

}   catch(error){
    return res.status(500).send({msg:error.message})
} 
}

const authorization =async function (req,res,next){
    try {
        let authorId=req.logedIn
        let blogId=req.params.blogId
        let valid=req.query
        if(blogId){
            let data=await blogModel.findById(blogId)
            if(!data){
                return res.status(404).send({status:true,msg:"Invalid blogId"})
            }
            else if(data.authorId!=authorId){
                return res.status(403).send({status:false,msg:"authorization failed! You are not an authorized person"})
            }
            next()
        }else if(valid){
            let data=await blogModel.findOne(valid)
            if(!data){
                return res.status(404).send({status:true,msg:"Invalid or data not exist"})
            }
            else if(data.authorId!=authorId){
                return res.status(403).send({status:false,msg:"authorization failed! You are not an authorized author "})
            }
            next()
        }
    } catch (error) {
    return res.status(500).send({msg:error.message})
    }
}

module.exports={authentication,authorization}