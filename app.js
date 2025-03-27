const express = require("express");
const cors = require("cors");
const { authRouter } = require("./router");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter)

db()
  .then(() => {})
  .catch((err) => console.log("database error", err));

app.listen("4000", ()=>{
    console.log("Server started")
})