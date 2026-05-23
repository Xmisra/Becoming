import mongoose from "mongoose";
import User from "./user.model.js";

const journey = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    },
    description:{
        type:String,
        required:true
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    tags:{
        type:[String],
        default :[]
    },

    isPublic:{
        type : Boolean,
        default : false,
    }
},{timestamps:true});

const Journey = mongoose.model('Journey',journey);
export default Journey;