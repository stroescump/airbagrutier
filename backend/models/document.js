const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    dateUploaded:{
        type:Date,
        required:true,
    },
    userId:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Document',documentSchema)