import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI) {
    throw new Error("Please specific DB_URI in system variable in .env.local")
}



const connectToDB = async ()=>{
    try {
        await mongoose.connect(DB_URI)

        console.log(`Connected to Database in ${NODE_ENV} mode! `)
    } catch (error) {
        console.log("Error connecting to database " + error)

        // learn about
        process.exit(1)
    }
}


export default connectToDB;