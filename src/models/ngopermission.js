const mongoose = require('mongoose');
const validator = require('validator');

const ngopermissionSchema = new mongoose.Schema({
    patient_id:{
        type: String,
        required: true
    },
    patient_name:{
        type:String
    },
    patient_phone:{
        type:String
    },
    patient_emailid:{
        type:String
    },
    patient_gender:{
        type:String
    },
    patient_address:{
        type:String
    },
    patient_state:{
        type:String
    },
    website:{
        type:String,
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    years:{
        type:Number,
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    emailid:{
        type:String
    }
})


const ngopermission = mongoose.model('ngopermission',ngopermissionSchema);
module.exports = ngopermission;