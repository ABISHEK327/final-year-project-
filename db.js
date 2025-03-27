const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/user-management";

async function db(){
    try{
        console.log("db", url)
        await mongoose.connect(url);
        console.log("db connected");
    }
    catch(err){
        console.log(" db err", err);
    }
}

module.exports = db;