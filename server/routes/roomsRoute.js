const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms",async(req,res)=>{

    try{
        const rooms = await Room.find({})
        return res.json({rooms});
    }
    catch{
        return res.status(400).json({message : error});
    }

});


router.post("/getroomid",async(req,res)=>{

    const roomid = req.body.roomid

    try{
        const room = await Room.findOne({_id : roomid})
        return res.json({room});
    }
    catch{
        return res.status(400).json({message : error});
    }

});

router.post("/addroom",async(req,res)=>{

    
    try{
        const newroom = new Room(req.body)
        await newroom.save()
        res.send("New Room added")
    }
    catch(error){
        return res.send("Faild");
    }

});



module.exports = router;