const express=require("express")
//for getting data from forms
const bodyparser=require('body-parser');
const app=express();

//requiring db
require("./db/dbConnect.js");
const port=process.env.port || 8080;
const tasks=require("./db/dbSchema.js")

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Board Infinity Assignment");
})

app.get("/list",async (req,res)=>{
    if(req.query){
        try{
            const taskData=await tasks.find({});
            res.send(taskData);
        }catch(err){
            res.send(err);
        }
    }
})

app.get("/add",(req,res)=>{
    res.sendFile(__dirname+ "/index.html");
})
//inserting data using post method
app.post("/add",(req,res)=>{
    const task=new tasks({
        TaskName:req.body.taskName,
        TaskDescription:req.body.taskDescription,
        Creator:req.body.creator,
        Duration:req.body.duration,
    });
    task.save();
    res.redirect('/add');
    // task.save().then(()=>{
    //     res.redirect('/add');
    // }).catch((err)=>{
    //     res.send(err);
    // })
})

//starting server
app.listen(port,()=>{
    console.log(`App is running on ${port}...`);
})