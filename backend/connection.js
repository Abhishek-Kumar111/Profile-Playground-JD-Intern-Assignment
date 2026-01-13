const mongoose = require('mongoose')


const mongoDBURL = process.env.MONGO_URI;

mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("DataBase Connected Successfully")
}).catch(err=>{
        console.log(err)
})

