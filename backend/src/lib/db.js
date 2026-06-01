import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB Connected",conn.connection.host);
    }
    catch(error){
        console.log("Connection To Mongo Failed",error);
        process.exit(1);
    }
}