const mongoose=require("mongoose");

//db schema
const listSchema=new mongoose.Schema({
    TaskName:{
        type:String
    },
    TaskDescription:{
        type:String
    },
    Creator:{
        type:String
    },
    Duration:{
        type:Number
    }
},
{
    timestamps:true
}
);

//creating collection/model for performing CRUD operations
const task=new mongoose.model("task_info",listSchema);

module.exports=task;