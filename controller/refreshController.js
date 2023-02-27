const User = require('../model/User');
const jwt = require('jsonwebtoken');

const refreshHandler = async (req,res)=>{

    const cookies = req.cookies                                     //retrieving cookie for refreshtoken from req
    if(!cookies?.jwt) return res.sendStatus(403)                   //if no cookie or doesnt have a jwt in cookie
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});           //find user with same refreshtoken
    if(!foundUser) return res.sendStatus(400)
    try{
        jwt.verify(                             
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if(err || foundUser.userName !== decoded.userInfo.userName){
                    return res.sendStatus(401)
                }
                req.user = decoded.userInfo.userName
                const roles = Object.values(foundUser.roles)
                const accessToken = jwt.sign(                                    //creating new accesstoken after verification
                    {"userInfo":{
                        "userName":decoded.userInfo.userName,
                        "roles":roles
                    }},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:"30s"}
                )
                res.json({accessToken})                                     //sending new accesstoken in res
            }
        )
    }catch(err){
        console.error(err)
    }
}

module.exports = {refreshHandler}