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
    origin:process.env.CLIENT_URL
}));

require('./connection');

const userRoutes = require('./Routes/user');
const profileRoutes = require('./Routes/profile');
const projectRoutes = require('./Routes/project');
const workRoutes = require('./Routes/work');
const skillRoutes = require('./Routes/skill');

app.use("/api/auth",userRoutes)
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);
app.use("/api", workRoutes);
app.use("/api", skillRoutes);


const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});


app.listen(process.env.PORT,()=>{
    console.log("Successfully running on port",process.env.PORT)
})

