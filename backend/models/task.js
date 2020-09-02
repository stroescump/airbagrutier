const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    taskLegalRepresentative:{
        type:String,
        required:true
    },
    taskObservations:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
})

module.exports= mongoose.model('Task',taskSchema)