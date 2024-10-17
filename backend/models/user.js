const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:6,
        maxLength:50,
    },
    firstName:{
        type:String,
        required:true,
        maxLength:20,
        trim:true,

    },
    lastName:{
        type:String,
        required:true,
        maxLength:20,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'trainer'],
        default: 'user' 
    },
    familyMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RegisteredMember',
        },
      ],favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }], // Storing the favorite listings
});
    

const User=mongoose.model('users',userSchema);
module.exports ={User};