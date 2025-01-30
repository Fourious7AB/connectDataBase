import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express()
//cors
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
//cookieparser
app.use(cookieParser())

//routers
import userRouter from './routes/user.routes.js';

//reutes declarition
app.use('/api/v1/users',userRouter)
//http://localhost:800/api/v1/users/register
export{app}