import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "../backend/db.js"
import userRoutes from "./routes/userRoutes.js"


dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json())

// sample route
app.get('/',(req,res)=>{
    res.send("API is running...");

});

app.use('/api/users',userRoutes);


// app.listen(PORT,async()=>{
//     await connectDB();
//     console.log(`Server is running on http://localhost:${PORT}`)

// })

// First connect to DB, then start the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();