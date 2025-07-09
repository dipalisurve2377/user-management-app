
import mongoose from "mongoose";

const connectDB=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://dipali:dipali2000@cluster0.pdgsqtx.mongodb.net/');

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed",error);
        process.exit(1)
    }
}
export default connectDB