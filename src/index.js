const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");

const app =express()
app.use(express.json());
require("dotenv").config();


mongoose.connect(process.env.mongoUrl)
.then(()=>console.log("mongoDb is Connected"))
.catch((err)=> console.log(err))


app.use("/",route)

app.listen(process.env.port,()=>{
    console.log("server is running on "+ process.env.port)
})