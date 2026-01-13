const express = require("express");
const app = express();
const cookieparser = require('cookie-parser');
const cors = require("cors")
const path = require('path');

require('dotenv').config({path:"./.env"})


app.use(express.json())
app.use(cookieparser())

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

require('./connection');

const userRoutes = require('./Routes/user');

app.use("/api/auth",userRoutes)


const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.send("Path is working");
});


app.listen(process.env.PORT,()=>{
    console.log("Successfully running on port",process.env.PORT)
})

