import http from "http";
import os from "os";
const port=5001;
let body="";
const data=[];
const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url=="/" && req.method=="GET"){
        res.write("<h1> Home Page </h1>");
        
    }
    else if(url=="/about" && req.method=="GET"){
        res.write("<h1> About Page </h1>");
    }
    else if(url=="/contact" && req.method=="GET"){
        res.write("<h1> Contact Page </h1>");
    } else if(url=="/system" && req.method=="GET"){
        const sysdata={
            platform:os.platform(),
            architecture:os.arch(),
            cpu:os.cpus().length,
            Totalmem:(os.totalmem()/1024**3).toFixed(2)+" GB",
            Freemem:(os.freemem()/1024**3).toFixed(2)+" GB",
            // network:os.networkInterfaces()
        }
        res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(sysdata));
    }
    else if(url=="/users" && req.method=="GET"){
        res.write("<h1> list of users </h1>");
    }
    else if(url=="/createusers" && req.method=="POST"){
        res.write("<h1> create user </h1>");
    }
    else if(url.startsWith("/users/") && req.method=="GET"){
        res.write("<h1> Search user </h1>");
    }
    else if(url.startsWith("/users/") && req.method=="PUT"){
        res.write("<h1> update user </h1>");
    }
    else if(url.startsWith("/users/") && req.method=="DELETE"){
        res.write("<h1> delete USer </h1>");
    }
    else{
        res.write("Error Page");
    }

//     else if(url=="/senData" && req.method=="POST"){
        
//         req.on("data",(chunk)=>{
//             body=body+chunk;})
//         req.on("end",()=>{
//             console.log(body,"data send");
//         res.statusCode=201;
//         res.end(body);
//         })
        
//     }
//     else if(url=="/viewData" && req.method=="GET"){
//         res.end(body);
//     }else{
//         res.statusCode=404;
//         res.write("<h1> Page Not Found </h1>");
//     }
    res.end();

})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})