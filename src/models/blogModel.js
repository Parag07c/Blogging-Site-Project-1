const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Blog body is required',
        trim: true// to remove white space 
    },
    body: {
        type: String,
        required: 'Blog body is required',
        trim: true
    },
    authorId: {
        required: 'Blog is required',
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Author'
    },
    category:{
        type:String,
        required:'Blog category is required',
        trim:true
    },
    subcategory:
    [{type:String,
    trim:true}],
    isPublished:{
        type:Boolean,
        default:false
    },
    PublishedAt:{
        type:Date,
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deleteAt:{
        type:Date,
        default:null
    },

},
    { timestamps: true })
    module.exports=mongoose.model('Blog',blogSchema)

