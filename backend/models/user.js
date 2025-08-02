const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        default: ""
    },
    savedTrips:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip'
    }]
}, {timestamps:true})

const User= new mongoose.model('User', userSchema)
module.exports= User
