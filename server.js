import express, { urlencoded } from 'express';

let app = express();

app.use(express.static("public"));
app.use(urlencoded({extended: false}));

app.get("/todos",async (req,res)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    let data = await response.json();
    data = [...customTodo,...data]
    return res.send(
        `
        <ul>
        ${data.map((item)=>`<li class="${item.completed ? "line-through" : '' }">${item.title}</li>`).join("")}
        </ul>
        `
    )
})

let customTodo = []

app.post("/todos",async (req,res)=>{
    customTodo  = [ {title: req.body.title, completed: false},...customTodo];  
    res.setHeader("HX-Trigger", "todo-created");  
    return res.status(204).send("post request")
})

app.listen(3000, ()=>{
    console.log("server is listening at port 3000")
})
