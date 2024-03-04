const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:4,
        max:30,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        min:4,
        max:30,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    order:{
        type:Array,
      
    }

});


module.exports = mongoose.model('user',userSchema);