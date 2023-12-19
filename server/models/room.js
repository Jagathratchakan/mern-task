const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    maxcount : {
        type: Number,
        required : true
    },
    phonenumber : {
        type: Number,
        required : true
    },
    rentperday : {
        type: Number,
        required : true
    },
    maxday : {
        type : Number,
        required : true
    },
    userid : {
        type:String,
        required : true
    },

    imgurls : [],

    currentbookings : [],
},
{timestamps:true,
})

const roomModel = mongoose.model('rooms',roomSchema)
module.exports = roomModel