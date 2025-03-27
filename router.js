const express = require("express");
const {signup, login, validateToken} = require("./controller")
const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/validate", validateToken)

module.exports = {authRouter}