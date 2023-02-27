const User = require('../model/User');

const logoutHandler = async (req,res)=>{

    const cookies = req.cookies                      //retrieving  cookie from req
    if(!cookies?.jwt) return res.sendStatus(400)                                // if no cookie or doesnt have a jwt in cookie
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken: refreshToken})           //find user with same refreshtoken
    if(!foundUser){
        res.clearCookie("jwt",{httpOnly : true})                                //even if not found user clearing cookie
        return res.sendStatus(204)
    }else{
        foundUser.refreshToken = ""                                            // removing refresh token for the logged in user
        await foundUser.save()                                                 //saving in database
        res.clearCookie("jwt",{httpOnly: true})
        res.sendStatus(204)
    }
}

module.exports = {logoutHandler};