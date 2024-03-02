const http = require("http");
const fs = require("fs");
const url = require("url");
const express=require("express")

const app=express();

app.get("/",(req,res)=>{
    return res.send("Hello home page")
})
// app.get("/about",(req,res)=>{
//     return res.send("Hello about page")
// })

app.get("/about",(req,res)=>{
    return res.send("hello from about page" + "hey" + req.query.name + "you are" + req.query.age);
})

app.listen(8000,()=>{console.log("server started")})

// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.url} New Request Received\n`;
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("Homepage");
//         break;
//       case "/about":
//         const username = myUrl.query.name;
//         res.end(`Hi , ${username}`);
//         break;
//       case "/contact":
//         res.end("123456789");
//       default:
//         res.end("invalid req");
//     }
//   });
// }

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("server Started !"));
