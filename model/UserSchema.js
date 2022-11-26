

// const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
Name: {
    type :String,
    required : true,
    minlength : 3
    
}
,

Username : {
    type : String,
    unique:true,

},
Email:{
    type : String,
    // unique  : [true,"Email is Already Present"],
    // validate(value){
    //     if(!validator.isEmail(value)){
    //                 throw new Error("Invalid Email")
    //     }
    // }
},
Phone: {
    type : Number,
    unique : true,
    maxlength : 10
},
password: {
    type : String,
    unique: true
    ,
    minlength: 5
},
Confirm_password: {
    type : String,
    unique: true
    ,
    minlength: 5
},
Gender:{
    type : String,

}
})




const model_form = new mongoose.model("form_Info1",UserSchema);
module.exports = model_form;
