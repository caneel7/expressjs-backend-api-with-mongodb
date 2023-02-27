const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');          //third party module for encrypting/decrypting password

const loginHandler = async (req,res)=>{

    const { userName, password } = req.body   //username and password from request
    if(!userName||!password){
        res.status(400).json({"message":"username and password are required."})
    }
    const foundUser = await User.findOne({userName : userName})
    if(!foundUser) return res.status(404).json({"message":`user ${userName} was not found.`})
    const match = await bcrypt.compare(password,foundUser.password)              //using bcrypt to decrpyt the password
    if(!match){
        return res.sendStatus(403)
    }
    try{
        const roles = Object.values(foundUser.roles)          //retreving roles for foundUser object
        const accessToken = jwt.sign(
            {"userInfo":{
                "userName":foundUser.userName,
                "roles":roles
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"30s"}
        )
        const refreshToken = jwt.sign(
            {"userInfo":{
                "userName":foundUser.userName,
                "roles":roles
            }},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        )
        foundUser.refreshToken = refreshToken
        await foundUser.save()
        res.cookie("jwt",refreshToken,{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})         //sending http cookie
        res.status(200).json({accessToken})                                                 //sending accesstoken in res
    }catch(err){
        console.log(err)
    }
}

module.exports = {loginHandler}