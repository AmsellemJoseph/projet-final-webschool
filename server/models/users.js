const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    mail:{
        type:String,
    },
    credit:{
        type:Number,
    },
    admin:{
        type:Boolean,
    },

},{
    collection:'users'
})

module.exports = mongoose.model('User',userSchema)