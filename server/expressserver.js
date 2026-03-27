import express from "express"
const app=express();
const port=3001;
const users=[{id: 1,name: "Ashish",email:"ab@gmail.com"},
    {id: 2,name: "Ashish2",email:"ab2@gmail.com"},
    {id: 3,name: "Ashish3",email:"ab3@gmail.com"}
]
app.use(express.json());
app.get("/users",(req,res)=>{
   res.status(200).json(users);
})
app.get("/user/:id",(req,res)=>{
    const userid=req.params.id;
    const user=users.find(u=>u.id==userid);
    if(!user){
      return res.status(400).json({message: `user id ${userid} not found`}); 
    }
   res.status(200).json(users);
})
app.post("/create",(req,res)=>{
    const userdata=req.body;
    if(userdata.name==undefined ||  userdata.email==undefined)
    {
  return res.status(400).json({message: "user data incomplete"})   
    }
    const userIndex=users.findIndex(u=>u.email==userdata.email);

    
    if(userIndex!=-1){
  return res.status(400).json({message: "user Alredy exist"})
    }
    const newuser={
        id: Date.now(),
        ...userdata
    }
    users.push(newuser);
   res.status(200).json({message: "user created successfully",newuser});
})

app.delete("/delete/:id",(req,res)=>{
  const id=req.params.id;
  const userIndex=users.findIndex(u=>u.id==id);
  if(userIndex==-1){
    return res.status(400).json({message:`user id ${id} not found`})
  }
  users.splice(userIndex,1);
  res.status(200).json({message:`user id ${id} deleted successfully`})
})

app.put("/edit/:id",(req,res)=>{
  const id=req.params.id;
  const update=req.body;
  const userIndex=users.findIndex(u=>u.id==id);
  if(userIndex==-1){
    return res.status(400).json({message:`user id ${id} not found`})
  }
  users[userIndex]={
    ...users[userIndex],...update
  }
  res.status(200).json({message:`user id ${id} updated successfully`})
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})