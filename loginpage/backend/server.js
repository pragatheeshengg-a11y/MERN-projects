const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
//const bcrypt=require("bcryptjs")
require("dotenv").config();
const routers=require("./routes/auth")
const app=express();
app.use(cors());
app.use(express.json());

mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>{console.log("MongoDb connected...")})
        .catch((err)=>{console.log(err)});
app.use("/api",routers)
app.listen(process.env.PORT,()=>{
    console.log("Server connected...")
})        
