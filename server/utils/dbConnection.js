import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection Successful')
    } catch (error) {
        console.log('Something Went Wrong')
        return error
    }
}