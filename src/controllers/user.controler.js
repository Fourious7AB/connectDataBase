import { asyncHandler } from "../utils/asyncHandaler.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import {uploadOncludinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
 //get user detailes from frontend-> use postman
// validation -not empty
//checkif user already exists->use of username,email
//check for images, check for avater
//upload them to cloudinary
//create user object->create entery in db
//remove password and refresh token field
//check for user creation
//return res
const {fullname,email,username,password}=req.body
console.log("email",email);
if(
    //throw new ApiError(400,"fullname is requierd")
    [fullname,email,username,password].some((field)=>
        field?.trim()==="")
){
    throw new ApiError(400,"All fields are required")
 }
const existedUser=User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"User already exists")
}

//check for images
const avatarLocalpath=req.files?.avatar[0]?.path;
const coverImagelocalpath=req.files?.coverImage[0]?.path;
if(!avatarLocalpath){
    throw new ApiError(400,"Avatar is required")
}
//upload cloudinary
const avatar=await uploadOncludinary(avatarLocalpath);
const coverImage=await uploadOncludinary(coverImagelocalpath);
if(!avatar){
    throw new ApiError(400,"Avatar upload failed")
}
//enter db
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
//remove password and refershTOKKEN
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(505,"Something is wrong user not found")
}
return res.status(201).json(
 new ApiResponse(200,createdUser,"User regestered successfully")
)

});
export { registerUser };
