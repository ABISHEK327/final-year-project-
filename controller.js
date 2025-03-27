const { createJWT, validateJWT } = require("./JWT");
const userModel = require("./userModel");
const {v4: uuidv4} = require("uuid");

async function signup(req, res){
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).send({message:"Invalid arguments"})
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({message:"Email already exists"})
        }
        const userDB = await userModel.create({
            _id: uuidv4(),
            name,
            email,
            password
        });
        if(userDB){
            return res.status(201).send({message:"User created"})
        }
        else{
            return res.status(503).send({message:"Server unavailable"})
        }
    }
    catch(err){
        console.log("sign up error", err)
        return res.status(500).send({message:"Internal server error"})
    }
}

async function login(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({message:"Invalid arguments"})
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).send({message:"Invalid email"})
        }
        if(password !== user.password){
            return res.status(401).send({message:"Invalid password"})
        }
        const userData = {name: user.name, id: user._id}
        const generatedToken = createJWT(userData)
        return res.status(200).send({message:"User logged in successfully", userData, token: generatedToken})
    }
    catch(err){
        console.log("login error", err)
        return res.status(500).send({message:"Internal server error"})   
    }
}

function validateToken(req, res){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try{
        const data = validateJWT(token)
        if(data){
            return res.status(200).send({message:"Valid user"})
        }
        else{
            res.status(401).send({message:"Unauthorized user"})
        }
    }
    catch(err){
        console.log("validata err", err.message)
        if(err.message == "jwt expired"){
            return res.status(400).send({message: "Token expired"})
        }
        return res.status(400).send({message: "Invaild token"})
    }
}

module.exports = {signup, login, validateToken}