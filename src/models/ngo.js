const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ngoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registration_id:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

ngoSchema.pre('save', async function(next){
    //this means we wanna do smthng before user are saved
    const user = this
    user.password = await bcrypt.hash(user.password,8);
    

    next()  //if we dont call next it will hang forever. we call next when we are done right here
})

const ngo = mongoose.model('ngo',ngoSchema);
module.exports = ngo;