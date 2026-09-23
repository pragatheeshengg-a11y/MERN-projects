const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

const chatroutes=require("./routes/chatroute");
const app=express();
const session = require("express-session");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true
}));
app.use(session({
    secret: process.env.SECRET_KEY,   
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } 
}));
app.use("/api/chat",chatroutes);
mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>console.log("DB is connected..."))
        .catch((err)=>console.log(err))

app.get("/",(req,res)=>{
    res.send("Backend is started")
});

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is on ${port}`);
});