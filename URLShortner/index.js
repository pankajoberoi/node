const express = require("express");
const { connectToMongoDb } = require("./connect");
const path = require("path"); //inbuilt
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth')


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongodb connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.set("view engine", "ejs"); //view engine -> ejs
app.set("views", path.resolve("./views"));
// view ki files are this ->views folder

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth,staticRoute);

app.listen(PORT, () => {
  console.log(`Server lisiting at PORT ${PORT}`);
});
