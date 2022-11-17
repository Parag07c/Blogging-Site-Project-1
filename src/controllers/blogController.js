const blogModel=require("../models/blogModel")
const authorModel=require("../models/authorModel")
const moment=require('moment')

const createBlog=async function(req,res){
    try {
      const authorId=req.body.authorId
      const valid=await authorModel.findOne({_id:authorId})
    if(valid){
        const newBlog=await blogModel.create(req.body)
        return res.status(201).send({status:true,data:newBlog})
    }else{
      return res.status(400).send({msg:"Invalid author Id"})
    }
    } catch (error) {
      return res.status(500).send({msg:error.message}) 
      
    }

}
const getBlogs=async function(req,res){
  try {
    let data=req.query
    data.isPublished=true
    data.isDeleted=false
    let savedBlog= await blogModel.find(data)
    if (savedBlog.length!=0){
      return res.status(200).send({status:true,data:savedBlog})
    }else{
      return res.status(404).send({msg:"Blog Not found"})
    }
  } catch (error) {
    return res.status(500).send({msg:error.message}) 
    
  }
}

const updateBlog=async function(req,res){
  try {
    let blogid = req.params.blogId
        let data = req.body
        let updation = await blogModel.findById(blogid)
        if (updation) {
            if (updation.isDeleted == false) {
                if (data.isPublished == true) {
                    await blogModel.findOneAndUpdate({ _id: blogid }, {
                        $set: { isPublished: true, publishedAt: moment().format('YYYY MM DD') }
                    }, { new: true })
                }
                if (data.title || data.body) {
                    await blogModel.findOneAndUpdate({ _id: blogid }, { $set: { title: data.title, body: data.body } }, { new: true })
                }
                if (data.tags || data.subcategory) {
                    await blogModel.findOneAndUpdate({ _id: blogid }, { $push: { tags: data.tags, subcategory: data.subcategory } }, { new: true })
                }
                updation = await blogModel.findById(blogid)
                res.status(200).send({ status: true, msg: updation })
            } else {
                res.status(404).send({ msg: "blog No longer exist" })
            }
        } else {
            res.status(404).send({ msg: "Blog Id not found" })
        }

    
  } catch (error) {
    return res.status(500).send({msg:error.message}) 
    
  }
}
const  deleteBlog=async function (req,res){
  try {
    let blogId=req.params.blogId
    let valid=await blogModel.findById(blogId)
    if(!valid){
      return res.status(404).send({status:false,msg:"Invalid blog Id"})
    }
    else if(valid.isDeleted==true){
           return res.status(400).send({msg:"Bad request"})
    }
    else{
      await blogModel.updateOne({_id:blogId},{$set:{isDeleted:true,deletedAt:moment().format('YYYY MM DD')}})
      return res.status(200).send()
    }

  } catch (error) {
    return res.status(500).send({msg:error.message}) 
    
  }
}

const deleteBlogByfields=async function(req,res){
      try {
        let data=req.query
        let collection=await blogModel.findOne(data)
        if(!collection){
         return res.status(404).send({status:false,msg:"Invalid data!"})
       }else{
        if(collection.isDeleted==true){
          return res.status(400).send({status:false,msg:"Bad request"})
        }else{
          await blogModel.updateOne({_id:collection._id},{$set:{isDeleted:true,deletedAt:moment().format('YYYY MM DD')}})
          return res.status(200).send({status:true})
        }
      }
      } catch (error) {
        return res.status(500).send({msg:error.message}) 
        
      }
}

module.exports.deleteBlogByfields=deleteBlogByfields
module.exports.deleteBlog=deleteBlog
module.exports.updateBlog=updateBlog
module.exports.createBlog=createBlog
module.exports.getBlogs=getBlogs