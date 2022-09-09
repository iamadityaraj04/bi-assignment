const express=require("express")
//for getting data from forms
const bodyparser=require('body-parser');
const app=express();

//requiring db
const db=require("./db/dbConnect.js");
const port=process.env.port || 5000;
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
    const taskName=req.body.taskName;
    const taskDescription=req.body.taskDescription;
    const creator=req.body.creator;
    const duration=req.body.duration;

    const task=new tasks({
        TaskName:taskName,
        TaskDescription:taskDescription,
        Creator:creator,
        Duration:duration,
    });
    task.save().then(()=>{
        setTimeout(() => {
            task.remove({Duration:duration});
        }, duration*60*1000);
        res.redirect('/add');
    }).catch((err)=>{
        res.send(err);
    })
    //tasks.remove({Duration:duration});

})

//starting server
app.listen(port,()=>{
    console.log(`App is running on ${port}...`);
})