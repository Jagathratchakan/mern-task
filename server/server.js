const express = require("express");

const app = express();

const dbconf = require('./db')
const roomRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/BookingRoute')

app.use(express.json())
app.use('/api/rooms', roomRoute)
app.use('/api/users',userRoute)
app.use('/api/bookings',bookingRoute)

const port = process.env.port || 5000;

app.listen(port,()=> console.log("Node Server started check"));