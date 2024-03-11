const express = require("express");


const router = express.Router();

router.get("/", async (req, res) => {
    // console.log("i am in get route ",req.userName)
    const allDbUsers=await User.find({});
    res.setHeader("myname", "bheem");
    console.log(req.headers);
    return res.json(allDbUsers); //list of users
  });
  
  router.get("/:id", async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id)
    res.json(user);
  });
  
  router.post("/", async (req, res) => {
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
  router.patch("/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id,{ lastName:"Changed"})
    // console.log(req.params,"rrr");
    // let { id } = req.params;
    // console.log(req.body, "hehehe");
  
    // let newARR = users.find((data) => {
    //   return data.id == id;
    // });
    // // newARR.id=req.body.id
    // console.log(newARR, "neee");
    // // console.log(req.body.id,"rrrr");
    // newARR.first_name = req.body.first_name;
    // console.log(newARR, "updatedddd");
  
    // res.send(newARR);
    return res.json({status : "Success"})
  });
  router.delete("/:id", async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "success"})
  
  
    // let { id } = req.params;
    // let newARR = users.filter((data, key) => {
    //   return data.id != id;
    // });
    // res.send(newARR);
  
    // return res.json({status : "pending"});
  });

  module.exports=router;