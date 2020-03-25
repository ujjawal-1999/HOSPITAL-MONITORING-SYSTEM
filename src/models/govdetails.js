const mongoose = require('mongoose');

const govfundSchema = new mongoose.Schema({
    accepted:{
        type:Number
    },
    declined:{
        type:Number,
    },
    
})


const govfund = mongoose.model('govfund',govfundSchema);
module.exports = govfund;