import mongoose from "mongoose"
import { DB_Name } from "../constants.js"
const connectDB=async()=>{
    try{
       const connetionIstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
       console.log(`MongoDB connected: ${connetionIstance.connection.host}`)
    }
    catch(error){
        console.error("error are:",error);
        process.exit(1);
    }
}
export default connectDB;