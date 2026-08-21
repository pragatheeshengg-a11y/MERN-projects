const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const todorouters=require("./routes/todoroutes")

const app=express();
app.use(express.json());
app.use(cors());

mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>console.log("Mongoose connected..."))
        .catch((err)=>console.log(err))

app.use("/api/todo",todorouters);        

app.listen(3000,()=>{
    console.log("localhost 3000 is connected...")
})        