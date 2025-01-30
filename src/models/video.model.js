import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "@types/mongoose-aggregate-paginate-v2";
const videoSchema=new Schema({
    videoFile:{
        type:String,//cloudniaryUrl
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,//coudniary
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPunlished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)