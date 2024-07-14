const express = require('express')
const fs = require("fs")
const app = express()
const PORT = 3001

app.use(express.json())

const readJson = ()=>{
    const data=fs.readFileSync("./db.json",'utf-8')
    return JSON.parse(data)
}

const writeJson = (data)=>{
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}

app.get("/todos",(req,res)=>{
    const data= readJson()
    res.json(data.todos)
    res.send('homepage and sumitji ka website')
})

app.post("/todos/add-task",(req,res)=>{
    const data=readJson()
    const newTask={
        id:data.todos.length+1,
        task:req.body.task,
        status:false
    }
    data.todos.push(newTask)
    writeJson(data);
    res.json(newTask);
})

app.put("/todos/update",(req,res)=>{
    const data=readJson()
    data.todos.forEach((todo)=>{
        if(todo.id%2===0 && todo.status===false){
            todo.status=true
        }

    })
    writeJson(data)
    res.json(data.todos)

})

app.delete("/todos/delete-true",(req,res)=>{
    const data= readJson()
    data.todos=data.todos.filter((todo)=>!todo.status)
    writeJson(data)
    res.json(data.todos)
})

app.listen(PORT,()=>{
    console.log('server started running')
})
