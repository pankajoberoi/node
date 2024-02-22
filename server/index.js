// const http = require("http");

// const myServer = http.createServer((req,res)=>{
//     // console.log('New Req aayi hai');
//     // console.log(req.headers);
//     console.log(req);
//     res.end("hello from server");
// });

// myServer.listen(8000,()=> console.log("server Started !"));






//task -> maintaining log of requests

const http = require("http");
const fs=require("fs");


const myServer = http.createServer((req,res)=>{
        const log=`${Date.now()}: ${req.url} New Request Received\n`;
        fs.appendFile('log.txt',log,(err,data)=>{
            res.end("hello from server");
        })
        
    });
    
    myServer.listen(8000,()=> console.log("server Started !"));


