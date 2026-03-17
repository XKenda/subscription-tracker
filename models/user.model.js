// user model



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "username is required"], // الاراي دي خدت القيمة وخدت الايرور مسدج الي هتظهر لو متحققش 
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email"]
    },
    password: {
        type: String,
        required: [true, "user Password is required"],
        minLength: 8,
    }
}, {timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;