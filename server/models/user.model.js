import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, "Name is required"],
        minLength: [5, "Name must be at least 5 character"],
        maxLength: [50, "Name should be less than 50 character"],
        lowercase: true,
        trim: true
    },
    email: {
        type: 'String',
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
        ]
             
    },
    password: {
        type: 'String',
        required: [true, "Password is required"],
        minLength: [8, "Name must be at least 8 character"],
        select: false
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},
{
    timestamps: true
})

const User = model("User", userSchema)

export default User;