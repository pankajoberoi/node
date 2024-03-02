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
const fs = require("fs");
const url = require("url");





function myHandler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.name;
        res.end(`Hi , ${username}`);
        break;
      case "/contact":
        res.end("123456789");
      default:
        res.end("invalid req");
    }
  });
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, () => console.log("server Started !"));
