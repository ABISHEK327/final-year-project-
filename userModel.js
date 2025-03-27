const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String
}, {collection:"user", versionKey: false})

module.exports = mongoose.model("user", userSchema)