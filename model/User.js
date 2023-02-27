const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    roles:{
        User:{
            type:Number,
            default:2023,
            required: true
        },
        Admin : Number,
        Editor : Number
    },
    password:{
        type: String,
        required: true
    },
    refreshToken : {
        type: String
    }
})

module.exports = mongoose.model("User",userSchema);