const mongoose = require('mongoose');
const validator = require('validator');

const ngodetailsSchema = new mongoose.Schema({
    // directorname:{
    //     type:String,
    //     required: true
    // },
    // gender:{
    //     type:String,
    //     required:true
    // },
    website:{
        type:String,
    },
    address:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    // othercategory:{
    //     type:String
    // },
    years:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Years can't be negative");
            }
        }
    },
    // people:{
    //     type:Number,
    //     validate(value){
    //         if(value<0){
    //             throw new Error("Numbers can't be negative");
    //         }
    //     }
    // },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    emailid:{
        type:String
    }
    // links:[{
    //     type:String
    // }
})


const ngodetails = mongoose.model('ngodetails',ngodetailsSchema);

module.exports = ngodetails;