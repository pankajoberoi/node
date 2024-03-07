const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const { timeStamp } = require("console");
const app = express();
const PORT = 8000;
//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/fsd5")
  .then(() => {
    console.log("MongoDb Connnected");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("user", userSchema);

//plugin middleware
app.use(express.urlencoded({ extended: true })); //so that undefined na ayye jo data bhej rhe ho wohi ayye
// app.use(express.json())

app.use((req, res, next) => {
  console.log("hello from m1");
  req.userName = "Pankaj";
  // return res.json({mgs : "hello from middleware 1"})
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()} : ${req.ip} ${req.method} : ${req.path}`,
    (err, data) => {
      console.log("i am in m2", req.userName);
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  // console.log("i am in get route ",req.userName)
  res.setHeader("myname", "bheem");
  console.log(req.headers);
  return res.json(users); //list of users
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required" });
  }
  // console.log("Body ka data aa gya", body);
  // users.push({ ...body, id: users.length + 1 }); //body ka data hai fe usko push backend mai
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json({ status: "success", id: users.length });
  // });

  //lets connect with db now
  const result = await User.create({
    firstName: body.first_name,
    lastName : body.last_name,
    email : body.email,
    gender : body.gender,
    jobTitle: body.job_title,
  })


  return res.status(201).json({msg : "success"})


});
app.patch("/api/users/:id", (req, res) => {
  // console.log(req.params,"rrr");
  let { id } = req.params;
  console.log(req.body, "hehehe");

  let newARR = users.find((data) => {
    return data.id == id;
  });
  // newARR.id=req.body.id
  console.log(newARR, "neee");
  // console.log(req.body.id,"rrrr");
  newARR.first_name = req.body.first_name;
  console.log(newARR, "updatedddd");

  res.send(newARR);
});
app.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;
  let newARR = users.filter((data, key) => {
    return data.id != id;
  });
  res.send(newARR);

  // return res.json({status : "pending"});
});

// app.route("/api/users/:id").get((req,res)=>{
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   res.json(user);
// })
// .patch((req,res)=>{
//   return res.json({status : pending});
// })
// .delete((req,res)=>{
//   return res.json({status : pending});
// })

app.listen(PORT, () => console.log("sever chal pda"));
