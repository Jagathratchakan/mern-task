const mongoose = require("mongoose");

const userscherma = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    pass : {
        type: String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    isAdmin : {
        type:Boolean,
        default : false
    }
},{
    timestamps : true,
}
)

const userModel = mongoose.model('users',userscherma)

module.exports = userModel