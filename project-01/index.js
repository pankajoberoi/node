const express=require("express")
const users = require('./MOCK_DATA.json')
const app = express();
const PORT=8000;

// Routes
app.get("/users",(req,res)=>{
    const html= `
    <ul>
        ${users.map((users)=> `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})



//REST API
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user=users.find((user)=>user.id ===id);
    return res.json(user)
})

//only problem is brower send only get reqs
app.post("/api/users",(req,res)=>{
    //TODO:create new user
    return res.json({status:"pending"})
})

app.patch("/api/users/:id",(req,res)=>{
    //TODO:Edit user with id
    return res.json({status:"pending"})
})

app.delete("/api/users/:id",(req,res)=>{
    //TODO:Delete the user with id
    return res.json({status:"pending"})
})


//lets combine similar routes for diff req
//benefit if u want to change any path ,u can change it once
app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user=users.find((user)=>user.id ===id);
    return res.json(user)
})
.patch((req,res)=>{
    //edit user with id
    return res.json({ status: "pending" })
})
.delete((req,res)=>{ 
     //delete user with id
     return res.json({ status: "pending" })
 })



app.listen(PORT,()=>console.log(`Server chal pey at ${PORT}`))

