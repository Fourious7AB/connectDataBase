import dotenv from "dotenv";
import mongoose  from "mongoose";
//import { DB_Name } from "./constants";
//second approche
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("Your error are:",error);
})



/*
//first approche 
import express from "express";
const app = express();
;(async()=>{
   try {
     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
     app.on("error", (err) => {
        console.error(err);
        throw err;})
        app.listen(process.env.PORT,()=>{
            console.log(`App is listen in ${process.env.PORT}`);
        })
   }
   catch(error){
   console.error("Error:",error);
   }
   
})
*/