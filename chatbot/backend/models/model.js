const mongoose=require("mongoose");

const chatschema=new mongoose.Schema({
    name: String,
    order_id: String,
    location: String,
    expected_date: String
},{
    collection:"orders"
})
module.exports=mongoose.model("chatbot",chatschema);