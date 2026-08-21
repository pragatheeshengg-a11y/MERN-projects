const express=require('express');
const mongoose=require('mongoose');
const { type } = require('node:os');

const app=express();
app.use(express.json());

mongoose
    .connect("mongodb+srv://praga_db:1Quns5tNzUoSvS9o@cluster0.ayravg8.mongodb.net/mongoodeDb")
    .then(()=>{
        console.log("Mangoose connected...")
    })
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A username is required'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'A price is required']
    }
}) 

const User=mongoose.model('User',userSchema);

const testUser=new User({
    name:'praga',
    rating:4.6,
    price:599

})

testUser
    .save()
    .then(doc=>{
        console.log(doc);
    })
    .catch(err=>{
        console.log(err);
    })

app.listen(3000,()=>{
    console.log("server running on port 3000...")
})