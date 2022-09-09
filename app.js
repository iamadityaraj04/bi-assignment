const express=require("express")
//for getting data from forms
const bodyparser=require('body-parser');
const app=express();

//requiring db
require("./db/dbConnect.js");
const port=process.env.port || 5000;
const tasks=require("./db/dbSchema.js")

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send(`
    <p style="font-size: 100px;">Board Infinity Assignment</p>
    <p style="font-size: 60px;">Endpoints:<br> /add - to add data to database<br>/list - to get data of database</p>
    
    `);
})

//getting data in jason format
app.get("/list",async (req,res)=>{
    if(req.query){
        try{
            const taskData=await tasks.find({},{TaskName:1,TaskDescription:1,Creator:1,Duration:1});
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
        //removing data from db after given duration
        setTimeout(() => {
            task.remove({Duration:duration});
        }, duration*60*1000);
        res.redirect('/add');
    }).catch((err)=>{
        res.send(err);
    })

})

//starting server
app.listen(port,()=>{
    console.log(`App is running on ${port}...`);
})