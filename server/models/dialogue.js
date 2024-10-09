const mongoose=require("mongoose")

const Dialogue=new mongoose.Schema({
    heading:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        required:true,
    },
    timestamp:{
        type:Date,
        default: ()=> Date.now(),
        immutable:true
    }
})

module.exports=mongoose.model("Dialogue",Dialogue)