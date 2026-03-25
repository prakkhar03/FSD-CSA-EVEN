import fs from "fs"
const data=fs.readFileSync("data.txt","utf-8");
console.log("Data=",data)
const mydata="/n new line"
fs.appendFileSync("data.txt",mydata)
console.log("Updated Data=",data)
