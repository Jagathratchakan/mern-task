const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async (req, res) => {
    console.log(req.body);
    const newuser = new User(req.body);
    try {
      const user = await newuser.save();
      res.send("User Registration Successfully");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

router.post("/login", async(req,res)=>{
    const {email,password} = req.body

    try{
    const user =await User.findOne({email : email,pass: password})
    if(user){
        const temp = {
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            usertype : user.userType,
            _id : user._id,
        }
        res.send(temp)
    }
    else{
        return res.json({message : "No user"});
    }
    }
    catch(error){
        return res.status(400).json({error});
    }

})


module.exports = router;