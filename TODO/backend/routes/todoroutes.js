const express=require("express");
const router=express.Router();

const todo=require("../models/todo");

router.get("/",async(req,res)=>{
    try{
        const todos=await todo.find();
        res.status(200).json(todos)
    }
    catch(err){
        res.status(500).json({                              
        message: err.message,
    });
    }
})
router.post("/",async (req,res) => {
    try{
        const newtodo=await todo.create({
            title:req.body.title,
            complete:req.body.complete

        })
        res.status(200).json(newtodo)
    }
    catch(err){
        res.status(500).json({
        message: err.message,
    });
    }
    
})
router.patch("/:id",async (req,res)=>{
    try{
        const updated=await todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if (!updated) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(updated);
    }
    catch(err){
        res.status(500).json({
        message: err.message,
    });
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const deletedTodo=await todo.findByIdAndDelete(req.params.id)
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

        res.status(200).json({
        message: "Todo deleted successfully",
        });
    } catch (err) {
            res.status(500).json({
             message: err.message,
    });
  }

})

module.exports=router