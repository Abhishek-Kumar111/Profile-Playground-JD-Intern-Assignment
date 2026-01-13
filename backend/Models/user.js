const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    mobileNo:{
        type:String,
        default:""

    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    }
},{timestamps:true})

const userModel = mongoose.model("user",UserSchema);
module.exports = userModel;