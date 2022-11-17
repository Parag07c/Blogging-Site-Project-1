const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    
    },
    body: {
        type: String,
        required:true,
    },
    authorId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'
    },
    tags:[String],
        
    category:{
        type:String,
        required:true,
    },
    subcategory:[String],
           
    isPublished:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:Date,
        default:""
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:""
    },

},
    { timestamps: true })
    module.exports=mongoose.model('Blog',blogSchema)

