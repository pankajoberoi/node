const express = require("express");
const {connectMongoDb}=require("./connection")
const userRouter = require("./routes/user");
const {logReqRes} = require("./middlewares/index")

const app = express();
const PORT = 8000;
//connection
connectMongoDb("mongodb://127.0.0.1:27017/fsd5").then(()=>{
  console.log("mongo Db Connected")
})


//plugin middleware
app.use(express.urlencoded({ extended: true })); 

app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users",userRouter);


app.listen(PORT, () => console.log("sever chal pda"));
