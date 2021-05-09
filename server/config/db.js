const mongoose = require('mongoose');
require('dotenv').config();


const mongoDB = () =>{
    mongoose.connect(process.env.MONGODB_CONNECTION,{useUnifiedTopology: true , useNewUrlParser: true}).then(()=>{
        console.log('Conncted to DB');
    }).catch((err)=>{
        console.log("Connection failed");
    })
}

module.exports = mongoDB;
