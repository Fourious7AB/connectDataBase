import mongoose,{Schema}from "mongoose"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    avatar:{
        type:String, //clooudnery
        required:true
    },
    coverimage:{
        type:String //cloudnery
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"

    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();//if password is not modified then we dont need to hash 
    this.password=bcrypt.hash(this.password,10)//her we encrupite the pass word
    next()//then we call the next function
})
userSchema.methods.isPasswordCorrect=async function (password) {
   return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken=function (password) {
    return jwt.sing({
        
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },{
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    })
 }
 userSchema.methods.generateRefreshToken= function (password) {
    return jwt.sing({
        
        _id:this._id,
        
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    })
 }
export const User=mongoose.model("User",userSchema)