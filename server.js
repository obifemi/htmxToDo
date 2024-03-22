import express from 'express';

let app = express();

app.use(express.static("public"));

app.get("/todos",async (req,res)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return res.send(
        `
        <ul>
        ${data.map((item)=>`<li>${item.title}</li>`).join("")}
        </ul>
        `
    )
})

app.listen(3000, ()=>{
    console.log("server is listening at port 3000")
})