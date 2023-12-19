const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")

router.post("/bookroom", async (req,res) =>{

    const {
        room,
        userid,
        fromdate,
        todate,
        amount,
        numberOfDays
    } = req.body

    try{
        const newBooking  = new Booking({
            room : room.name,
            roomid : room._id,
            userid,
            fromdate,
            todate,
            amount,
            numberOfDays,
            transcation : '12345'
        })

        const book = await newBooking.save()


        const roomtemp = await Room.findOne({_id : room._id})
        roomtemp.currentbookings.push({booking : book._id,fromdate : fromdate,todate: todate,userid: userid,status : book.status})

        await roomtemp.save()
        
        res.send("Room Booked")
    }
    catch(error){
        return res.status(400).json({error});
    }
});


router.post("/getroombyuserid",async(req,res)=>{
    const userid = req.body.userid

    try{
        const room = await Room.find({userid : userid})
        res.send(room )
    }
    catch(error){
        return res.status(400).json({error});
    }
});

router.post("/getbookingsbyuserid",async(req,res)=>{
    const userid = req.body.userid

    try{
        const booking = await Booking.find({userid : userid})
        res.send(booking)
    }
    catch(error){
        return res.status(400).json({error});
    }
});

router.post("/cancelbooking",async(req,res)=>{
    
    const {bookingid, roomid} = req.body

    try{
        const bookingitem = await Booking.findOne({_id : bookingid})
        
        bookingitem.status = "cancelled"
        await bookingitem.save()

        const room = await Room.findOne({_id:roomid})

        const bookings = room.currentbookings
        const temp = bookings.filter(booking =>bookingid.toString()!==bookingid)
        room.currentbookings = temp

        await room.save()

        res.send("Your booking cancelled ")
    }
    catch(error){
        return res.status(400).json({error});
    }
});



module.exports = router