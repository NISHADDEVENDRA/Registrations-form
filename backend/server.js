const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/auth', authRoutes )



mongoose.connect(process.env.MONGO_URI).then(()=>console.log(" mongodb connected succesfully "))
.catch(err=> console.log(err))


app.listen( PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})

