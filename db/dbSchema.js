const mongoose=require("mongoose");

//db schema
const listSchema=new mongoose.Schema({
    TaskName:{
        type:String,
        required:true
    },
    TaskDescription:{
        type:String,
        require:true
    },
    Creator:{
        type:String,
        require:true
    },
    Duration:{
        type:Number,
        require:true
    }
},
{
    timestamps:true
}
);

//creating collection/model for performing CRUD operations
const task=new mongoose.model("task_info",listSchema);

module.exports=task;