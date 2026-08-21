const mongoose=require("mongoose");

const todoschema=new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        complete:{
            type:Boolean,
            default:false
        }
});

module.exports=mongoose.model("TODO",todoschema)

