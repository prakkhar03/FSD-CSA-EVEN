import http from "http";
import  os from "os";
const port=5001;
const users=[{id:1,name:"John",email:"john@example.com"},
    {id:2,name:"Jane",email:"jane@example.com"},
    {id:3,name:"Doe",email:"doe@example.com"}];
const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url=="/"&& req.method=="GET"){
    res.end("<h1> Home Page </h1>");

    }
    else if(url=="/users"&& req.method=="GET"){
        res.end(JSON.stringify(users));

    }
    else if(url.startsWith("/users/")&& req.method=="GET"){
        const id=url.split("/")[2];
        const user=users.find(u=>u.id==id);
        if(!user){
            res.statusCode=400;
            console.log(`user ${id} not found`);
             return res.end(`user ${id} not found`);
        }
        res.end(JSON.stringify(user));
    }
    else if(url=="/createuser"&& req.method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            const newUser=JSON.parse(body);
            newUser.id=users.length+1;
            users.push(newUser);
            console.log(`user ${newUser} created successfully`);
            res.statusCode=201;
            res.end(`user ${newUser} created successfully`);
        })
    }
    else if(url.startsWith("/users/")&& req.method=="PUT"){
        res.end("<h1> Update page </h1>");
    }
    else if(url.startsWith("/users/")&& req.method=="PATCH"){
        const id=url.split("/")[2];
        const userIndex=users.findIndex(u=>u.id==id);
            let body="";
            req.on("data",(chunk)=>{
                body=body+chunk;
            })
            req.on("end",()=>{
                const data=JSON.parse(body);
                
                if(userIndex==-1){
                    res.statusCode=400;
                    console.log(`user ${id} not found`);
                     return res.end(`user ${id} not found`);
                }
                users[userIndex]={...users[userIndex],...data};
                res.statusCode=200;
                console.log(`user ${id} updated successfully`);
                res.end(`user ${id} updated successfully`);
            })
        
    }
    else if(url.startsWith("/users/")&& req.method=="DELETE"){
        const id=url.split("/")[2];
        const userIndex=users.findIndex(u=>u.id==id);
        if(userIndex==-1){
            res.statusCode=400;
            console.log(`user ${id} not found`);
             return res.end(`user ${id} not found`);
        }
        users.splice(userIndex,1);
        console.log(`user ${id} deleted succesfully`);
        res.end(`user ${id} deleted succesfully`);
    }
    else{
        res.statusCode=404;
        res.end("<h1> Error Page </h1>");
    }
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})