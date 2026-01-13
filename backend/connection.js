const mongoose = require('mongoose')


const mongoDBURL = "mongodb+srv://abhijee9815_db_user:yNQMiZWJfV9muiul@cluster0.gymfooc.mongodb.net/?appName=Cluster0" ;
mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("DataBase Connected Successfully")
}).catch(err=>{
        console.log(err)
})

