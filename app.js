const express=require("express")
const app=express();

const port=8080;

app.get('/',(req,res)=>{
    res.send("Board Infinity Assignment");
})
app.listen(port,()=>{
    console.log(`App is running on ${port}...`);
})