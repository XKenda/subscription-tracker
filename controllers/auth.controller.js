import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';


// what is a req body? req.body is ab object containing data from the client ( post request)
// post method can pass data through

export const signUp = async (req, res, next)=>{
    const session = await mongoose.startSession(); // هنا انت بتبدأ حاجة تخلي كل العمليات تعتبر عملية واحدة
    session.startTransaction(); // هنا انت كدة بتخلي كل العمليات تنجح او مفيش حاجة تنجح

    try {
        // create new user
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser) {
            const error = new Error("user already exist")
            error.statusCode = 409;
            throw error;
        }



        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUsers = await User.create([{name, email, password: hashedPassword}],{session}) // انت حطيت دي هنا عشان تعرف ان العملية دي من الترانزاكشن الي شغالة دلوقتي

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { 'expiresIn': JWT_EXPIRES_IN})

        await session.commitTransaction() // بياكد على العمليات ويحفظها
        session.endSession(); // يوقف السيشن الي شغالة

        res.status(201).send({
            success: true,
            message: 'User Created Successfully',
            data: {
                token,
                user: newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction(); // يلغي العمليات خالص
        session.endSession();
        next(error)
    }
}


export const signIn = async (req, res, next)=> {

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            const error = new Error("Email or Password is incorrect");
            error.statusCode = 404;
            throw error;
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}) 


        res.status(200).send({
            sucess: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next)=> {
    
}