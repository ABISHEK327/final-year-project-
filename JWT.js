const secretKey = "skeahjkshwtqvxpzoritmahq";
const jwt = require("jsonwebtoken")

function createJWT(data){
    try{
        const token = jwt.sign(data, secretKey)
        return token
    }
    catch(err){
        console.log("createJWT err", err)
        return false
    }
}

function validateJWT(token){
    try{
        const data = jwt.verify(token, secretKey)
        return data
    }
    catch(err){
        console.log("validata err", err.message)
        return false
    }
}

module.exports = {createJWT, validateJWT}