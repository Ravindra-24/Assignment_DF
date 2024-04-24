import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
        default:null,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
        default:null,
    },
    phone: {
        type: String,
        required: false,
        default:null,
    },
    tokens : [{
        type:String,
    }],
}, {
    timestamps:true,
})

export const User = mongoose.model('User', userSchema)