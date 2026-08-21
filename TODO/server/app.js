const express=require('express');
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors());

let todo=[
    {
        id:1,
        title:"Learning MERN Stack",
        complete:false
    }
]

app.get('/api/todo',(req,res)=>{
    res.status(200).json(todo);
})

app.post('/api/todo',(req,res)=>{
    const newtodo={
        id:todo.length+1,
        title:req.body.title,
        complete:false
    };

    todo.push(newtodo);
    res.status(200).json(newtodo);
})

app.patch('/api/todo/:id',(req,res)=>{
    const id=Number(req.params.id);
    const todos=todo.find((todos)=>todos.id===id);

    if(!todos){
        return res.status(404).json({
            status:"404",
            mgs:"Not found"
        })
    }

    todos.complete=req.body.complete;
    res.status(200).json(todos)
})

app.delete('/api/todo/:id',(req,res)=>{
    const id=Number(req.params.id);

    todo=todo.filter((todos)=>todos.id!=id);
    res.status(200).json({
        status:"200",
        mgs:"success..."
    })
})

app.listen(3000,'127.0.0.1',()=>{
    console.log("SERVER(3000)IS RUNNING...")
});