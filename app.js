const express=require("express")
const app=express();

//requiring db
require("./db/dbConnect.js");
const port=8080;

app.get('/',(req,res)=>{
    res.send("Board Infinity Assignment");
})

//starting server
app.listen(port,()=>{
    console.log(`App is running on ${port}...`);
})