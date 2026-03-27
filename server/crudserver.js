import http from "http"
const port=4005;
const users=[];
const server=http.createServer((req,res)=>{
const url=req.url;
const method=req.method;
if(url=="/users" && method=="GET"){
    res.statusCode=200;
    res.end(JSON.stringify(users))
}
else if(url.startsWith("/users/") && method=="GET"){
    const id=url.split("/")[2];
    const user=users.find(u=>u.id==id);
    if(!user){
        res.statusCode=400;
        console.log(`user id ${id} not found`);
        return res.end(`user id ${id} not found`)
    }
    res.statusCode=200;
    res.end(JSON.stringify(user))
}
else if(url=="/createuser" && method=="POST"){
    let body="";
    req.on("data",(chunk)=>{
       body=body+chunk;
    })
    req.on("end",()=>{
        const data=JSON.parse(body);
        if(data.name==null || data.email==null){
            res.statusCode=400;
        console.log(`Invalid data`)
          return res.end("Invalid Data")
        }
        const userIndex=users.findIndex(u=>u.email==data.email);
        if(userIndex!=-1){
           res.statusCode=400;
        console.log(`User Already Exist`)
          return res.end("User Already Exist") 
        }
        const newUser={
            id: Date.now(),
            name: data.name,
            email: data.email
        }
        users.push(newUser)
        res.statusCode=201;
        console.log(`user id ${newUser.id} created successfully`)
    res.end("user created"+JSON.stringify(newUser))
    })
    
}
else if(url.startsWith("/users/") && method=="PATCH"){
    const id=url.split("/")[2];
    const userIndex=users.findIndex(u=>u.id==id)
    let body="";
    req.on("data",(chunk)=>{
         body=body+chunk;
    })
    req.on("end",()=>{
        const data=JSON.parse(body);
        if(userIndex==-1){
           res.statusCode=400;
           console.log(`User Id ${id} not found`)
           return res.end(`User Id ${id} not found`)
        }
        users[userIndex]={...users[userIndex],...data};
        res.statusCode=200;
           console.log(`User Id ${id} updated successfully`)
           res.end(`User Id ${id} updated successfully`)
        })
  
}
else if(url.startsWith("/users/") && method=="DELETE"){
    const id=url.split("/")[2];
    const userIndex=users.findIndex(u=>u.id==id);
    res.setHeader("Content-Type","application/json")
    if(userIndex==-1)
    {
      res.statusCode=400;
      console.log(`user id ${id} not found`)
       return res.end(`user id ${id} not found`)  
    }
    users.splice(userIndex,1);
    res.statusCode=200;
    console.log(`user id ${id} deleted successfully`)
    res.end(`user id ${id} deleted successfully`)
}
else{
    res.statusCode=404;
    res.end("Error Page")
}
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})