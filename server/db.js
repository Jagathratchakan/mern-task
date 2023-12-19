const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://jagathratchakans2020ai:Jagath@cluster0.frsswuu.mongodb.net/shareroom'

mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected',()=>{
    console.log('MongoDB connected')
})

module.exports = mongoose